import { modules } from '../../data/navigation'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

export function ModulesSection() {
  const [ref, isInView] = useInView()

  return (
    <section id="modules" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="产品模块建议：把 CRM 做成一个会员俱乐部入口"
          subtitle="可落在 App、小程序、企微私域或品牌商城中，先做最小可运营闭环，再逐步扩展社区和内容。"
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {modules.map((mod, i) => (
            <div
              key={i}
              className={`group bg-dark-card border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
