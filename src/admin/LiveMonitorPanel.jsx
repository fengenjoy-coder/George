import { useState, useCallback } from 'react'
import { GaugeChart } from './charts/GaugeChart'
import { SimpleLineChart } from './charts/SimpleLineChart'

const METRICS = [
  { key: 'issueBurn', label: 'Points 发行/消耗比', max: 1.0, health: 0.75, warn: 0.5, unit: '', format: (v) => `${(v * 100).toFixed(0)}%` },
  { key: 'avgHoldDays', label: '平均持有天数', max: 180, health: 90, warn: 135, unit: '天', format: (v) => `${Math.round(v)}天` },
  { key: 'dormantRatio', label: '沉睡 Points 占比', max: 50, health: 20, warn: 30, unit: '%', format: (v) => `${Math.round(v)}%` },
  { key: 'redemptionRate', label: '权益兑换率', max: 60, health: 30, warn: 20, unit: '%', format: (v) => `${Math.round(v)}%` },
  { key: 'avgBalance', label: '单用户平均余额', max: 15000, health: 5000, warn: 10000, unit: '', format: (v) => Math.round(v).toLocaleString() },
  { key: 'costRatio', label: '营销成本占 GMV', max: 10, health: 5, warn: 8, unit: '%', format: (v) => `${v.toFixed(1)}%` },
]

function generateTrendData(base, variance) {
  return Array.from({ length: 7 }, (_, i) => {
    const noise = (Math.random() - 0.5) * variance
    return Math.max(0, base + noise + (i - 3) * variance * 0.3)
  })
}

function StatusBadge({ value, health, warn, isLowerBetter = false }) {
  let status = 'healthy'
  if (isLowerBetter) {
    if (value > warn) status = 'danger'
    else if (value > health) status = 'warning'
  } else {
    if (value < warn) status = 'danger'
    else if (value < health) status = 'warning'
  }

  const colors = {
    healthy: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const labels = { healthy: '健康', warning: '警告', danger: '危险' }

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${colors[status]}`}>
      {labels[status]}
    </span>
  )
}

export function LiveMonitorPanel({ config }) {
  const [lastRefresh, setLastRefresh] = useState(Date.now())
  const [trendKey, setTrendKey] = useState('issueBurn')

  const refresh = useCallback(() => {
    setLastRefresh(Date.now())
  }, [])

  // Generate pseudo-random but deterministic metrics based on config
  const seed = lastRefresh + config.exchangeRate * 100 + config.finance.grossMargin * 1000
  const random = (offset) => {
    const x = Math.sin(seed + offset * 9999) * 10000
    return x - Math.floor(x)
  }

  const metricsData = METRICS.map((m) => {
    const r = random(METRICS.indexOf(m) + 1)
    const value = m.health + (r - 0.5) * (m.max - m.health) * 0.8
    const clamped = Math.max(0, Math.min(m.max, value))
    return { ...m, value: clamped }
  })

  const trendLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const selectedMetric = METRICS.find((m) => m.key === trendKey)
  const trendData = generateTrendData(selectedMetric?.health || 50, selectedMetric?.max * 0.1 || 10)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">积分经济健康度</h3>
          <p className="text-sm text-gray-500">基于当前配置的实时模拟数据</p>
        </div>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-malbon-green text-white hover:bg-malbon-green/90 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          刷新数据
        </button>
      </div>

      {/* Gauge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metricsData.map((m) => (
          <div key={m.key} className="bg-dark-card border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{m.label}</span>
              <StatusBadge value={m.value} health={m.health} warn={m.warn} isLowerBetter={m.key !== 'redemptionRate'} />
            </div>
            <GaugeChart
              value={m.value}
              max={m.max}
              label={m.format(m.value)}
              unit={m.unit}
            />
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-white">7 天趋势</h4>
          <select
            value={trendKey}
            onChange={(e) => setTrendKey(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
          >
            {METRICS.map((m) => (
              <option key={m.key} value={m.key}>{m.label}</option>
            ))}
          </select>
        </div>
        <SimpleLineChart
          data={trendData}
          labels={trendLabels}
          color="#34D399"
        />
      </div>

      {/* Summary Table */}
      <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6">
        <h4 className="text-base font-bold text-white mb-4">指标明细</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">指标</th>
              <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">当前值</th>
              <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">健康线</th>
              <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">危险线</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">状态</th>
            </tr>
          </thead>
          <tbody>
            {metricsData.map((m) => (
              <tr key={m.key} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="py-2.5 px-3 text-gray-300">{m.label}</td>
                <td className="py-2.5 px-3 text-right text-white font-mono">{m.format(m.value)}</td>
                <td className="py-2.5 px-3 text-right text-gray-500 font-mono">{m.format(m.health)}</td>
                <td className="py-2.5 px-3 text-right text-gray-500 font-mono">{m.format(m.warn)}</td>
                <td className="py-2.5 px-3 text-center">
                  <StatusBadge value={m.value} health={m.health} warn={m.warn} isLowerBetter={m.key !== 'redemptionRate'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
