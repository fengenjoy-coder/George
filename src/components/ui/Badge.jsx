export function Badge({ children, variant = 'green', size = 'sm' }) {
  const variantClasses = {
    green: 'bg-malbon-green/20 text-malbon-green-light border-malbon-green/30',
    gold: 'bg-malbon-gold/20 text-malbon-gold border-malbon-gold/30',
    dark: 'bg-dark-elevated text-gray-300 border-white/10',
    outline: 'bg-transparent text-gray-400 border-white/20',
  }

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}
