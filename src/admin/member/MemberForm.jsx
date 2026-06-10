import { useState } from 'react'

const FITS = ['修身', '标准', '宽松']
const COLORS = ['绿色', '藏青', '白色', '黑色', '卡其', '酒红', '橙色', '灰色']
const COURSES = ['林克斯球场', '公园式球场', '山地球场', '沙漠球场']
const REGIONS = ['上海', '北京', '深圳', '广州', '杭州', '成都', '南京', '武汉', '西安', '重庆']
const PREDEFINED_TAGS = ['穿搭达人', '周末球友', '装备控', '社交蝴蝶', '技术流', '颜值党', '新手入门', '铁杆粉丝', '高消费', '内容创作者']

export function MemberForm({ member, onSave, onClose }) {
  const [form, setForm] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    tier: member?.tier || 'L1',
    pointsBalance: member?.pointsBalance || 0,
    creditsTotal: member?.creditsTotal || 0,
    totalSpend: member?.totalSpend || 0,
    profile: {
      photo: member?.profile?.photo || '',
      height: member?.profile?.height || 175,
      weight: member?.profile?.weight || 70,
      fitPreference: member?.profile?.fitPreference || '标准',
      colorPreference: member?.profile?.colorPreference || [],
      coursePreference: member?.profile?.coursePreference || '',
      region: member?.profile?.region || '',
      tags: member?.profile?.tags || [],
    },
  })
  const [newTag, setNewTag] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  const updateProfile = (key, val) => {
    setForm((prev) => ({
      ...prev,
      profile: { ...prev.profile, [key]: val },
    }))
  }

  const toggleColor = (color) => {
    const current = form.profile.colorPreference
    const next = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color]
    updateProfile('colorPreference', next)
  }

  const addTag = (tag) => {
    if (tag.trim() && !form.profile.tags.includes(tag.trim())) {
      updateProfile('tags', [...form.profile.tags, tag.trim()])
    }
    setNewTag('')
  }

  const removeTag = (tag) => {
    updateProfile('tags', form.profile.tags.filter((t) => t !== tag))
  }

  const tagColors = {
    '穿搭达人': 'bg-green-500/10 text-green-400 border-green-500/20',
    '周末球友': 'bg-malbon-green/10 text-malbon-green-light border-malbon-green/20',
    '装备控': 'bg-malbon-gold/10 text-malbon-gold border-malbon-gold/20',
    '社交蝴蝶': 'bg-malbon-clay/10 text-malbon-clay border-malbon-clay/20',
    '技术流': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    '颜值党': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    '新手入门': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    '铁杆粉丝': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    '高消费': 'bg-red-500/10 text-red-400 border-red-500/20',
    '内容创作者': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50'
  const labelClass = 'text-xs text-gray-500 mb-1.5 block'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-card border border-white/10 rounded-2xl p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6">{member ? '编辑会员' : '新增会员'}</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 border-b border-white/10 pb-2">基本信息</h4>
            <div>
              <label className={labelClass}>姓名</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="会员姓名" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>邮箱</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="邮箱地址" />
              </div>
              <div>
                <label className={labelClass}>手机号</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="手机号" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>等级</label>
                <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={inputClass}>
                  {['L1', 'L2', 'L3', 'L4', 'L5'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Points</label>
                <input type="number" value={form.pointsBalance} onChange={(e) => setForm({ ...form, pointsBalance: Number(e.target.value) })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Credits</label>
                <input type="number" value={form.creditsTotal} onChange={(e) => setForm({ ...form, creditsTotal: Number(e.target.value) })} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 border-b border-white/10 pb-2">个人信息</h4>

            {/* Height / Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>身高 (cm)</label>
                <input type="number" min={100} max={220} value={form.profile.height} onChange={(e) => updateProfile('height', Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>体重 (kg)</label>
                <input type="number" min={30} max={150} value={form.profile.weight} onChange={(e) => updateProfile('weight', Number(e.target.value))} className={inputClass} />
              </div>
            </div>

            {/* Fit Preference */}
            <div>
              <label className={labelClass}>服装版型偏好</label>
              <div className="flex gap-2">
                {FITS.map((fit) => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => updateProfile('fitPreference', fit)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      form.profile.fitPreference === fit
                        ? 'bg-malbon-green/10 text-malbon-green-light border-malbon-green/30'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Preference */}
            <div>
              <label className={labelClass}>颜色偏好（可多选）</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      form.profile.colorPreference.includes(color)
                        ? 'bg-malbon-green/10 text-malbon-green-light border-malbon-green/30'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Course + Region */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>球场偏好</label>
                <select value={form.profile.coursePreference} onChange={(e) => updateProfile('coursePreference', e.target.value)} className={inputClass}>
                  <option value="">请选择</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>居住区域</label>
                <select value={form.profile.region} onChange={(e) => updateProfile('region', e.target.value)} className={inputClass}>
                  <option value="">请选择</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className={labelClass}>个性标签</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${tagColors[tag] || 'bg-white/5 text-gray-400 border-white/10'}`}
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(newTag) } }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-malbon-green/50"
                  placeholder="输入标签后回车添加"
                />
                <button type="button" onClick={() => addTag(newTag)} className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 transition-all">
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PREDEFINED_TAGS.filter((t) => !form.profile.tags.includes(t)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-2 py-0.5 rounded-md text-[10px] text-gray-500 bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:text-gray-300 transition-all"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all">
              取消
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-green text-white hover:bg-malbon-green/90 transition-all">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
