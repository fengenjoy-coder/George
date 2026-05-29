---
name: 阿里云ETF看板部署配置
description: 记录阿里云服务器上ETF看板的部署路径、端口和启动方式
type: reference
---

## 阿里云ETF看板部署信息

- **服务器路径**: `/opt/etf-dashboard`
- **Python 版本**: `python3.9`
- **服务端口**: `8080`
- **Flask 启动端口已固定为 8080** (`app.run(host='0.0.0.0', port=8080, debug=False)`)
- **启动命令**: `setsid python3.9 app.py > /var/log/etf-dashboard.log 2>&1 &`
- **快捷脚本**: `/opt/etf-dashboard/start-aliyun.sh`（一键重启）
- **日志文件**: `/var/log/etf-dashboard.log`
- **公网访问地址**: `http://101.201.37.236:8080`

## 注意
- 服务器上 `nohup` + `app.py` 可能因为端口占用导致启动失败，推荐使用 `setsid`。
- `netstat` 和 `ss` 命令可能缺失，可用 `pgrep -af "python3.9 app.py"` 检查进程状态。
- 服务器没有 `unzip`，更新包解压需用 `python3 -m zipfile -e xxx.zip /opt/etf-dashboard/`。
