import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'
import { Button } from '../ui/Button'

export function MemberPathSection() {
  const [ref, isInView] = useInView()

  return (
    <section id="paths" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="三条路径，同一个俱乐部"
          subtitle="你可以一步到位，也可以慢慢积累，还能通过活跃免年费。殊途同归，都是 Malbon 的球友。"
        />

        <div ref={ref} className="mt-12 grid md:grid-cols-3 gap-6">
          {/* Path 1: Direct Pay */}
          <div
            className={`relative bg-dark-card border border-malbon-gold/20 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-gold/40 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-gold/10 border border-malbon-gold/20 flex items-center justify-center">
                <span className="text-sm font-bold text-malbon-gold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">直接付费</h3>
                <p className="text-sm text-malbon-gold">Paid Path · 立即享受</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                支付 ¥30,000 年费，立即成为 MBC
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                首年即享 Welcome Gift（价值超 ¥20,000）
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                3 场 Tournament + ¥3,000 Pro-shop 即刻解锁
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                次年续费享积分优惠（返 Points + 折扣）
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">适合：想立即享受的 impatient user</span>
              <Button variant="secondary" size="sm" href="#mbc">
                立即加入
              </Button>
            </div>
          </div>

          {/* Path 2: Credits达标 */}
          <div
            className={`relative bg-dark-card border border-malbon-green/20 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-green/40 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-green/10 border border-malbon-green/20 flex items-center justify-center">
                <span className="text-sm font-bold text-malbon-green-light">2</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Credits 达标</h3>
                <p className="text-sm text-malbon-green-light">Earned Path · 消费即积累</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                通过消费、签到、评价、活动积累 Credits
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                Credits 达 100,000 自动触发次年 MBC 赠送
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                次年享受完整 MBC 权益（含礼包）
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                第三年及以后每年续费 ¥30,000（享积分优惠）
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">适合：自然消费的高 loyal user</span>
              <Button variant="primary" size="sm" href="#tiers">
                查看进度
              </Button>
            </div>
          </div>

          {/* Path 3: Annual Goal */}
          <div
            className={`relative bg-dark-card border border-malbon-clay/20 rounded-2xl p-6 md:p-8 transition-all duration-600 hover:border-malbon-clay/40 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-malbon-clay/10 border border-malbon-clay/20 flex items-center justify-center">
                <span className="text-sm font-bold text-malbon-clay">3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">全年目标达成</h3>
                <p className="text-sm text-malbon-clay">Retention Path · 活跃免年费</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-clay mt-1.5 flex-shrink-0" />
                已是 MBC 会员，全年获得 Credits ≥ 60,000
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-clay mt-1.5 flex-shrink-0" />
                MBC 2x 倍率下，消费约 ¥25,000 即可达成
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-clay mt-1.5 flex-shrink-0" />
                达成即赠来年 MBC 会员（不含礼包）
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-malbon-clay mt-1.5 flex-shrink-0" />
                未达成则次年需付 ¥30,000 续费
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">适合：想免年费的老会员</span>
              <Button variant="outline" size="sm" href="#points">
                了解目标
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            路径 2 和路径 3 可叠加：消费达标获得次年 MBC，在赠送年内完成全年目标可再续一年免费。
          </p>
        </div>
      </div>
    </section>
  )
}
