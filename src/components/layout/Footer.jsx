export function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-white font-bold text-xl tracking-tight">MALBON</span>
              <span className="text-malbon-green-light font-bold text-xl tracking-tight">CLUB</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              最终目标：让用户买衣服，也进入一个更好的球友关系网络。
              购买装备获得积分，积分兑换体验，体验产生内容和社交，内容再推动复购与转介绍。
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-6 py-3 bg-malbon-green text-white font-semibold rounded-xl hover:bg-malbon-green/90 transition-colors"
            >
              回到顶部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          MALBON CLUB CRM Strategy — Play More, Live Better
        </div>
      </div>
    </footer>
  )
}
