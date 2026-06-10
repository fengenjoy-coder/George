import { useState } from 'react'
import { useAdmin } from './AdminContext'
import { LoginModal } from './LoginModal'
import { PlanningPanel } from './PlanningPanel'
import { BacktestPanel } from './BacktestPanel'
import { LiveMonitorPanel } from './LiveMonitorPanel'
import { MemberPanel } from './member/MemberPanel'
import { useAdminConfig } from './hooks/useAdminConfig'

const TABS = [
  { id: 'planning', label: '策划', icon: 'P' },
  { id: 'backtest', label: '回测', icon: 'B' },
  { id: 'monitor', label: '实时监控', icon: 'M' },
  { id: 'members', label: '会员管理', icon: 'U' },
]

export function AdminDashboard({ onExit }) {
  const [activeTab, setActiveTab] = useState('planning')
  const [showLogin, setShowLogin] = useState(false)
  const { isLoggedIn, logout } = useAdmin()
  const config = useAdminConfig()

  const renderPanel = () => {
    switch (activeTab) {
      case 'planning': return <PlanningPanel config={config} />
      case 'backtest': return <BacktestPanel config={config} />
      case 'monitor': return <LiveMonitorPanel config={config} />
      case 'members': return <MemberPanel />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-dark-secondary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-dark-primary/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="text-gray-400 hover:text-white transition-colors"
              title="返回主站"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">Malbon</span>
              <span className="px-2 py-0.5 rounded-md bg-malbon-gold/10 text-malbon-gold text-xs font-semibold border border-malbon-gold/20">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-xs text-malbon-green-light flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-malbon-green-light animate-pulse" />
                  已登录
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
                >
                  退出
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-malbon-gold text-dark-primary hover:bg-malbon-gold/90 transition-all"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-56 bg-dark-primary border-r border-white/5 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-malbon-green/10 text-malbon-green-light border border-malbon-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-bold">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <div className="text-xs text-gray-500 mb-2">当前汇率</div>
              <div className="text-lg font-bold text-malbon-green-light">100P = ¥{config.exchangeRate}</div>
              <div className="text-xs text-gray-500 mt-2">客单价 ¥{config.finance.avgPrice.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-gray-500">毛利率 {(config.finance.grossMargin * 100).toFixed(2)}%</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-56 flex-1 p-8">
          <div className="max-w-5xl">
            {renderPanel()}
          </div>
        </main>
      </div>
    </div>
  )
}
