import { rules } from '../../data/navigation'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function RulesSection() {
  const [ref, isInView] = useInView()

  return (
    <section className="relative py-24 md:py-32 bg-dark-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="关键运营规则"
          subtitle="这套玩法的目标不是把价格打低，而是把品牌服务做厚，让用户愿意进入更专业的高尔夫生活圈层。"
          light
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rules.map((rule, i) => (
            <div
              key={i}
              className={`bg-dark-card border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-malbon-green/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-malbon-green/10 border border-malbon-green/20 flex items-center justify-center text-malbon-green-light font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
