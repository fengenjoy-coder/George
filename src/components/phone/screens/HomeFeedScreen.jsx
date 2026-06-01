import { events } from '../../../data/events'
import { useCountUp } from '../../../hooks/useCountUp'

export function HomeFeedScreen() {
  const coinCount = useCountUp(2840, 800)
  const xpCount = useCountUp(6520, 800)

  const dailyTasks = [
    { name: '每日签到', reward: '+5 Bucket Coins', done: true },
    { name: '球场打卡', reward: '+100 Bucket Coins', done: false },
    { name: '发布穿搭笔记', reward: '+50 Bucket Coins', done: false },
  ]

  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      {/* User header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-malbon-green flex items-center justify-center text-white font-bold text-sm border-2 border-malbon-sand">
            G
          </div>
          <div>
            <div className="text-sm font-bold text-black">George G.</div>
            <div className="text-xs text-gray-500">Veteran · L3</div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-malbon-gold/10">
          <span className="text-sm font-semibold text-malbon-gold">C</span>
          <span className="text-sm font-bold text-malbon-gold">{coinCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Level progress card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-black">成长进度</div>
          <div className="text-xs text-gray-500">{xpCount.toLocaleString()} / 15,000 XP</div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-malbon-green to-malbon-gold rounded-full" style={{ width: '43%' }} />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>L3 Veteran</span>
          <span>L4 MBC Member</span>
        </div>
      </div>

      {/* Daily tasks */}
      <div>
        <div className="text-sm font-bold text-black mb-3">今日任务</div>
        <div className="space-y-2">
          {dailyTasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-malbon-green border-malbon-green' : 'border-gray-300'}`}>
                  {task.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-black'}`}>{task.name}</span>
              </div>
              <span className="text-xs font-semibold text-malbon-green">{task.reward}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby events - horizontal scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-black">附近活动</div>
          <span className="text-xs text-malbon-green">查看全部</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {events.slice(0, 3).map((evt) => (
            <div key={evt.id} className="flex-shrink-0 w-[240px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 snap-start">
              <div className="text-3xl mb-2">{evt.image}</div>
              <div className="text-xs text-malbon-green font-semibold mb-1">{evt.category === 'tournament' ? 'Tournaments' : evt.category === 'course' ? '课程' : '交流'}</div>
              <div className="text-sm font-bold text-black mb-1 truncate">{evt.title}</div>
              <div className="text-xs text-gray-500">{evt.date} · {evt.location.split('·')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Community feed preview */}
      <div>
        <div className="text-sm font-bold text-black mb-3">社区精选</div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">J</div>
            <div>
              <div className="text-xs font-bold text-black">Jason L.</div>
              <div className="text-[10px] text-gray-400">Veteran · 5小时前</div>
            </div>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">今天穿着 Malbon 新款 Polo 下场，果岭上的表现比穿搭更稳</div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span>Like 128</span>
            <span>Comment 23</span>
          </div>
        </div>
      </div>
    </div>
  )
}
