import { useAdmin } from './AdminContext'

function EditableTable({ title, data, columns, onChange, readOnly }) {
  const handleCellChange = (rowIdx, colKey, val) => {
    const next = [...data]
    next[rowIdx] = { ...next[rowIdx], [colKey]: val }
    onChange(next)
  }

  const handleAdd = () => {
    const empty = {}
    columns.forEach((c) => (empty[c.key] = c.default || ''))
    onChange([...data, empty])
  }

  const handleDelete = (idx) => {
    onChange(data.filter((_, i) => i !== idx))
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        {!readOnly && (
          <button onClick={handleAdd} className="text-xs text-malbon-green-light hover:text-malbon-green transition-colors">
            + 添加行
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((c) => (
                <th key={c.key} className="text-left py-2 px-3 text-xs text-gray-500 font-medium">
                  {c.label}
                </th>
              ))}
              {!readOnly && <th className="w-10" />}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                {columns.map((c) => (
                  <td key={c.key} className="py-2 px-3">
                    {readOnly ? (
                      <span className="text-gray-300">{row[c.key]}</span>
                    ) : (
                      <input
                        type="text"
                        value={row[c.key] ?? ''}
                        onChange={(e) => handleCellChange(i, c.key, e.target.value)}
                        className="w-full bg-transparent text-gray-300 border-b border-transparent hover:border-white/10 focus:border-malbon-green/50 focus:outline-none transition-colors"
                      />
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <td className="py-2 px-1">
                    <button onClick={() => handleDelete(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      删
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-dark-card border border-white/[0.06] rounded-2xl p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}

function FinanceInput({ label, value, onChange, suffix = '', readOnly }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
      <span className="text-sm text-gray-400">{label}</span>
      {readOnly ? (
        <span className="text-sm text-gray-300 font-mono">
          {value}
          {suffix}
        </span>
      ) : (
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-28 text-right bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
          />
          <span className="text-xs text-gray-500 w-6">{suffix}</span>
        </div>
      )}
    </div>
  )
}

function TierEditor({ tiers, onChange, readOnly }) {
  return (
    <div className="space-y-3">
      {tiers.map((tier, i) => (
        <div key={tier.level} className="flex items-center gap-4 py-2 border-b border-white/[0.04]">
          <span className="text-xs font-bold text-gray-500 w-8">{tier.level}</span>
          <span className="text-sm text-gray-300 flex-1">{tier.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Credits</span>
            {readOnly ? (
              <span className="text-sm text-gray-300 font-mono w-20 text-right">{tier.credits.toLocaleString()}</span>
            ) : (
              <input
                type="number"
                value={tier.credits}
                onChange={(e) => {
                  const next = [...tiers]
                  next[i] = { ...next[i], credits: Number(e.target.value) }
                  onChange(next)
                }}
                className="w-24 text-right bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">倍率</span>
            {readOnly ? (
              <span className="text-sm text-gray-300 font-mono w-12 text-right">{tier.pointsMultiplier}x</span>
            ) : (
              <input
                type="number"
                step="0.1"
                value={tier.pointsMultiplier}
                onChange={(e) => {
                  const next = [...tiers]
                  next[i] = { ...next[i], pointsMultiplier: Number(e.target.value) }
                  onChange(next)
                }}
                className="w-16 text-right bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-malbon-green/50"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export function PlanningPanel({ config }) {
  const { isLoggedIn } = useAdmin()
  const readOnly = !isLoggedIn

  return (
    <div className="space-y-6">
      {readOnly && (
        <div className="bg-malbon-gold/10 border border-malbon-gold/20 rounded-xl px-4 py-3 text-sm text-malbon-gold">
          只读模式 — 登录后可编辑配置
        </div>
      )}

      <SectionCard title="财务参数">
        <FinanceInput label="平均客单价" value={config.finance.avgPrice} onChange={(v) => config.setFinance({ ...config.finance, avgPrice: v })} suffix="元" readOnly={readOnly} />
        <FinanceInput label="毛利率" value={config.finance.grossMargin} onChange={(v) => config.setFinance({ ...config.finance, grossMargin: v })} suffix="" readOnly={readOnly} />
        <FinanceInput label="MBC 礼包成本" value={config.finance.giftCost} onChange={(v) => config.setFinance({ ...config.finance, giftCost: v })} suffix="元" readOnly={readOnly} />
        <FinanceInput label="MBC 年费" value={config.finance.annualFee} onChange={(v) => config.setFinance({ ...config.finance, annualFee: v })} suffix="元" readOnly={readOnly} />
        <FinanceInput label="Points 汇率" value={config.exchangeRate} onChange={config.setExchangeRate} suffix="元/100P" readOnly={readOnly} />
      </SectionCard>

      <SectionCard title="等级门槛配置">
        <TierEditor tiers={config.tiers} onChange={config.setTiers} readOnly={readOnly} />
      </SectionCard>

      <SectionCard title="Points 获取规则">
        <EditableTable
          title=""
          data={config.pointsAcquisition}
          onChange={config.setPointsAcquisition}
          readOnly={readOnly}
          columns={[
            { key: 'action', label: '行为' },
            { key: 'points', label: 'Points' },
            { key: 'category', label: '分类' },
          ]}
        />
      </SectionCard>

      <SectionCard title="Credits 获取规则">
        <EditableTable
          title=""
          data={config.creditsAcquisition}
          onChange={config.setCreditsAcquisition}
          readOnly={readOnly}
          columns={[
            { key: 'action', label: '行为' },
            { key: 'credits', label: 'Credits' },
            { key: 'category', label: '分类' },
          ]}
        />
      </SectionCard>
    </div>
  )
}
