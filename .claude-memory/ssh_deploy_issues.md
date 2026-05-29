---
name: SSH部署连接反复失败问题
description: 阿里云服务器SSH连接不稳定，多次发生握手被服务端拒绝的情况，需用替代方案完成部署
type: feedback
---

# SSH 部署连接反复失败

## 问题现象

本地机器连接阿里云服务器 `101.201.37.236:22` 时，TCP 端口通但 SSH 握手被服务端主动关闭：

```
kex_exchange_identification: Connection closed by remote host
```

- TCP 层面：`nc -z 101.201.37.236 22` ✅ 成功
- SSH 层面：`ssh root@101.201.37.236` ❌ 握手阶段被服务器拒绝
- **用户本人在服务器上 SSH 会话正常**（说明 sshd 服务在跑）

## 根因推测

1. **fail2ban / hosts.deny**：多次自动部署工具的连接尝试触发防暴力破解规则，本地 IP 被临时封禁
2. **阿里云安全组 SSH 白名单**：可能配置了特定来源 IP 段限制
3. **sshd 配置限制**：`MaxAuthTries`、`AllowUsers` 等参数导致连接被快速拒绝

## 已验证可行的替代部署方案

### 方案 A：HTTP Deploy Fallback（优先）

ETF 看板的 `/deploy` 端点支持通过 HTTP POST 推送 base64 编码的更新脚本：

```bash
curl -X POST http://101.201.37.236:8080/deploy \
  -H "Content-Type: application/json" \
  -H "X-Deploy-Token: etf-deploy-token-2026-geoclaude" \
  -d '{"script": "BASE64_ENCODED_SCRIPT"}'
```

**限制**：需要 ETF 看板服务本身在运行（502 时不可用）。

### 方案 B：LocalTunnel 公网分发（本次使用）

本地启动 HTTP 服务器 + localtunnel，生成公网 URL，用户在服务器上 `curl` 下载执行：

```bash
# 本地
python3 -m http.server 18080 &
npx --yes localtunnel --port 18080

# 服务器
curl -fsSL https://xxx.loca.lt/update-aliyun.sh -o /tmp/update-aliyun.sh
bash /tmp/update-aliyun.sh
```

**优点**：不依赖 SSH，穿透任何防火墙限制。

## 建议

- 不要反复尝试 SSH 连接（会加剧 fail2ban 封禁）
- 优先使用 HTTP deploy 或 tunnel 方案
- 如需根治，在服务器上检查并调整 fail2ban / hosts.deny 配置

**Why:** 之前多次部署时都因 SSH 不可用被迫回退到 tunnel 方案，每次都浪费 2-3 分钟排查时间。
**How to apply:** 未来涉及服务器文件更新时，直接跳过 SSH 尝试，先用 HTTP deploy 或 localtunnel 方案。
