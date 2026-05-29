---
name: today-mao ETF dashboard isolation
description: today-mao and ETF dashboard are fully decoupled; today-mao runs standalone on port 8090 only
type: project
---

**Decision (2026-04-23):** today-mao 和 ETF dashboard 完全解耦，不再内嵌。

**Why:**
- 用户明确要求"不要内嵌版，不要污染etf看板项目"
- 内嵌导致两份代码需要同步维护，容易遗漏（ETF dashboard 的 app.py 中有一份独立的 today-mao 代码）
- 进程管理互相干扰（start-aliyun.sh 的 pkill 误杀对方进程）

**How to apply:**
- today-mao 只在 8090 独立部署（`deploy_today_mao.py`）
- ETF dashboard 只做 ETF 相关事情，端口 8080
- `deploy_both.py` 已更名为只部署 ETF dashboard
- 两个项目的 start-aliyun.sh 使用精确路径匹配进程（`python3.9 /opt/today-mao/app.py` 和 `python3.9 /opt/etf-dashboard/app.py`）
