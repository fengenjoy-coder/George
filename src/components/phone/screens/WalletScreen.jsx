import { tiers } from '../../../data/tiers'
import { useCountUp } from '../../../hooks/useCountUp'

export function WalletScreen() {
  const pointsBalance = useCountUp(2840, 800)
  const creditsTotal = useCountUp(45200, 1000)
  const creditsTarget = 100000
  const creditsProgress = Math.round((45200 / creditsTarget) * 100)

  const transactions = [
    { name: '每日签到', points: 5, credits: 10, date: '今天', type: 'earn' },
    { name: 'MBC Tournaments 报名', points: -25000, credits: 2000, date: '昨天', type: 'spend' },
    { name: '穿搭分享获赞', points: 200, credits: 500, date: '昨天', type: 'earn' },
    { name: '首单购买返积分', points: 300, credits: 2000, date: '3天前', type: 'earn' },
    { name: '邀请好友首单', points: 500, credits: 1000, date: '上周', type: 'earn' },
  ]

  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      {/* Dual balance header */}
      <div className="grid grid-cols-2 gap-3">
        {/* Points Card */}
        <div className="bg-malbon-green rounded-2xl p-4 text-white text-center">
          <div className="text-[10px] opacity-80 mb-1">POINTS</div>
          <div className="text-2xl font-bold tracking-tight">{pointsBalance.toLocaleString()}</div>
          <div className="text-[10px] opacity-80 mt-1">100P = ¥3</div>
        </div>

        {/* Credits Card */}
        <div className="bg-malbon-gold rounded-2xl p-4 text-dark-primary text-center">
          <div className="text-[10px] opacity-80 mb-1">CREDITS</div>
          <div className="text-2xl font-bold tracking-tight">{creditsTotal.toLocaleString()}</div>
          <div className="text-[10px] opacity-80 mt-1">距 MBC {((creditsTarget - 45200) / 10000).toFixed(1)}万</div>
        </div>
      </div>

      {/* Credits progress to L4 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-black">MBC 进度</div>
          <div className="text-xs text-gray-500">{creditsTotal.toLocaleString()} / {creditsTarget.toLocaleString()}</div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-malbon-green to-malbon-gold rounded-full" style={{ width: `${creditsProgress}%` }} />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>L3 Veteran</span>
          <span>L4 MBC Member</span>
        </div>
        {creditsProgress >= 100 && (
          <div className="mt-2 px-3 py-1.5 rounded-lg bg-malbon-gold/10 text-malbon-gold text-xs font-semibold text-center">
            已达标！次年自动赠送 MBC 会员
          </div>
        )}
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
          <span>45,200 / 100,000 Credits</span>
          <span>距 L4 还差 {(100000 - 45200).toLocaleString()} Credits</span>
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
                  <span className="text-[10px] text-gray-400">{tier.credits.toLocaleString()} C</span>
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
              <div className="text-right">
                <div className={`text-sm font-bold ${tx.type === 'earn' ? 'text-malbon-green' : 'text-red-500'}`}>
                  {tx.type === 'earn' ? '+' : ''}{tx.points.toLocaleString()} P
                </div>
                <div className="text-[10px] text-gray-400">
                  {tx.type === 'earn' ? '+' : ''}{tx.credits.toLocaleString()} C
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
