import { useMemo } from 'react'
import { SimpleLineChart } from '../charts/SimpleLineChart'

export function MemberAnalytics({ members }) {
  const stats = useMemo(() => {
    const total = members.length
    const active = members.filter((m) => m.status === 'active').length
    const dormant = members.filter((m) => m.status === 'dormant').length
    const churned = members.filter((m) => m.status === 'churned').length
    const newThisMonth = members.filter((m) => {
      const d = new Date(m.joinDate)
      const now = new Date()
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    const tierCounts = {}
    members.forEach((m) => {
      tierCounts[m.tier] = (tierCounts[m.tier] || 0) + 1
    })

    const avgSpend = total > 0 ? Math.round(members.reduce((s, m) => s + m.totalSpend, 0) / total) : 0

    const riskMembers = members
      .filter((m) => m.status === 'dormant' || m.status === 'churned')
      .sort((a, b) => new Date(a.lastActive) - new Date(b.lastActive))
      .slice(0, 10)

    // Simulate 30-day active trend
    const trendData = Array.from({ length: 30 }, (_, i) => {
      const base = Math.round(active * 0.6)
      const noise = Math.round((Math.random() - 0.5) * active * 0.3)
      return Math.max(0, base + noise)
    })

    return { total, active, dormant, churned, newThisMonth, tierCounts, avgSpend, riskMembers, trendData }
  }, [members])

  const tierColors = { L1: '#6B7280', L2: '#2D5A3D', L3: '#34D399', L4: '#D4AF37', L5: '#F0D878' }
  const tierLabels = { L1: 'L1 新秀', L2: 'L2 冒险家', L3: 'L3 单差点', L4: 'L4 MBC', L5: 'L5 Condor' }

  const pieTotal = Object.values(stats.tierCounts).reduce((a, b) => a + b, 0) || 1
  let currentAngle = 0
  const pieSlices = Object.entries(stats.tierCounts).map(([tier, count]) => {
    const angle = (count / pieTotal) * 360
    const start = currentAngle
    currentAngle += angle
    return { tier, count, start, angle, color: tierColors[tier] }
  })

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: '总会员数', value: stats.total, color: 'text-white' },
          { label: '本月新增', value: stats.newThisMonth, color: 'text-malbon-green-light' },
          { label: '活跃会员', value: stats.active, color: 'text-green-400' },
          { label: '流失风险', value: stats.dormant + stats.churned, color: 'text-red-400' },
          { label: '平均客单', value: `¥${stats.avgSpend.toLocaleString()}`, color: 'text-malbon-gold' },
        ].map((item, i) => (
          <div key={i} className="bg-dark-card border border-white/[0.06] rounded-2xl p-4">
            <div className="text-xs text-gray-500 mb-1">{item.label}</div>
            <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
          <h4 className="text-base font-bold text-white mb-4">会员分层</h4>
          <div className="flex items-center gap-6">
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
                {pieSlices.map((slice, i) => (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={slice.color}
                    strokeWidth="20"
                    strokeDasharray={`${(slice.angle / 360) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                    strokeDashoffset={-((slice.start / 360) * 2 * Math.PI * 40)}
                    className="transition-all duration-700"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{stats.total}</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {Object.entries(stats.tierCounts).map(([tier, count]) => (
                <div key={tier} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tierColors[tier] }} />
                    <span className="text-sm text-gray-400">{tierLabels[tier]}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{count} ({Math.round((count / pieTotal) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 30-day Trend */}
        <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
          <h4 className="text-base font-bold text-white mb-4">30 天活跃趋势</h4>
          <SimpleLineChart
            data={stats.trendData}
            labels={Array.from({ length: 30 }, (_, i) => `${i + 1}日`)}
            color="#34D399"
          />
        </div>
      </div>

      {/* Risk List */}
      <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
        <h4 className="text-base font-bold text-white mb-4">流失风险名单</h4>
        {stats.riskMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">会员</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">等级</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">状态</th>
                  <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">总消费</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">最后活跃</th>
                </tr>
              </thead>
              <tbody>
                {stats.riskMembers.map((m) => {
                  const daysAgo = Math.floor((Date.now() - new Date(m.lastActive).getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <tr key={m.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-malbon-green flex items-center justify-center text-white text-xs font-bold">
                            {m.avatar}
                          </div>
                          <span className="text-sm text-white">{m.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-sm text-gray-300">{m.tier}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${m.status === 'dormant' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                          {m.status === 'dormant' ? '沉睡' : '流失'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-sm text-gray-300 font-mono">¥{m.totalSpend.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-sm text-gray-500">{m.lastActive} · {daysAgo}天前</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-8">暂无流失风险会员</div>
        )}
      </div>
    </div>
  )
}
