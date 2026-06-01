import { useState } from 'react'
import { pointsAcquisition, pointsRedemption } from '../../data/points'
import { SectionHeading } from '../ui/SectionHeading'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

export function PointsEconomySection() {
  const [activeTab, setActiveTab] = useState('starter')
  const [ref, isInView] = useInView()
  const bigNumber = useCountUp(1, 1500)

  const tabLabels = {
    starter: '低门槛',
    growth: '高频体验',
    premium: '稀缺体验',
  }

  return (
    <section id="points" className="relative py-24 md:py-32 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Bucket Coins经济从消费驱动，扩展到行为、内容和社交驱动"
          subtitle="参考 UA 的消费与互动Bucket Coins，也吸收理想 App 的社区任务和圈层运营，把用户活跃变成可见资产。"
          light
        />

        <div ref={ref} className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left panel */}
          <div className={`lg:col-span-2 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card padding="lg" className="h-full flex flex-col justify-between min-h-[400px] bg-gradient-to-br from-malbon-green/10 to-transparent border-malbon-green/20">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Bucket Coins账户</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Bucket Coins可消耗，成长值不轻易消耗。Bucket Coins越有体验价值，用户越愿意持续完成任务。
                </p>
              </div>
              <div>
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-malbon-green-light leading-none mb-2">
                  {bigNumber}<span className="text-3xl md:text-4xl text-malbon-green">元</span>
                </div>
                <div className="text-lg text-gray-400">= 1 Bucket Coins</div>
                <p className="text-sm text-gray-500 mt-4">
                  消费是基础，活动参与、内容贡献和转介绍决定长期粘性。
                </p>
              </div>
            </Card>
          </div>

          {/* Right panel - acquisition list */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card padding="lg" className="h-full">
              <h3 className="text-lg font-semibold text-white mb-6">Bucket Coins获取方式</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {pointsAcquisition.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="dark" size="sm">{item.category}</Badge>
                      <span className="text-sm text-gray-300">{item.action}</span>
                    </div>
                    <span className="text-sm font-semibold text-malbon-green-light whitespace-nowrap ml-2">
                      {item.points} 分
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExchangeSection() {
  const [activeTab, setActiveTab] = useState('starter')
  const [ref, isInView] = useInView()

  const tabs = [
    { key: 'starter', label: '低门槛' },
    { key: 'growth', label: '高频体验' },
    { key: 'premium', label: '稀缺体验' },
  ]

  return (
    <section id="exchange" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Bucket Coins消耗：只换体验，不换商品"
          subtitle="Bucket Coins 兑换的是门票和资格，商品本身仍需购买。这维护了品牌价值，避免Bucket Coins体系变成打折工具。"
        />

        {/* Tabs */}
        <div ref={ref} className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-malbon-gold text-dark-primary'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pointsRedemption[activeTab].map((item, i) => (
            <div
              key={i}
              className={`group bg-dark-card border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-malbon-green-light text-sm font-bold mb-4">{item.cost}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">{item.desc}</p>
              <div className="text-malbon-clay text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
