import { useState } from 'react'

export function MemberForm({ member, onSave, onClose }) {
  const [form, setForm] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    tier: member?.tier || 'L1',
    pointsBalance: member?.pointsBalance || 0,
    creditsTotal: member?.creditsTotal || 0,
    totalSpend: member?.totalSpend || 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50'
  const labelClass = 'text-xs text-gray-500 mb-1.5 block'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-dark-card border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg font-bold text-white mb-6"
        >{member ? '编辑会员' : '新增会员'}</h3>

        <form onSubmit={handleSubmit} className="space-y-4"
        >
          <div>
            <label className={labelClass}>姓名</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="会员姓名" required />
          </div>
          <div>
            <label className={labelClass}>邮箱</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="邮箱地址" />
          </div>
          <div>
            <label className={labelClass}>手机号</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="手机号" />
          </div>
          <div>
            <label className={labelClass}>等级</label>
            <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={inputClass}
            >
              {['L1', 'L2', 'L3', 'L4', 'L5'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className={labelClass}>Points 余额</label>
              <input type="number" value={form.pointsBalance} onChange={(e) => setForm({ ...form, pointsBalance: Number(e.target.value) })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Credits</label>
              <input type="number" value={form.creditsTotal} onChange={(e) => setForm({ ...form, creditsTotal: Number(e.target.value) })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>总消费</label>
            <input type="number" value={form.totalSpend} onChange={(e) => setForm({ ...form, totalSpend: Number(e.target.value) })} className={inputClass} />
          </div>

          <div className="flex gap-3 pt-4"
          >
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
            >
              取消
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-green text-white hover:bg-malbon-green/90 transition-all"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
