---
name: ETF看板日志持久化
description: ETF看板项目需要保持日志记录，用于问题排查和运行状态监控
type: project
---

# ETF看板日志保持需求

## 需求
ETF看板服务需要持久化日志记录，便于：
- 问题排查和调试
- 服务运行状态监控
- 历史数据追溯

## 当前状态
- 日志文件位置: `/var/log/etf-dashboard.log`
- 启动方式: `nohup python3 app.py > /var/log/etf-dashboard.log 2>&1 &`

## 建议改进
1. 日志轮转 (logrotate) 防止日志文件过大
2. 分级日志 (INFO/WARNING/ERROR)
3. 访问日志和错误日志分离
4. 关键操作审计日志（如策略配置变更）

## 相关文件
- `app.py` - Flask应用主文件
- `data_fetcher_v2.py` - 数据获取模块
- `strategies/grid_trading.py` - 网格策略模块
