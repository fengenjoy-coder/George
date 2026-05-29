import { usePhoneNavigation } from '../../hooks/usePhoneNavigation'

export function PhoneScreenRouter({ initialScreen = 'home', screens }) {
  const { currentScreen, navigate } = usePhoneNavigation(initialScreen)

  const ScreenComponent = screens[currentScreen] || screens.home

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ paddingTop: '56px', paddingBottom: '80px' }}
      >
        <ScreenComponent navigate={navigate} />
      </div>
    </div>
  )
}
