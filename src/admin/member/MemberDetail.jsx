import { useState } from 'react'

const TABS = [
  { id: 'points', label: '积分记录' },
  { id: 'spend', label: '消费记录' },
  { id: 'tier', label: '等级历史' },
]

export function MemberDetail({ member, onClose, onEdit, onAdjustPoints }) {
  const [activeTab, setActiveTab] = useState('points')

  if (!member) return null

  const statusColors = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    dormant: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    churned: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const statusLabels = { active: '活跃', dormant: '沉睡', churned: '流失' }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-dark-card border-l border-white/10 h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-white">会员详情</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-malbon-green flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${statusColors[member.status]}`}>
                  {statusLabels[member.status]}
                </span>
              </div>
              <div className="text-sm text-gray-400">{member.email}</div>
              <div className="text-sm text-gray-500">{member.phone}</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">Points</div>
              <div className="text-base font-bold text-malbon-green-light">{member.pointsBalance.toLocaleString()}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">Credits</div>
              <div className="text-base font-bold text-malbon-gold">{member.creditsTotal.toLocaleString()}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">总消费</div>
              <div className="text-base font-bold text-white">¥{member.totalSpend.toLocaleString()}</div>
            </div>
          </div>

          {/* Info Row */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-gray-500">等级</span>
              <span className="text-white font-medium">{member.tier}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-gray-500">注册时间</span>
              <span className="text-gray-300">{member.joinDate}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-gray-500">最后活跃</span>
              <span className="text-gray-300">{member.lastActive}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onEdit} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-green text-white hover:bg-malbon-green/90 transition-all">
              编辑会员
            </button>
            <button onClick={onAdjustPoints} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-gold text-dark-primary hover:bg-malbon-gold/90 transition-all">
              积分调整
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/10">
            <div className="flex gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'text-malbon-green-light border-malbon-green-light'
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'points' && (
            <div className="space-y-2">
              {member.transactions.slice(0, 15).map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                  <div>
                    <div className="text-sm text-gray-300">
                      {tx.source === 'manual' ? `手动调整${tx.reason ? ` · ${tx.reason}` : ''}` : tx.source}
                    </div>
                    <div className="text-xs text-gray-500">{tx.date}</div>
                  </div>
                  <span className={`text-sm font-semibold ${tx.type === 'earn' ? 'text-malbon-green-light' : 'text-red-400'}`}>
                    {tx.type === 'earn' ? '+' : ''}{tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              {member.transactions.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-8">暂无积分记录</div>
              )}
            </div>
          )}

          {activeTab === 'spend' && (
            <div className="space-y-2">
              {member.activities
                .filter((a) => a.type === 'purchase')
                .slice(0, 15)
                .map((act, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div>
                      <div className="text-sm text-gray-300">消费</div>
                      <div className="text-xs text-gray-500">{act.date}</div>
                    </div>
                    <span className="text-sm font-semibold text-white">¥{act.amount?.toLocaleString()}</span>
                  </div>
                ))}
              {member.activities.filter((a) => a.type === 'purchase').length === 0 && (
                <div className="text-sm text-gray-500 text-center py-8">暂无消费记录</div>
              )}
            </div>
          )}

          {activeTab === 'tier' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-malbon-green-light mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-300">注册成为会员</div>
                  <div className="text-xs text-gray-500">{member.joinDate}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-malbon-gold mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-300">当前等级 {member.tier}</div>
                  <div className="text-xs text-gray-500">Credits {member.creditsTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
