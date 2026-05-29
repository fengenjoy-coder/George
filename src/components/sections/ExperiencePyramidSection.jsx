import { activityMatrix } from '../../data/events'
import { coreLoop } from '../../data/navigation'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function ExperiencePyramidSection() {
  const [ref1, isInView1] = useInView()
  const [ref2, isInView2] = useInView()

  const columns = [
    { key: 'tournament', title: 'Tournaments', color: 'text-malbon-gold', borderColor: 'border-malbon-gold/20', bgColor: 'bg-malbon-gold/5' },
    { key: 'course', title: '课程', color: 'text-malbon-green-light', borderColor: 'border-malbon-green/20', bgColor: 'bg-malbon-green/5' },
    { key: 'social', title: '交流', color: 'text-blue-400', borderColor: 'border-blue-400/20', bgColor: 'bg-blue-400/5' },
  ]

  return (
    <section id="activities" className="relative py-24 md:py-32 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="体验活动矩阵：Tournaments、Courses、Social 共同拉动复购"
          subtitle="用户在活动里穿上品牌、认识球友、产生内容，再回到商城和门店形成下一轮购买。"
          light
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Activity columns */}
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4" ref={ref1}>
            {columns.map((col, colIndex) => (
              <div
                key={col.key}
                className={`rounded-2xl border ${col.borderColor} ${col.bgColor} p-5 transition-all duration-600 ${
                  isInView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${colIndex * 150}ms` }}
              >
                <h3 className={`text-lg font-bold ${col.color} mb-4`}>{col.title}</h3>
                <div className="space-y-4">
                  {activityMatrix[col.key].map((item, i) => (
                    <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="text-sm font-semibold text-white mb-1">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Loop steps */}
          <div ref={ref2} className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">运营闭环</h3>
            {coreLoop.map((step, i) => (
              <div
                key={step.step}
                className={`flex items-start gap-4 p-4 rounded-xl bg-dark-card border border-white/[0.06] transition-all duration-500 ${
                  isInView2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-malbon-green flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
