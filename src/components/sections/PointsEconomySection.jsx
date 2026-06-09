import { useState } from 'react'
import { pointsAcquisition, creditsAcquisition, pointsRedemption } from '../../data/points'
import { SectionHeading } from '../ui/SectionHeading'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

export function PointsEconomySection() {
  const [activeTab, setActiveTab] = useState('starter')
  const [ref, isInView] = useInView()
  const pointsValue = useCountUp(3, 1500)

  const tabLabels = {
    starter: '低门槛',
    growth: '高频体验',
    premium: '稀缺体验',
  }

  return (
    <section id="points" className="relative py-24 md:py-32 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Points + Credits 双轨经济：消费驱动 + 行为驱动 + 社交驱动"
          subtitle="积分经济体系"
          light
        />

        {/* Dual-track overview */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Points Card */}
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card padding="lg" className="h-full bg-gradient-to-br from-malbon-green/10 to-transparent border-malbon-green/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-malbon-green/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-malbon-green-light">P</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Points（积分）</h3>
                  <p className="text-xs text-gray-400">可消费、会过期</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Points 是"钱"，花了就没了。可兑换课程、赛事、服务券和稀缺体验。24 个月滚动过期。
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-malbon-green-light">{pointsValue}</span>
                <span className="text-lg text-malbon-green">%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">回馈率 = 100 Points = ¥3</p>
            </Card>
          </div>

          {/* Credits Card */}
          <div className={`transition-all duration-700 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card padding="lg" className="h-full bg-gradient-to-br from-malbon-gold/10 to-transparent border-malbon-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-malbon-gold/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-malbon-gold">C</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Credits（成长值）</h3>
                  <p className="text-xs text-gray-400">只增不减、年度重置</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Credits 是"履历"，记录你对品牌的贡献深度。不可消费，决定 L1-L5 等级。自然年底 L1-L3 清零。
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-malbon-gold">100,000</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Credits 达标 = 次年 MBC 赠送</p>
            </Card>
          </div>
        </div>

        {/* Points Acquisition */}
        <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card padding="lg" className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-6">Points 获取方式</h3>
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
                    {item.points} P
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Credits Acquisition */}
        <div className={`transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-white mb-6">Credits 获取方式</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {creditsAcquisition.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="dark" size="sm">{item.category}</Badge>
                    <span className="text-sm text-gray-300">{item.action}</span>
                  </div>
                  <span className="text-sm font-semibold text-malbon-gold whitespace-nowrap ml-2">
                    {item.credits} C
                  </span>
                </div>
              ))}
            </div>
          </Card>
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
          title="Points 消耗：只换体验，不换商品"
          subtitle="Points 兑换的是门票和资格，商品本身仍需购买。这维护了品牌价值，避免 Points 体系变成打折工具。"
        />

        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">汇率锚定：</span>
          <Badge variant="green" size="sm">100 Points = ¥3</Badge>
          <span className="text-xs text-gray-600 ml-2">回馈率 3%，占毛利 30% 的 10%</span>
        </div>

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
              <div className="text-malbon-clay text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
