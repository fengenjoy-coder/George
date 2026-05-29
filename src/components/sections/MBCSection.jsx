import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function MBCSection() {
  const [ref1, isInView1] = useInView()
  const [ref2, isInView2] = useInView()

  const benefits = [
    {
      num: '01',
      title: 'Welcome Gift',
      subtitle: '超值入会礼包，总价值超过 20,000 元',
      items: [
        'MBC2026 特别版挖起杆杆头 x3',
        'Malbon x IceMonster 联名变色户外眼镜 x1',
        'MBC 限量地毯 x1',
        'MBC 金属马克杯 x12',
        'MBC 高尔夫高定服装 x2 套',
        'MBC Tournament 限定版服装 x12 件+',
        'MBC 高尔夫球包 x1',
        'MBC 手套/帽子套装 x4',
        'MBC 行李箱 x1',
      ],
    },
    {
      num: '02',
      title: 'Invite-Only Tournaments',
      subtitle: '纯会员制球赛，每年 3 场免费参赛权益',
      items: [
        '每年 12+ 站会员专属邀约制 Tournaments',
        '每位会员可选择 3 场赛事活动免费参加',
        'MBC Tournaments Rankings（Players vs Players / Players vs Courses）',
        '单场积分排名与成就系统统计',
        'Malbon Village 现场互动与赞助商权益',
      ],
    },
    {
      num: '03',
      title: 'Exclusive Pro-shop',
      subtitle: '只为会员开放的 Malbon 商店，每年 3,000 元等值商品赠送权益',
      items: [
        '专属 Pro-shop 产品清单与限量联名产品',
        '全部 Malbon 产品优先购买资格',
        '购买折扣和更多积分（通过参加 MBC 活动获取）',
        '参与 Malbon 产品设计创作，打造专属 Buckets 产品',
      ],
    },
    {
      num: '04',
      title: 'Social Community & Life-style',
      subtitle: '不仅仅是高尔夫活动，更多 Malbon 跨界体验',
      items: [
        'Malbon Party — 主题社交派对',
        'Golf Workshop — 职业高尔夫选手训练课程',
        'Malbon Club — MBC 活动城市限定快闪',
        'Malbon Go — 出行与生活方式特别安排',
        '家人共享方案，伴侣与孩子一起体验',
      ],
    },
  ]

  return (
    <section id="mbc" className="relative py-24 md:py-32 bg-dark-secondary overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-malbon-green/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="MBC 付费会员：从积分会员到品牌共创者"
          subtitle="Malbon Buckets Club 年费会员，享受四大核心权益，进入更专业的高尔夫生活圈层。"
          light
        />

        {/* Pricing banner */}
        <div
          ref={ref1}
          className={`mt-12 mb-16 bg-gradient-to-r from-malbon-green/20 via-malbon-gold/10 to-malbon-green/20 border border-malbon-green/20 rounded-3xl p-8 md:p-12 text-center transition-all duration-700 ${
            isInView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-sm text-malbon-green-light font-semibold mb-2">MBC Members Only</div>
          <div className="text-4xl md:text-5xl font-bold text-white mb-3">30,000 RMB / Year</div>
          <p className="text-gray-400 max-w-xl mx-auto">
            2026 年内激活的所有会员附赠 2027 全年权益。
            包含 Welcome Gift、Tournaments、Pro-shop 与 Social Community 四大核心权益。
          </p>
        </div>

        {/* Benefits grid */}
        <div ref={ref2} className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.num}
              className={`bg-dark-card border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-green/20 ${
                isInView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-malbon-green-light">{b.num}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-sm text-gray-400">{b.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
