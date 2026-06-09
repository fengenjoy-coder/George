import { coreLoop } from '../../data/navigation'
const coreLoopSubtitle = "购买装备获得 Points，Points 兑换体验，体验产生内容和社交，内容再推动复购与转介绍。每年自然年进行等级评估，持续活跃才能保住权益。"
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function CoreLoopSection() {
  const [ref, isInView] = useInView()

  return (
    <section className="relative py-24 md:py-32 bg-dark-secondary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-malbon-green/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-malbon-gold/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-malbon-green/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="核心玩法闭环"
          subtitle={coreLoopSubtitle}
          light
          align="center"
        />

        <div ref={ref} className="mt-16">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            {coreLoop.map((step, i) => (
              <div key={step.step} className="flex items-center gap-4">
                <div
                  className={`relative w-48 transition-all duration-600 ${
                    isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-6 text-center hover:border-malbon-green/30 transition-colors">
                    <div className="w-14 h-14 mx-auto rounded-full bg-malbon-green flex items-center justify-center text-white font-bold text-xl mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < coreLoop.length - 1 && (
                  <div
                    className={`flex-shrink-0 transition-all duration-500 ${
                      isInView ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${i * 200 + 150}ms` }}
                  >
                    <svg className="w-8 h-8 text-malbon-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="lg:hidden space-y-4">
            {coreLoop.map((step, i) => (
              <div
                key={step.step}
                className={`flex items-center gap-4 bg-dark-card border border-white/[0.08] rounded-2xl p-5 transition-all duration-600 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-malbon-green flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
