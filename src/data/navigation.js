export const navLinks = [
  { label: '等级', href: '#tiers' },
  { label: '积分', href: '#points' },
  { label: '兑换', href: '#exchange' },
  { label: '体验', href: '#activities' },
  { label: '产品模块', href: '#modules' },
  { label: 'App 预览', href: '#phones' },
];

export const coreLoop = [
  { step: 1, title: '注册入会', desc: '完善球龄、尺码、常打球场和消费偏好。' },
  { step: 2, title: '首单购买', desc: '通过套装、场景搭配和顾问服务完成转化。' },
  { step: 3, title: '积分兑换', desc: '引导用户优先兑换课程、MBC Tournaments 和交流名额。' },
  { step: 4, title: '线下体验', desc: '活动现场完成试穿、社交、内容采集和复购邀约。' },
  { step: 5, title: '内容扩散', desc: '晒单、球场打卡和活动照片回流社区。' },
];

export const modules = [
  { icon: '等', title: 'Home', desc: '等级、成长值、积分余额、待完成任务。' },
  { icon: '兑', title: 'Points Store', desc: '商品券、服务券、活动名额和稀缺体验。' },
  { icon: '赛', title: 'Events Center', desc: 'MBC Tournaments、课程、交流局、试穿会一站式报名。' },
  { icon: '圈', title: 'Community', desc: '穿搭晒单、球场打卡、活动照片和话题任务。' },
  { icon: '衣', title: 'My Closet', desc: '已购商品、尺码档案、搭配建议和复购提醒。' },
  { icon: '场', title: 'Course Profile', desc: '常去球场、差点水平、打球频率和偏好标签。' },
  { icon: '章', title: 'Badges', desc: '首次下场、月例赛、穿搭官、城市玩家。' },
  { icon: '顾', title: 'Concierge', desc: '到店预约、尺码建议、活动邀约和高阶服务。' },
];

export const rules = [
  '等级靠成长值，积分靠行为和消费。',
  '积分优先兑换体验服务，不只是抵扣商品。',
  'MBC Tournaments 名额保持稀缺，形成报名和升级动力。',
  'MBC Tournaments 和课程是高尔夫服装 CRM 的差异化核心。',
  '高等级用户获得身份权益，而不是单纯更大折扣。',
  '导购从销售角色升级为会员顾问。',
];

export const metrics = [
  { label: '会员月活跃率', target: '> 40%', desc: '参考理想汽车 App 车主活跃度' },
  { label: '积分兑换率', target: '> 60%', desc: '避免积分沉淀成为数字负担' },
  { label: 'UGC 月均产出', target: '> 500 条', desc: '体现社区活跃度' },
  { label: '邀请裂变系数', target: '> 0.3', desc: '每位老会员平均带来 0.3 个新注册' },
];

export const roadmap = [
  { phase: 'MVP', time: '1-2 个月', focus: '基础等级体系 + 消费返币 + 签到打卡 + 基础活动报名' },
  { phase: '扩展', time: '3-4 个月', focus: 'Coins 兑换系统、成就徽章、邀请裂变、UGC 内容激励' },
  { phase: '成熟', time: '5-6 个月', focus: 'MBC 付费会员上线、Condor 邀请制、排行榜、球场打卡联动计分卡' },
  { phase: '迭代', time: '持续', focus: '数据优化积分比例、增加跨界联名活动、海外体验' },
];
