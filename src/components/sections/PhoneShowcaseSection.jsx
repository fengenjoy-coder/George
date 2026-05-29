import { useState } from 'react'
import { IPhoneFrame } from '../phone/IPhoneFrame'
import { PhoneStatusBar } from '../phone/PhoneStatusBar'
import { PhoneTabBar } from '../phone/PhoneTabBar'
import { HomeFeedScreen } from '../phone/screens/HomeFeedScreen'
import { LevelCoinsScreen } from '../phone/screens/LevelCoinsScreen'
import { EventsListScreen } from '../phone/screens/EventsListScreen'
import { ProfileScreen } from '../phone/screens/ProfileScreen'
import { AchievementsScreen } from '../phone/screens/AchievementsScreen'
import { EventDetailScreen } from '../phone/screens/EventDetailScreen'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

function PhoneDemo({ initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [screenStack, setScreenStack] = useState([initialTab])

  const tabConfig = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'events', label: '活动', icon: '📅' },
    { id: 'achievements', label: '成就', icon: '🏅' },
    { id: 'profile', label: '我的', icon: '👤' },
  ]

  const screens = {
    home: HomeFeedScreen,
    events: EventsListScreen,
    achievements: AchievementsScreen,
    profile: ProfileScreen,
    eventDetail: EventDetailScreen,
  }

  const currentScreen = screenStack[screenStack.length - 1]
  const ScreenComponent = screens[currentScreen] || HomeFeedScreen

  const navigate = (screen) => {
    setScreenStack(prev => [...prev, screen])
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setScreenStack([tabId])
  }

  return (
    <div className="flex flex-col items-center">
      <IPhoneFrame scale={0.85}>
        <PhoneStatusBar time="9:41" showCoins={currentScreen === 'home'} />
        <div className="absolute inset-0 overflow-y-auto" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
          <ScreenComponent navigate={navigate} />
        </div>
        <PhoneTabBar tabs={tabConfig} activeTab={activeTab} onTabChange={handleTabChange} />
      </IPhoneFrame>
      <div className="mt-4 text-sm text-gray-400 font-medium">{tabConfig.find(t => t.id === activeTab)?.label}界面</div>
    </div>
  )
}

export function PhoneShowcaseSection() {
  const [ref, isInView] = useInView()

  return (
    <section id="phones" className="relative py-24 md:py-32 bg-dark-secondary overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-malbon-green/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="MALBON CLUB App 交互预览"
          subtitle="手机端是会员体验的核心入口，等级、Coins、活动、社交一站式触达。"
          light
          align="center"
        />

        <div
          ref={ref}
          className={`mt-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <PhoneDemo initialTab="home" />
          <PhoneDemo initialTab="events" />
          <PhoneDemo initialTab="profile" />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            每部手机均可点击底部 Tab 切换界面，体验真实的 App 导航交互。
            设计遵循 iOS Human Interface Guidelines，确保原生般的操作体验。
          </p>
        </div>
      </div>
    </section>
  )
}
