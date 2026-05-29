import { useState } from 'react'
import { events } from '../../../data/events'

export function EventsListScreen({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { key: 'all', label: '全部' },
    { key: 'tournament', label: 'Tournaments' },
    { key: 'course', label: '课程' },
    { key: 'social', label: '交流' },
  ]

  const filtered = activeFilter === 'all'
    ? events
    : events.filter(e => e.category === activeFilter)

  return (
    <div className="px-5 pt-2 pb-4 space-y-4">
      <div className="text-xl font-bold text-black">活动中心</div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === f.key
                ? 'bg-malbon-green text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="space-y-3">
        {filtered.map((evt) => (
          <div
            key={evt.id}
            onClick={() => navigate('eventDetail')}
            className="bg-white rounded-2xl p-4 border border-gray-100 active:scale-[0.98] transition-transform"
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                {evt.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-malbon-green/10 text-malbon-green text-[10px] font-bold">
                    {evt.category === 'tournament' ? 'Tournaments' : evt.category === 'course' ? '课程' : '交流'}
                  </span>
                  <span className="text-[10px] text-gray-400">{evt.level}</span>
                </div>
                <div className="text-sm font-bold text-black truncate mb-0.5">{evt.title}</div>
                <div className="text-[11px] text-gray-500">{evt.date} · {evt.location.split('·')[0]}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-xs font-bold text-malbon-gold">{evt.cost}</span>
              <span className="text-xs text-malbon-green font-medium">立即报名 →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
