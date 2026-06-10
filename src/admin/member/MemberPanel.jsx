import { useState } from 'react'
import { useMembers } from './useMembers'
import { MemberList } from './MemberList'
import { MemberDetail } from './MemberDetail'
import { MemberForm } from './MemberForm'
import { PointsOperation } from './PointsOperation'
import { MemberAnalytics } from './MemberAnalytics'

export function MemberPanel() {
  const membersHook = useMembers()
  const [viewMode, setViewMode] = useState('list') // list | analytics
  const [selectedMember, setSelectedMember] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showPointsOp, setShowPointsOp] = useState(false)

  const handleViewDetail = (member) => {
    setSelectedMember(member)
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingMember(null)
    setShowForm(true)
  }

  const handleSave = (data) => {
    if (editingMember) {
      membersHook.updateMember(editingMember.id, data)
    } else {
      membersHook.addMember(data)
    }
  }

  const handleAdjustPoints = (type, amount, reason) => {
    if (selectedMember) {
      const isPoints = type.includes('Points')
      const isAdd = type.includes('增加')
      const field = isPoints ? 'pointsBalance' : 'creditsTotal'
      const delta = isAdd ? amount : -amount
      membersHook.updateMember(selectedMember.id, {
        [field]: Math.max(0, (selectedMember[field] || 0) + delta),
        transactions: [
          {
            type: isAdd ? 'earn' : 'spend',
            amount: delta,
            source: 'manual',
            reason,
            date: new Date().toISOString().split('T')[0],
          },
          ...(selectedMember.transactions || []),
        ],
      })
      // Refresh selected member
      const updated = membersHook.members.find((m) => m.id === selectedMember.id)
      if (updated) setSelectedMember(updated)
    }
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">会员管理</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-malbon-green/10 text-malbon-green-light border border-malbon-green/20'
                : 'text-gray-400 hover:text-white border border-transparent hover:bg-white/[0.03]'
            }`}
          >
            会员列表
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              viewMode === 'analytics'
                ? 'bg-malbon-green/10 text-malbon-green-light border border-malbon-green/20'
                : 'text-gray-400 hover:text-white border border-transparent hover:bg-white/[0.03]'
            }`}
          >
            数据分析
          </button>
          <button
            onClick={membersHook.resetData}
            className="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-300 border border-white/10 hover:bg-white/5 transition-all"
          >
            重置数据
          </button>
        </div>
      </div>

      {viewMode === 'list' && (
        <MemberList
          {...membersHook}
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={membersHook.deleteMember}
          onAdd={handleAdd}
        />
      )}

      {viewMode === 'analytics' && (
        <MemberAnalytics members={membersHook.members} />
      )}

      {selectedMember && (
        <MemberDetail
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEdit={() => handleEdit(selectedMember)}
          onAdjustPoints={() => setShowPointsOp(true)}
        />
      )}

      {showForm && (
        <MemberForm
          member={editingMember}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showPointsOp && selectedMember && (
        <PointsOperation
          member={selectedMember}
          onConfirm={handleAdjustPoints}
          onClose={() => setShowPointsOp(false)}
        />
      )}
    </div>
  )
}
