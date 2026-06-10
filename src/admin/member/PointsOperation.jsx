import { useState } from 'react'

export function PointsOperation({ member, onConfirm, onClose }) {
  const [type, setType] = useState('增加 Points')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = Number(amount)
    if (num > 0 && reason.trim()) {
      onConfirm(type, num, reason.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-dark-card border border-white/10 rounded-2xl p-8 w-full max-w-sm mx-4"
      >
        <h3 className="text-lg font-bold text-white mb-2"
        >积分调整</h3>
        <p className="text-sm text-gray-500 mb-6"
        >{member.name} · 当前 Points: {member.pointsBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · Credits: {member.creditsTotal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

        <form onSubmit={handleSubmit} className="space-y-4"
        >
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block"
            >操作类型</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-malbon-green/50"
            >
              <option>增加 Points</option>
              <option>减少 Points</option>
              <option>增加 Credits</option>
              <option>减少 Credits</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block"
            >金额</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50"
              placeholder="输入金额"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block"
            >原因</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50"
              placeholder="如：客服补偿、活动奖励"
              required
            />
          </div>

          <div className="flex gap-3 pt-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-gold text-dark-primary hover:bg-malbon-gold/90 transition-all"
            >
              确认
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
