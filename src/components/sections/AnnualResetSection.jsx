import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function AnnualResetSection() {
  const [ref, isInView] = useInView()

  const freeTiers = [
    'Bucket Coins 余额保留',
    '成长值清零，等级回到 L1',
    '需重新积累成长值升级',
    '历史最高等级作为荣誉记录',
  ]

  const paidTiers = [
    'L4 MBC Member：年费 30,000 RMB，每年到期需续费',
    'L5 Condor Member：每年维持消费活跃度评估',
    '续费/达标后等级保留，权益延续',
    '不续费/不达标则降级，失去专属权益',
  ]

  return (
    <section id="annual-reset" className="relative py-24 md:py-32 bg-dark-secondary overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-malbon-green/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="年度会员评估机制"
          subtitle="每年自然年进行一次等级复盘，激励持续活跃，保住等级才能持续享受专属权益。"
          light
        />

        <div ref={ref} className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Free tiers */}
          <div
            className={`bg-dark-card border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-clay/30 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-clay/10 border border-malbon-clay/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-malbon-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">L1-L3 免费积分会员</h3>
                <p className="text-sm text-malbon-clay">年度清零机制</p>
              </div>
            </div>
            <ul className="space-y-3">
              {freeTiers.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-malbon-clay mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Paid tiers */}
          <div
            className={`bg-dark-card border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-gold/30 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-gold/10 border border-malbon-gold/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-malbon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">L4-L5 付费会员</h3>
                <p className="text-sm text-malbon-gold">持续付费/评估机制</p>
              </div>
            </div>
            <ul className="space-y-3">
              {paidTiers.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
