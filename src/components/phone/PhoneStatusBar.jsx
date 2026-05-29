export function PhoneStatusBar({ time = '9:41', showCoins = false, coinBalance = 2840 }) {
  return (
    <div className="relative h-14 flex items-center justify-between px-7 pt-3 z-40"
      style={{ background: 'linear-gradient(180deg, rgba(242,242,247,0.95) 0%, rgba(242,242,247,0.8) 100%)' }}
    >
      <div className="text-sm font-semibold text-black">{time}</div>
      <div className="flex items-center gap-2">
        {showCoins && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-malbon-gold/10">
            <span className="text-xs font-semibold text-malbon-gold">C</span>
            <span className="text-xs font-bold text-malbon-gold">{coinBalance.toLocaleString()}</span>
          </div>
        )}
        <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="7" width="2" height="10" rx="0.5" />
          <rect x="6" y="5" width="2" height="14" rx="0.5" />
          <rect x="10" y="3" width="2" height="18" rx="0.5" />
          <rect x="14" y="8" width="2" height="8" rx="0.5" />
          <path d="M18 4h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5a1 1 0 011-1z" fillOpacity="0.3" />
        </svg>
        <svg className="w-5 h-3 text-black" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" fill="none" />
          <rect x="2" y="2" width="18" height="8" rx="1.5" />
        </svg>
      </div>
    </div>
  )
}
