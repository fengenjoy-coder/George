import { useState, useCallback } from 'react'

export function usePhoneNavigation(initialScreen = 'home') {
  const [currentScreen, setCurrentScreen] = useState(initialScreen)
  const [screenHistory, setScreenHistory] = useState([initialScreen])

  const navigate = useCallback((screen) => {
    setCurrentScreen(screen)
    setScreenHistory(prev => [...prev, screen])
  }, [])

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      if (prev.length <= 1) return prev
      const newHistory = prev.slice(0, -1)
      setCurrentScreen(newHistory[newHistory.length - 1])
      return newHistory
    })
  }, [])

  return { currentScreen, navigate, goBack }
}
