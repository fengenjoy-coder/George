export function GaugeChart({ value, max, label, unit = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  let color = '#34D399' // green
  if (percentage > 66) color = '#EF4444' // red
  else if (percentage > 33) color = '#F59E0B' // yellow

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{value}{unit}</span>
          <span className="text-[10px] text-gray-500">{Math.round(percentage)}%</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 mt-2 text-center">{label}</span>
    </div>
  )
}
