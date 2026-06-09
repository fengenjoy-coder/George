import { achievements } from '../../../data/achievements'

export function AchievementsScreen() {
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-black">成就徽章</div>
        <div className="text-sm text-gray-500">{unlockedCount} / {achievements.length}</div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-malbon-green to-malbon-gold rounded-full" style={{ width: `${(unlockedCount / achievements.length) * 100}%` }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
              ach.unlocked
                ? 'bg-white border-gray-100'
                : 'bg-gray-50 border-gray-100 opacity-60'
            }`}
          >
            <div className={`text-3xl mb-2 ${ach.unlocked ? '' : 'grayscale'}`}>{ach.icon}</div>
            <div className="text-[11px] font-semibold text-black text-center leading-tight">{ach.name}</div>
            <div className="mt-1.5 flex items-center gap-1 text-[9px]">
              <span className="text-malbon-green">+{ach.pointsReward}P</span>
              <span className="text-malbon-gold">+{ach.creditsReward}C</span>
            </div>
            {!ach.unlocked && (
              <div className="mt-2 w-full">
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: `${(ach.progress / ach.total) * 100}%` }} />
                </div>
                <div className="text-[9px] text-gray-400 text-center mt-1">{ach.progress}/{ach.total}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
