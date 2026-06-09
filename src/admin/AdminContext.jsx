import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const SESSION_KEY = 'admin:session'
const SESSION_EXPIRY = 60 * 60 * 1000 // 1 hour
const DEFAULT_PASSWORD = 'malbon2026'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const { expiry } = JSON.parse(session)
        if (Date.now() < expiry) {
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem(SESSION_KEY)
        }
      } catch {
        localStorage.removeItem(SESSION_KEY)
      }
    }
  }, [])

  const login = useCallback((password) => {
    if (password === DEFAULT_PASSWORD) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ expiry: Date.now() + SESSION_EXPIRY }))
      setIsLoggedIn(true)
      setLoginError('')
      return true
    }
    setLoginError('密码错误')
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setIsLoggedIn(false)
    setLoginError('')
  }, [])

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout, loginError }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
