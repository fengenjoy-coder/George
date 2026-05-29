# Malbon CRM 工作日志

## 2026-05-29

### 今日完成事项

1. **图片修复**
   - 修复了缺失的 `/images/malbon-logo-white.png` 引用（3处：Navbar、Hero、Footer）
   - 改用纯文字/CSS Logo，避免 404

2. **移除所有 Emoji**
   - 从 12+ 个组件和数据文件中清除了所有 emoji
   - 替换为文字标签或字母标记

3. **会员等级体系重构**
   - L4 → MBC Member（年费 ¥30,000）
   - L5 → Condor Member（入会费 ¥100万，全额抵扣消费，特定折扣）
   - 基于 MBC PDF 权益文档整合

4. **品牌术语统一**
   - 所有"赛事/比赛/月例赛"统一为 **MBC Tournaments**

5. **产品模块标题英文化**
   - Home / Points Store / Events Center / Community / My Closet / Course Profile / Badges / Concierge

6. **积分概念改为 Coins**
   - 全局 48 处替换

7. **新增 MBC 付费会员 Section**
   - Welcome Gift / Invite-Only Tournaments / Exclusive Pro-shop / Social Community

8. **GitHub 部署**
   - 仓库公开
   - GitHub Pages 启用（gh-pages 分支）
   - 阿里云服务器手动部署（`/opt/malbon-crm-web`，端口 8081）

### 遇到的坑

- GitHub Pages 对私有仓库收费，需改为 public
- SSH 到阿里云服务器被拦截（fail2ban/安骑士），只能用 HTTP Deploy 或 manual curl
- ETF 看板服务（101.201.37.236:8080）当前未响应
- localtunnel 有有效期限制（几小时）

### 部署地址

| 方式 | 地址 |
|------|------|
| GitHub Pages | https://fengenjoy-coder.github.io/George/ |
| 阿里云服务器 | http://101.201.37.236:8081 |
| 本地开发 | http://localhost:5173 |

### 关键文件

- `src/data/tiers.js` — 等级定义
- `src/data/points.js` — Coins 获取/消耗
- `src/data/events.js` — 活动数据
- `src/data/navigation.js` — 导航/模块/规则
- `src/components/sections/MBCSection.jsx` — MBC 付费权益展示
- `vite.config.js` — 含 GitHub Pages base path `/George/`

### 下次继续方向（待定）

- [ ] 验证 GitHub Pages 是否正常渲染
- [ ] ETF 看板服务重启后，可考虑将 Malbon CRM 放入 `/static/malbon-crm/` 共用 8080 端口
- [ ] 手机界面等级名称同步（HomeFeedScreen、LevelCoinsScreen 等硬编码 L3/L4 引用）
- [ ] 内容优化（文案、图片素材替换）
