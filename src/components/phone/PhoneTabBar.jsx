export function PhoneTabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 pb-6 pt-2 px-2"
      style={{ paddingBottom: '28px' }}
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors duration-200 ${
              activeTab === tab.id ? 'text-malbon-green' : 'text-gray-400'
            }`}
          >
            {tab.icon && <span className="text-xl">{tab.icon}</span>}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
