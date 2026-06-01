export const pointsAcquisition = [
  { action: '完善会员档案', points: 100, category: 'onboarding' },
  { action: '首单购买', points: 300, category: 'purchase' },
  { action: '服装套装购买', points: 200, category: 'purchase', note: '额外' },
  { action: '到店试穿反馈', points: '100-300', category: 'engagement' },
  { action: '图文评价晒单', points: 100, category: 'content' },
  { action: '精选穿搭分享', points: '300-800', category: 'content' },
  { action: '参加课程', points: 200, category: 'activity' },
  { action: '参加MBC Tournaments', points: '300-1000', category: 'activity' },
  { action: '邀请好友首单', points: 500, category: 'referral' },
  { action: '完成月度任务', points: '100-1000', category: 'task' },
];

export const pointsRedemption = {
  starter: [
    { cost: '300-800 Bucket Coins', title: '基础服务券', desc: '运费券、改裤脚服务、袜子/手套折扣券', value: '降低首次兑换门槛' },
    { cost: '800 Bucket Coins', title: '到店试穿预约', desc: '保留新品尺码，导购提前搭配', value: '推动线下到店' },
    { cost: '1,000 Bucket Coins', title: '基础穿搭顾问', desc: '针对球场、天气、商务局给出搭配', value: '建立专业服务感' },
    { cost: '1,200 Bucket Coins', title: '练习场体验券', desc: '合作练习场基础体验', value: '从购物走向打球' },
  ],
  growth: [
    { cost: '2,000 Bucket Coins', title: '球场礼仪课', desc: '新手下场礼仪、穿着规范和社交注意点', value: '适合 L1-L2' },
    { cost: '3,000 Bucket Coins', title: '短杆小班课', desc: '教练合作课程，限额报名', value: '提高持续活跃' },
    { cost: '4,000 Bucket Coins', title: '新品试穿沙龙', desc: '提前试穿、反馈、预售权益', value: '连接产品共创' },
    { cost: '5,000 Bucket Coins', title: '城市球友局', desc: '同城会员交流活动', value: '沉淀圈层关系' },
  ],
  premium: [
    { cost: '8,000 Bucket Coins', title: 'MBC Tournaments', desc: 'Bucket Coins报名或Bucket Coins+现金报名', value: 'Tournaments 带动内容传播' },
    { cost: '12,000 Bucket Coins', title: '1v1 私教课', desc: '高阶会员专项服务', value: '强化等级价值' },
    { cost: '15,000 Bucket Coins', title: '球场造型拍摄', desc: '品牌穿搭大片与社区精选', value: '制造传播素材' },
    { cost: '20,000+ Bucket Coins', title: '城市邀请赛', desc: 'L4-L5 稀缺体验', value: '塑造会员身份' },
  ],
};
