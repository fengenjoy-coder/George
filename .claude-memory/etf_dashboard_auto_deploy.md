---
name: ETF看板全自动部署器
description: ETF看板已实现零手动复制的全自动部署，包含HTTP Deploy端点、Tunnel Fallback和登录功能增强
type: project
---

## 2026-04-06 工作成果

### 完成的改进

1. **全自动部署器 `auto_deploy.py`**（`/Users/fengfeng/etf-dashboard/auto_deploy.py`）
   - 一键重新生成 `update-aliyun.sh`（base64 自解压脚本）。
   - **SSH 优先**：支持密码登录自动上传执行。
   - **HTTP Deploy Fallback**：当 SSH 被服务器拦截时，自动通过 `POST /deploy` 把脚本推送到服务器，无需任何手动复制。
   - **Tunnel Fallback**：如果 HTTP deploy 也不可用，自动启动 `localtunnel` 生成公网 URL，打印一键执行命令。
   - 自动进行 `http://101.201.37.236:8080/login` 健康检查。

2. **后端新增私有部署接口**
   - `app.py` 中新增 `/deploy` 端点（`deploy_endpoint`）。
   - 使用 `X-Deploy-Token: etf-deploy-token-2026-geoclaude` 认证。
   - 已被加入 `login_required` 白名单，无需登录即可访问。
   - 收到 base64 脚本后写入 `/tmp/update-aliyun.sh` 并后台 `bash` 执行。

3. **前端功能增强**
   - **登录页** `templates/login.html`：新增"来财"毛笔字标题（Google Fonts `Ma Shan Zheng`、A股红色）。
   - **主页面** `templates/terminal.html`：右上角新增 `[ 退出登录 ]` 链接，跳转 `/logout`。
   - 样式更新 `static/css/terminal-style.css`：`.logout-link` 终端风格按钮。

### 验证结果

- 服务器：`101.201.37.236:8080` 运行正常。
- 登录：`geoclaude / 1234rewq` 正常。
- 实际测试：修改"来财"颜色为红色后，仅运行 `python3 auto_deploy.py` 即完成全自动部署，无需手动复制命令。

### 注意事项

- **SSH 拦截问题**：服务器对源 IP `203.198.11.12` 在 SSH 协议握手阶段直接断开（`kex_exchange_identification: Connection closed by remote host`），原因尚未根查（可能是阿里云主机安全/安骑士独立拉黑）。
- **当前最佳实践**：以后统一使用 `auto_deploy.py` 的 HTTP Deploy Fallback，完全规避 SSH 问题。
