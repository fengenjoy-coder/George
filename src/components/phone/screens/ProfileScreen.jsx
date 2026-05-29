import { useCountUp } from '../../../hooks/useCountUp'

export function ProfileScreen() {
  const rounds = useCountUp(47, 800)
  const eventsJoined = useCountUp(12, 800)
  const coins = useCountUp(2840, 800)
  const followers = useCountUp(328, 800)

  const stats = [
    { label: '下场次数', value: rounds, suffix: '轮' },
    { label: '参加活动', value: eventsJoined, suffix: '场' },
    { label: '累计Coins', value: coins, suffix: '' },
    { label: '粉丝', value: followers, suffix: '' },
  ]

  const activities = [
    { action: '报名了 MBC Tournaments', time: '2小时前', icon: 'T' },
    { action: '发布了穿搭笔记', time: '昨天', icon: 'S' },
    { action: '完成了球场打卡', time: '3天前', icon: 'C' },
    { action: '获得了「穿搭达人」徽章', time: '上周', icon: 'B' },
  ]

  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      {/* Profile header */}
      <div className="flex flex-col items-center py-4">
        <div className="w-20 h-20 rounded-full bg-malbon-green flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg shadow-malbon-green/30 border-2 border-malbon-sand">
          G
        </div>
        <div className="text-lg font-bold text-black">George G.</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2.5 py-0.5 rounded-full bg-malbon-green/10 text-malbon-green text-xs font-bold">Veteran L3</span>
          <span className="px-2.5 py-0.5 rounded-full bg-malbon-gold/10 text-malbon-gold text-xs font-bold">MBC Member 预备</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-xl font-bold text-black">{stat.value.toLocaleString()}{stat.suffix}</div>
            <div className="text-[10px] text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <div className="text-sm font-bold text-black mb-3">最近动态</div>
        <div className="space-y-2">
          {activities.map((act, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-lg">{act.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-black">{act.action}</div>
                <div className="text-[10px] text-gray-400">{act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
