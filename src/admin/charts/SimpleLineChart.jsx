export function SimpleLineChart({ data, labels, color = '#34D399' }) {
  const max = Math.max(...data, 1)
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - (val / max) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-full h-32 relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        ))}
        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={color}
          opacity={0.15}
        />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data points */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * 100
          const y = 100 - (val / max) * 100
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill={color} />
          )
        })}
      </svg>
      <div className="flex justify-between mt-1">
        {labels.map((label, i) => (
          <span key={i} className="text-[9px] text-gray-600">{label}</span>
        ))}
      </div>
    </div>
  )
}
