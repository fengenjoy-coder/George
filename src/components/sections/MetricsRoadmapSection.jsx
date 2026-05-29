import { metrics, roadmap } from '../../data/navigation'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function MetricsRoadmapSection() {
  const [ref1, isInView1] = useInView()
  const [ref2, isInView2] = useInView()

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="关键成功指标与落地节奏"
          subtitle="从 MVP 到成熟，分阶段推进，每一步都有可量化的目标。"
        />

        {/* Metrics */}
        <div ref={ref1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`bg-dark-card border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] ${
                isInView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-malbon-green-light mb-2">
                {metric.target}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.desc}</div>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div ref={ref2} className="relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-malbon-green/30 via-malbon-gold/30 to-malbon-green/30 hidden lg:block" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {roadmap.map((item, i) => (
              <div
                key={i}
                className={`relative transition-all duration-600 ${
                  isInView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-malbon-green-light ring-4 ring-malbon-green/20" />
                </div>

                <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-malbon-green/10 text-malbon-green-light text-xs font-bold">
                      {item.phase}
                    </span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
