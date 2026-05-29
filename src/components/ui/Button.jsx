export function Button({ variant = 'primary', size = 'md', children, onClick, href, className = '' }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97]'

  const variantClasses = {
    primary: 'bg-malbon-green text-white hover:bg-malbon-green/90 shadow-lg shadow-malbon-green/20',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
    ghost: 'bg-transparent text-gray-400 hover:text-white',
    gold: 'bg-malbon-gold text-dark-primary hover:bg-malbon-gold/90 shadow-lg shadow-malbon-gold/20',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
