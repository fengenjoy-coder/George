import { tiers } from '../../../data/tiers'
import { useCountUp } from '../../../hooks/useCountUp'

export function LevelCoinsScreen() {
  const coinBalance = useCountUp(2840, 800)
  const totalEarned = useCountUp(12500, 1000)

  const transactions = [
    { name: '每日签到', coins: 5, date: '今天', type: 'earn' },
    { name: 'MBC Tournaments 报名', coins: -5000, date: '昨天', type: 'spend' },
    { name: '穿搭分享获赞', coins: 200, date: '昨天', type: 'earn' },
    { name: '首单购买返币', coins: 300, date: '3天前', type: 'earn' },
    { name: '邀请好友首单', coins: 500, date: '上周', type: 'earn' },
  ]

  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      {/* Coins header */}
      <div className="text-center py-4">
        <div className="text-xs text-gray-500 mb-1">MALBON COINS</div>
        <div className="text-4xl font-bold text-black tracking-tight">{coinBalance.toLocaleString()}</div>
        <div className="text-xs text-gray-400 mt-1">累计获得 {totalEarned.toLocaleString()} Coins</div>
      </div>

      {/* Current tier card */}
      <div className="bg-malbon-green rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs opacity-80">当前等级</div>
            <div className="text-xl font-bold">Veteran</div>
            <div className="text-xs opacity-80">L3</div>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            L3
          </div>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-white rounded-full" style={{ width: '43%' }} />
        </div>
        <div className="flex justify-between text-[10px] opacity-80">
          <span>6,520 / 15,000 XP</span>
          <span>距 L4 还差 8,480 XP</span>
        </div>
      </div>

      {/* Tier benefits */}
      <div>
        <div className="text-sm font-bold text-black mb-3">等级权益</div>
        <div className="space-y-2">
          {tiers.map((tier, i) => (
            <div key={tier.level} className={`flex items-center gap-3 p-3 rounded-xl border ${i === 2 ? 'bg-malbon-green/5 border-malbon-green/20' : 'bg-white border-gray-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`} style={{ background: tier.color }}>
                {tier.level}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${i === 2 ? 'text-malbon-green' : 'text-black'}`}>{tier.name}</span>
                  <span className="text-[10px] text-gray-400">{tier.xp.toLocaleString()} XP</span>
                </div>
                <div className="text-[10px] text-gray-400 truncate">{tier.benefits[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <div className="text-sm font-bold text-black mb-3">收支记录</div>
        <div className="space-y-1">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
              <div>
                <div className="text-sm text-black">{tx.name}</div>
                <div className="text-[10px] text-gray-400">{tx.date}</div>
              </div>
              <span className={`text-sm font-bold ${tx.type === 'earn' ? 'text-malbon-green' : 'text-red-500'}`}>
                {tx.type === 'earn' ? '+' : ''}{tx.coins}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
