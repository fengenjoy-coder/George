export function Card({ children, className = '', hover = true, padding = 'md' }) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`bg-dark-card border border-white/[0.06] rounded-2xl ${paddingClasses[padding]} ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
