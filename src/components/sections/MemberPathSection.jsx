import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'
import { Button } from '../ui/Button'

export function MemberPathSection() {
  const [ref, isInView] = useInView()

  return (
    <section id="paths" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="两条路径，同一个俱乐部"
          subtitle="你可以一步一步来，也可以选择一步到位。殊途同归，都是 Malbon 的球友。"
        />

        <div ref={ref} className="mt-12 grid md:grid-cols-2 gap-6 relative">
          {/* Center divider on desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center z-10">
            <div className="w-12 h-12 rounded-full bg-dark-card border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-400">VS</span>
            </div>
          </div>

          {/* Free Path */}
          <div
            className={`relative bg-dark-card border border-malbon-green/20 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-green/40 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-green/10 border border-malbon-green/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-malbon-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">普通玩家路径</h3>
                <p className="text-sm text-malbon-green-light">Free Path · L1-L3</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                免费注册，从零开始
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                通过消费返币 + 参与活动 + 内容贡献升级
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                每年自然年等级清零，需持续活跃重新积累
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                升级周期：3-6 个月（L1 → L3）
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">终点：L3 进阶单差点</span>
              <Button variant="primary" size="sm" href="#tiers">
                开始积累
              </Button>
            </div>
          </div>

          {/* Paid Path */}
          <div
            className={`relative bg-dark-card border border-malbon-gold/20 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-gold/40 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-gold/10 border border-malbon-gold/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-malbon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">人民币玩家路径</h3>
                <p className="text-sm text-malbon-gold">Paid Path · L4-L5</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                一步到位，跳过积累过程
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                年费 30,000 或入会费 100 万，立享专属权益
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                Welcome Gift、专属赛事、Pro-shop 等即刻解锁
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                年费续费 / 消费活跃度评估维持身份
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">终点：L5 Condor Member</span>
              <Button variant="secondary" size="sm" href="#mbc">
                立即加入
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom conversion note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            普通玩家也可以通过消费积累后选择付费升级，两条路径殊途同归。
          </p>
        </div>
      </div>
    </section>
  )
}
