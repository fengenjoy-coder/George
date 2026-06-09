export function SimpleBarChart({ data, labels, colors = ['#34D399', '#D4AF37', '#F59E0B'] }) {
  const max = Math.max(...data, 1)

  return (
    <div className="w-full">
      <div className="flex items-end gap-3 h-40">
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5">
            <span className="text-xs text-gray-400">{val}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: `${(val / max) * 100}%`,
                backgroundColor: colors[i % colors.length],
                opacity: 0.85,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        {labels.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ComparisonBarChart({ seriesA, seriesB, labels }) {
  const all = [...seriesA, ...seriesB]
  const max = Math.max(...all, 1)

  return (
    <div className="w-full">
      <div className="flex items-end gap-4 h-40">
        {labels.map((_, i) => (
          <div key={i} className="flex-1 flex gap-1 items-end justify-center">
            <div
              className="w-3 rounded-t-sm transition-all duration-500"
              style={{ height: `${(seriesA[i] / max) * 100}%`, backgroundColor: '#34D399', opacity: 0.85 }}
              title={`A: ${seriesA[i]}`}
            />
            <div
              className="w-3 rounded-t-sm transition-all duration-500"
              style={{ height: `${(seriesB[i] / max) * 100}%`, backgroundColor: '#D4AF37', opacity: 0.85 }}
              title={`B: ${seriesB[i]}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {labels.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#34D399' }} />
          <span className="text-[10px] text-gray-400">方案 A</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#D4AF37' }} />
          <span className="text-[10px] text-gray-400">方案 B</span>
        </div>
      </div>
    </div>
  )
}
