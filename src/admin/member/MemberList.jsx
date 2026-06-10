import { useState } from 'react'

const STATUS_OPTIONS = [
  { value: 'all', label: '全部状态' },
  { value: 'active', label: '活跃' },
  { value: 'dormant', label: '沉睡' },
  { value: 'churned', label: '流失' },
]

const TIER_OPTIONS = [
  { value: 'all', label: '全部等级' },
  { value: 'L1', label: 'L1' },
  { value: 'L2', label: 'L2' },
  { value: 'L3', label: 'L3' },
  { value: 'L4', label: 'L4' },
  { value: 'L5', label: 'L5' },
]

export function MemberList({
  members,
  paginated,
  totalPages,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  filterTier,
  setFilterTier,
  filterStatus,
  setFilterStatus,
  onViewDetail,
  onEdit,
  onDelete,
  onAdd,
  onAdjustPoints,
}) {
  const [deletingId, setDeletingId] = useState(null)

  const statusColors = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    dormant: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    churned: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const statusLabels = { active: '活跃', dormant: '沉睡', churned: '流失' }

  const tierColors = {
    L1: 'bg-gray-500',
    L2: 'bg-malbon-green',
    L3: 'bg-malbon-green-light',
    L4: 'bg-malbon-gold',
    L5: 'bg-malbon-gold',
  }

  const handleDelete = (id) => {
    if (deletingId === id) {
      onDelete(id)
      setDeletingId(null)
    } else {
      setDeletingId(id)
      setTimeout(() => setDeletingId(null), 3000)
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
            placeholder="搜索姓名或手机号..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50"
          />
        </div>
        <select
          value={filterTier}
          onChange={(e) => { setFilterTier(e.target.value); setPage(1) }}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
        >
          {TIER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          onClick={onAdd}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-green text-white hover:bg-malbon-green/90 transition-all whitespace-nowrap"
        >
          + 新增会员
        </button>
      </div>

      {/* Table */}
      <div className="bg-dark-card border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">会员</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">等级</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">状态</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 font-medium">总消费</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 font-medium">Points</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 font-medium">Credits</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">最后活跃</th>
                <th className="text-right py-3 px-4 text-xs text-gray-500 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((m) => (
                <tr key={m.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${tierColors[m.tier]} flex items-center justify-center text-white text-xs font-bold`}>
                        {m.avatar}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-300 font-medium">{m.tier}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${statusColors[m.status]}`}>
                      {statusLabels[m.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-300 font-mono">
                    ¥{m.totalSpend.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-malbon-green-light font-mono">
                    {m.pointsBalance.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-malbon-gold font-mono">
                    {m.creditsTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {m.lastActive}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewDetail(m)}
                        className="text-xs text-gray-400 hover:text-malbon-green-light transition-colors"
                      >
                        详情
                      </button>
                      <button
                        onClick={() => onEdit(m)}
                        className="text-xs text-gray-400 hover:text-malbon-gold transition-colors"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className={`text-xs transition-colors ${deletingId === m.id ? 'text-red-400 font-semibold' : 'text-gray-400 hover:text-red-400'}`}
                      >
                        {deletingId === m.id ? '确认删除' : '删除'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-gray-500">
                    暂无会员数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <span className="text-xs text-gray-500">
              共 {members.length} 条，第 {page} / {totalPages} 页
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                上一页
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
