import { events } from '../../../data/events'

export function EventDetailScreen() {
  const evt = events[0] // Show first event as detail

  return (
    <div className="pb-4">
      {/* Hero image area */}
      <div className="h-48 bg-malbon-green/10 flex items-center justify-center relative">
        <div className="text-6xl">{evt.image}</div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-malbon-green">
          {evt.category === 'tournament' ? 'Tournaments' : evt.category === 'course' ? '课程' : '交流'}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-black mb-2">{evt.title}</h1>
          <p className="text-sm text-gray-500 leading-relaxed">{evt.desc}</p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1">时间</div>
            <div className="text-sm font-semibold text-black">{evt.date}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1">地点</div>
            <div className="text-sm font-semibold text-black truncate">{evt.location}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1">等级要求</div>
            <div className="text-sm font-semibold text-black">{evt.level}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1">消耗Coins</div>
            <div className="text-sm font-semibold text-malbon-gold">{evt.cost}</div>
          </div>
        </div>

        {/* Spots left */}
        <div className="bg-malbon-green/5 rounded-xl p-4 border border-malbon-green/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-black">剩余名额</span>
            <span className="text-sm font-bold text-malbon-green">23 / 120</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-malbon-green rounded-full" style={{ width: '81%' }} />
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 bg-malbon-green text-white font-bold rounded-xl active:scale-[0.97] transition-transform shadow-lg shadow-malbon-green/20">
          使用Coins报名
        </button>
      </div>
    </div>
  )
}
