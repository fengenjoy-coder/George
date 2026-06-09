export const pointsAcquisition = [
  { action: '完善会员档案', points: 100, category: 'onboarding' },
  { action: '首单购买', points: 300, category: 'purchase' },
  { action: '服装套装购买', points: 200, category: 'purchase', note: '额外' },
  { action: '到店试穿反馈', points: '100-300', category: 'engagement' },
  { action: '图文评价晒单', points: 100, category: 'content' },
  { action: '精选穿搭分享', points: '300-800', category: 'content' },
  { action: '参加课程', points: 200, category: 'activity' },
  { action: '参加 MBC Tournaments', points: '300-1000', category: 'activity' },
  { action: '邀请好友首单', points: 500, category: 'referral' },
  { action: '完成月度任务', points: '100-1000', category: 'task' },
];

export const creditsAcquisition = [
  { action: '消费', credits: '1 / ¥1', category: 'purchase', note: '每消费 1 元' },
  { action: '每日签到', credits: '10-100', category: 'engagement', note: '连击递增' },
  { action: '图文评价', credits: 200, category: 'content' },
  { action: '精选穿搭被选中', credits: '500-1000', category: 'content' },
  { action: '参加活动', credits: '300-1500', category: 'activity' },
  { action: '邀请好友首单', credits: 1000, category: 'referral' },
  { action: '成就解锁', credits: '500-3000', category: 'milestone' },
  { action: 'MBC Tournament 参赛', credits: 2000, category: 'activity' },
  { action: '会员年限', credits: 500, category: 'loyalty', note: '每年' },
  { action: 'MBC 续费', credits: 10000, category: 'loyalty' },
  { action: 'Condor 入会', credits: 50000, category: 'loyalty' },
];

export const pointsRedemption = {
  starter: [
    { cost: '500 Points', title: '运费券', desc: '单笔订单免运费', value: '降低首次兑换门槛' },
    { cost: '800 Points', title: '改裤脚服务', desc: '专业改裤脚一次', value: '推动到店服务' },
    { cost: '1,000 Points', title: '袜子/手套 8 折券', desc: '配件折扣券', value: '提升配件连带率' },
    { cost: '2,500 Points', title: '到店试穿预约', desc: '保留新品尺码，导购提前搭配', value: '推动线下到店' },
    { cost: '3,000 Points', title: '基础穿搭顾问', desc: '针对球场、天气、商务局给出搭配建议', value: '建立专业服务感' },
    { cost: '4,000 Points', title: '练习场体验券', desc: '合作练习场基础体验', value: '从购物走向打球' },
  ],
  growth: [
    { cost: '6,500 Points', title: '球场礼仪课', desc: '新手下场礼仪、穿着规范和社交注意点', value: '适合 L1-L2' },
    { cost: '10,000 Points', title: '短杆小班课', desc: '教练合作课程，限额 8 人小班', value: '提高持续活跃' },
    { cost: '13,000 Points', title: '新品试穿沙龙', desc: '提前试穿、反馈、预售权益', value: '连接产品共创' },
    { cost: '16,500 Points', title: '城市球友局', desc: '同城会员交流活动', value: '沉淀圈层关系' },
  ],
  premium: [
    { cost: '25,000 Points', title: 'MBC Tournaments', desc: '月例赛外卡报名资格', value: 'Tournaments 带动内容传播' },
    { cost: '40,000 Points', title: '1v1 私教课', desc: '高阶会员专项服务（1小时）', value: '强化等级价值' },
    { cost: '50,000 Points', title: '球场造型拍摄', desc: '品牌穿搭大片与社区精选', value: '制造传播素材' },
    { cost: '65,000+ Points', title: '城市邀请赛', desc: 'L4-L5 稀缺体验', value: '塑造会员身份' },
  ],
};
