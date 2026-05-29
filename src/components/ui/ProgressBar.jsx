import { useInView } from '../../hooks/useInView'

export function ProgressBar({ value, color = 'green', size = 'md', animated = true }) {
  const [ref, isInView] = useInView()

  const colorClasses = {
    green: 'bg-gradient-to-r from-malbon-green to-malbon-green-light',
    gold: 'bg-gradient-to-r from-malbon-gold to-malbon-gold-light',
    gradient: 'bg-gradient-to-r from-malbon-green via-malbon-green-light to-malbon-gold',
  }

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div ref={ref} className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div
        className={`h-full rounded-full ${colorClasses[color]} transition-all duration-1000 ease-out`}
        style={{
          width: animated && isInView ? `${value}%` : animated ? '0%' : `${value}%`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}
