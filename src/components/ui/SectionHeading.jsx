import { useInView } from '../../hooks/useInView'

export function SectionHeading({ title, subtitle, align = 'left', light = false }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : ''} ${
        isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
        light ? 'text-white' : 'text-white'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        } ${light ? 'text-white/70' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
