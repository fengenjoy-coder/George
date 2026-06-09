import { tiers } from '../../data/tiers'
import { SectionHeading } from '../ui/SectionHeading'
import { ProgressBar } from '../ui/ProgressBar'
import { Badge } from '../ui/Badge'
import { useInView } from '../../hooks/useInView'

function TierCard({ tier, index }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`group relative bg-dark-card border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-xl hover:shadow-black/40 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Level indicator */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant={index >= 3 ? 'gold' : 'green'}>{tier.level}</Badge>
        <span className="text-xs text-gray-500 font-mono">{tier.nameEn}</span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">{tier.description}</p>

      {/* Points multiplier */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={index >= 3 ? 'gold' : 'green'} size="sm">
          Points {tier.pointsMultiplier}x
        </Badge>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-6">
        {tier.benefits.slice(0, 3).map((benefit, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-malbon-green-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {benefit}
          </div>
        ))}
      </div>

      {/* Credits Progress */}
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Credits</span>
          <span>{tier.credits.toLocaleString()}</span>
        </div>
        <ProgressBar value={tier.progress} color={index >= 3 ? 'gold' : 'gradient'} size="sm" />
      </div>

      {/* L4 Entry Paths */}
      {tier.entryPaths && (
        <div className="mt-4 space-y-2">
          <div className="text-xs text-gray-500 font-semibold mb-2">三种进入方式：</div>
          {tier.entryPaths.map((path, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="w-4 h-4 rounded-full bg-malbon-gold/20 text-malbon-gold flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                {i + 1}
              </span>
              <div>
                <span className="text-malbon-gold font-semibold">{path.name}：</span>
                <span className="text-gray-400">{path.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Annual reset label */}
      {tier.annualReset && (
        <div className={`mt-4 px-3 py-1.5 rounded-lg text-xs font-semibold text-center ${
          tier.annualReset.type === 'free'
            ? 'bg-malbon-clay/10 text-malbon-clay border border-malbon-clay/20'
            : 'bg-malbon-gold/10 text-malbon-gold border border-malbon-gold/20'
        }`}>
          {tier.annualReset.label}
        </div>
      )}

      {/* Renewal discount for L4 */}
      {tier.renewalDiscount && (
        <div className="mt-3 space-y-1">
          <div className="text-xs text-gray-500">续费积分优惠：</div>
          {tier.renewalDiscount.map((d, i) => (
            <div key={i} className="text-[10px] text-gray-400">
              {d.years}年：{d.discount} ¥{d.price.toLocaleString()} + 返 {d.returnPoints.toLocaleString()} Points
            </div>
          ))}
        </div>
      )}

      {/* Glow effect for high tiers */}
      {index >= 3 && (
        <div className="absolute inset-0 rounded-2xl bg-malbon-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </div>
  )
}

export function TierSystemSection() {
  return (
    <section id="tiers" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="两条路径，五种身份"
          subtitle="免费加入"
          tagline="升级打怪 mode"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {tiers.map((tier, index) => (
            <TierCard key={tier.level} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
