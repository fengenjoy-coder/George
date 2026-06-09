import { useState } from 'react'
import { useAdmin } from './AdminContext'

export function LoginModal({ onClose }) {
  const [password, setPassword] = useState('')
  const { login, loginError } = useAdmin()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-card border border-white/10 rounded-2xl p-8 w-full max-w-sm mx-4">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-malbon-gold/10 border border-malbon-gold/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-malbon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">管理员登录</h3>
          <p className="text-sm text-gray-400 mt-1">请输入管理密码</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="管理密码"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-malbon-gold/50 transition-colors"
            autoFocus
          />
          {loginError && (
            <p className="text-sm text-red-400 mt-2">{loginError}</p>
          )}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-malbon-gold text-dark-primary hover:bg-malbon-gold/90 transition-all"
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
