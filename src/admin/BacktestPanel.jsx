import { useState } from 'react'
import { useBacktest } from './hooks/useBacktest'
import { SimpleBarChart, ComparisonBarChart } from './charts/SimpleBarChart'

function InputRow({ label, value, onChange, min, max, step = 1, suffix = '', readOnly }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
      <span className="text-sm text-gray-400">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={readOnly}
          className="w-24 accent-malbon-green"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={readOnly}
          className="w-20 text-right bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50 disabled:opacity-50"
        />
        {suffix && <span className="text-xs text-gray-500 w-4">{suffix}</span>}
      </div>
    </div>
  )
}

function ResultCard({ label, value, unit = '', highlight = false }) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'bg-malbon-green/5 border-malbon-green/20' : 'bg-white/[0.03] border-white/[0.06]'}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-xl font-bold ${highlight ? 'text-malbon-green-light' : 'text-white'}`}>
        {value.toLocaleString()}{unit}
      </div>
    </div>
  )
}

function Simulator({ title, profile, setProfile, config, readOnly }) {
  const result = useBacktest(profile, config)

  return (
    <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
      <h4 className="text-base font-bold text-white mb-4">{title}</h4>

      <div className="space-y-1 mb-6">
        <InputRow label="起始等级" value={['L1', 'L2', 'L3', 'L4', 'L5'].indexOf(profile.startTier)} onChange={(v) => setProfile({ ...profile, startTier: ['L1', 'L2', 'L3', 'L4', 'L5'][v] })} min={0} max={4} step={1} readOnly={readOnly} />
        <InputRow label="年消费金额" value={profile.annualSpend} onChange={(v) => setProfile({ ...profile, annualSpend: v })} min={0} max={200000} step={1000} suffix="¥" readOnly={readOnly} />
        <InputRow label="年活跃天数" value={profile.activeDays} onChange={(v) => setProfile({ ...profile, activeDays: v })} min={0} max={365} step={1} suffix="天" readOnly={readOnly} />
        <InputRow label="参加活动次数" value={profile.eventsAttended} onChange={(v) => setProfile({ ...profile, eventsAttended: v })} min={0} max={50} step={1} suffix="次" readOnly={readOnly} />
        <InputRow label="发布内容数" value={profile.contentPosts} onChange={(v) => setProfile({ ...profile, contentPosts: v })} min={0} max={100} step={1} suffix="篇" readOnly={readOnly} />
        <InputRow label="邀请好友数" value={profile.referrals} onChange={(v) => setProfile({ ...profile, referrals: v })} min={0} max={20} step={1} suffix="人" readOnly={readOnly} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <ResultCard label="年度 Points" value={result.totalPoints} highlight />
        <ResultCard label="年度 Credits" value={result.totalCredits} />
        <ResultCard label="预测年末等级" value={result.endTier} highlight />
        <ResultCard label="MBC 进度" value={result.mbcProgress} unit="%" />
        <ResultCard label="Points 发行成本" value={result.pointsCost} unit="¥" />
        <ResultCard label="成本占毛利" value={result.costRatio} unit="%" />
        <ResultCard label="贡献毛利" value={result.grossProfit} unit="¥" />
        <ResultCard label="消费返 Points" value={result.purchasePoints} />
      </div>
    </div>
  )
}

const DEFAULT_PROFILE = {
  startTier: 'L1',
  annualSpend: 20000,
  activeDays: 120,
  eventsAttended: 6,
  contentPosts: 12,
  referrals: 3,
}

export function BacktestPanel({ config }) {
  const [profileA, setProfileA] = useState({ ...DEFAULT_PROFILE })
  const [profileB, setProfileB] = useState({ ...DEFAULT_PROFILE, annualSpend: 80000, activeDays: 200 })

  const resultA = useBacktest(profileA, config)
  const resultB = useBacktest(profileB, config)

  const compareLabels = ['Points', 'Credits', '成本¥', '毛利¥']
  const seriesA = [resultA.totalPoints, resultA.totalCredits, resultA.pointsCost, resultA.grossProfit]
  const seriesB = [resultB.totalPoints, resultB.totalCredits, resultB.pointsCost, resultB.grossProfit]

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Simulator title="方案 A" profile={profileA} setProfile={setProfileA} config={config} readOnly={false} />
        <Simulator title="方案 B" profile={profileB} setProfile={setProfileB} config={config} readOnly={false} />
      </div>

      <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
        <h4 className="text-base font-bold text-white mb-4">A/B 对比</h4>
        <ComparisonBarChart seriesA={seriesA} seriesB={seriesB} labels={compareLabels} />
      </div>
    </div>
  )
}
