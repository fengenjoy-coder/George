---
name: 伟人智能体开发模式（今日毛选项目沉淀）
description: 从"今日毛选"项目提炼的可复用架构、代码模式、Prompt工程、部署方案，用于快速开发其他伟人/历史人物AI智能体
type: project
originSessionId: 1f6f19dd-3f11-40eb-afd3-05b722f039d5
---
## 项目概述

"今日毛选"是一个移动端 Web AI 聊天应用，用户向"教员"（毛泽东思维框架）提问，AI 用第一人称回答。核心特征是：**极简后端、重 Prompt 工程、轻前端**。

**技术栈**：Flask (Python) + Kimi API + RAG (quotes.json / chapters.json) + 纯 HTML/CSS/JS 前端
**部署**：阿里云 ECS + HTTP `/deploy` 端点热部署
**模型**：`kimi-for-coding`（成本考虑，非最强模型）

---

## 可复用架构模式

### 1. 非流式 POST JSON（强烈推荐）

**Why**：SSE/NDJSON 流式架构在推理模型上极不可靠（v108-v123 共 16 次补丁仍未解决）。模型不遵守标记、思考内容泄漏、自我修正、流式/非流式行为不一致。

**How to apply**：
- 后端：`requests.post()` 单次调用，直接取 `choices[0].message.content`
- 前端：简单 `fetch + await`，无需 SSE 解析器、NDJSON 状态机
- 思考过程用前端动画模拟（阶段提示轮播 + 进度条）
- 代码量从 ~200 行流式逻辑降到 ~30 行

### 2. 极简内容提取（不跟模型较劲）

**Why**：任何依赖模型可靠输出特定标记的方案都注定脆弱。

**How to apply**：
- 非流式时 `message.content` 通常已纯净
- 仅做极简兜底：按标记提取（如 `===正文开始===`），失败则直接返回原文
- 绝不引入启发式过滤（`_looks_like_thinking`、`_strip_self_correction` 等）

### 3. 用户数据持久化（文件级）

**Why**：服务重启（部署、崩溃）后用户状态不能丢失。

**How to apply**：
```python
USERS_FILE = DATA_DIR / "users.json"
users = load_json(USERS_FILE, {})

def save_users():
    save_json(USERS_FILE, users)
```
- 启动时加载，任何修改用户状态的函数末尾调用 `save_users()`
- 位置：`advisor()`、`drawCard()`、`subscribe()`、`login()`、`set_level()`、`save_conversations()`
- 无需数据库，JSON 足够（用户量 < 10K）

### 4. API 限流（令牌桶，纯内存）

**Why**：防止恶意刷接口耗尽 API 额度。

**How to apply**：
```python
RATE_LIMIT_ANON = {"requests": 10, "window": 60}
RATE_LIMIT_SUB = {"requests": 20, "window": 60}
rate_limit_state = {}  # {key: {"tokens": float, "last_update": timestamp}}

def check_rate_limit(key, is_subscribed=False):
    now = time.time()
    limit = RATE_LIMIT_SUB if is_subscribed else RATE_LIMIT_ANON
    bucket_size = limit["requests"]
    refill_rate = bucket_size / limit["window"]
    bucket = rate_limit_state.get(key, {"tokens": bucket_size, "last_update": now})
    elapsed = now - bucket["last_update"]
    bucket["tokens"] = min(bucket_size, bucket["tokens"] + elapsed * refill_rate)
    bucket["last_update"] = now
    if bucket["tokens"] >= 1:
        bucket["tokens"] -= 1
        rate_limit_state[key] = bucket
        return True, 0
    retry_after = int((1 - bucket["tokens"]) / refill_rate) + 1
    rate_limit_state[key] = bucket
    return False, retry_after
```

### 5. 缓存清理（固定上限 + 批量删除）

**Why**：`answer_cache` 无限增长导致内存泄漏。

**How to apply**：
```python
CACHE_MAX_SIZE = 500
CACHE_CLEAN_BATCH = 100

def prune_answer_cache():
    if len(answer_cache) <= CACHE_MAX_SIZE:
        return
    sorted_keys = sorted(answer_cache.keys(), key=lambda k: answer_cache[k]["ts"])
    for key in sorted_keys[:CACHE_CLEAN_BATCH]:
        del answer_cache[key]
```

### 6. RAG 检索增强（简单关键词匹配）

**Why**：让模型回答更精准、引用更贴切，而不是泛泛而谈。

**How to apply**：
- 预置语录/篇章 JSON 文件
- 简单中文分词 + 停用词过滤 + 多字段打分（text/context/source/tags）
- 检索 top-k 结果注入 system prompt 的"参考资料"段落
- 无需向量数据库，关键词匹配足够（文献量 < 1K）

---

## System Prompt 工程方法

### 核心原则
1. **强制约束用【强制】标注** — 模型对弱约束的遵循度低
2. **第一人称写作** — "我"而非第三人称，增强沉浸感
3. **输出标记简化** — 只保留最必要的标记（如 `===正文开始===`）
4. **禁止元指令输出** — 明确告诉模型不要输出"检查清单""自我修正"等
5. **结构多样化** — 分析流程标注"灵活应用，不要僵化"，避免每篇回答结构雷同

### 可复用模板结构
```
## 核心心智模型（3-7条）
## 决策启发式
## 表达风格（含第一人称强制约束）
## 引用原文要求（如需要）
## 分析流程（灵活应用，不要僵化）
## 输出格式（极简标记）
## 输出约束（禁止元指令）
```

---

## 部署模式

### HTTP `/deploy` 端点热部署

**Why**：SSH 反复握手失败，HTTP Deploy 更可靠。

**How to apply**：
1. 后端暴露 `/deploy` POST 端点，接收 base64 编码的 bash 脚本
2. 脚本解码后写入 `/tmp/`，用 `subprocess.Popen` 异步执行
3. 本地 `deploy.py` 脚本将文件列表转为 base64 + bash 脚本，通过 HTTP 发送
4. 脚本内容：mkdir → base64 解码写入文件 → pip install → 重启服务

```python
# deploy.py 核心逻辑
FILES = [
    ("local/app.py", "/opt/app/app.py"),
    ("local/quotes.json", "/opt/app/quotes.json"),
    # ... 所有需要部署的文件
]

def generate_bash_script():
    lines = ["#!/bin/bash", "set -e", ""]
    for local_path, remote_path in FILES:
        with open(local_path, "rb") as f:
            data = base64.b64encode(f.read()).decode()
        marker = "EOF_" + remote_path.replace("/", "_").replace(".", "_")
        lines.append(f"mkdir -p {os.path.dirname(remote_path)}")
        lines.append(f"base64 -d <<'{marker}' > {remote_path}")
        for i in range(0, len(data), 76):
            lines.append(data[i:i+76])
        lines.append(marker)
        lines.append("")
    lines.append("bash /opt/app/start.sh")  # 重启
    return "\n".join(lines)
```

### 部署 checklist
1. 本地语法检查：`python3 -m py_compile app.py`
2. bump 版本号（CSS/JS cache-bust `?v=NNN` + HTML 版本显示）
3. 备份当前版本到 `backup-vNNN/`
4. 运行 `python3 deploy.py`
5. 验证：首页 HTTP 200 + 版本号正确

---

## 踩坑记录

| 坑 | 根因 | 解决方案 |
|---|------|---------|
| SSE/NDJSON 流式卡断 | 推理模型输出行为极不稳定 | **彻底删除流式，改用非流式 POST JSON** |
| 思考内容泄漏到正文 | 模型不遵守标记约束 | 非流式 + `message.content` 直接取 + 极简兜底提取 |
| 用户数据重启丢失 | `users = {}` 纯内存字典 | 启动 `load_json` + 变动时 `save_users()` |
| `draws_today` 超过上限 | Flask dev server 默认并发处理请求 | 加线程锁（`threading.Lock()`）保护用户状态读写 |
| 时区变量拼写错误 | `BEJING_TZ` vs `BEIJING_TZ` | grep 全局检查变量名一致性 |
| 缓存无限增长 | 只有写入无清理 | `prune_answer_cache()` 上限 500 条 |
| 无限刷接口耗 API 额度 | 无 rate limit | 令牌桶限流，匿名 10/min，订阅 20/min |
| 前端缓存导致旧代码 | CSS/JS 文件名不变 | 版本号 query string `?v=NNN` |

---

## 开发新伟人 Agent 的 checklist

- [ ] 准备语录/篇章 JSON（RAG 数据源）
- [ ] 编写 System Prompt（核心心智模型 + 表达风格 + 第一人称约束）
- [ ] 配置 Kimi API（或替换为其他 LLM API）
- [ ] 实现 `advisor()` 非流式 POST 接口
- [ ] 实现 `load_json` / `save_json` / `save_users()` 持久化
- [ ] 实现 `check_rate_limit()` 限流
- [ ] 实现 `prune_answer_cache()` 缓存清理
- [ ] 实现 `retrieve_relevant_knowledge()` RAG 检索
- [ ] 前端：欢迎页 + 聊天界面 + 思考气泡（阶段轮播）
- [ ] 配置 HTTP `/deploy` 端点 + 本地 `deploy.py`
- [ ] bump 版本号 → 部署 → 验证
