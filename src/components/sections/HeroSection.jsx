import { useCountUp } from '../../hooks/useCountUp'
import { Button } from '../ui/Button'

export function HeroSection() {
  const tiers = useCountUp(5, 1200)
  const values = useCountUp(2, 1200)
  const activities = useCountUp(3, 1200)

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,90,61,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.08),transparent_50%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-malbon-green/10 border border-malbon-green/20">
              <span className="w-2 h-2 rounded-full bg-malbon-green-light animate-pulse" />
              <span className="text-malbon-green-light text-sm font-medium">Malbon Golf 会员增长方案</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-malbon-green-light">
                GREEN IS THE COMMON GROUND
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              以等级升级、Bucket Coins获取、体验置换为核心玩法，让会员在品牌里完成购买、打球、学习、社交、内容分享和复购。
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="#tiers">
                查看玩法框架
              </Button>
              <Button variant="secondary" size="lg" href="#exchange">
                Bucket Coins可兑换什么
              </Button>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-16 rounded-full border border-malbon-green/30" />
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-malbon-green/20 to-malbon-sand/10" />

              {/* Center logo */}
              <div className="relative aspect-square flex items-center justify-center">
                <img src="/images/malbon-logo-white.png" alt="Malbon" className="w-40 h-auto drop-shadow-2xl" />
              </div>

              {/* Orbiting elements */}
              <div className="absolute top-4 right-8 px-3 py-1.5 rounded-full bg-dark-card border border-white/10 text-xs text-gray-300">
                Tournaments
              </div>
              <div className="absolute bottom-12 left-2 px-3 py-1.5 rounded-full bg-dark-card border border-white/10 text-xs text-gray-300">
                Courses
              </div>
              <div className="absolute top-1/2 -right-6 px-3 py-1.5 rounded-full bg-dark-card border border-white/10 text-xs text-gray-300">
                Social
              </div>
            </div>
          </div>
        </div>

        {/* Signal strip */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: tiers, suffix: '级', label: '从练习场新秀到 Condor Member' },
            { value: values, suffix: '值', label: '成长值定等级，Bucket Coins兑体验' },
            { value: activities, suffix: '类', label: 'Tournaments, Courses, Social' },
          ].map((item, i) => (
            <div key={i} className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {item.value}{item.suffix}
              </div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
