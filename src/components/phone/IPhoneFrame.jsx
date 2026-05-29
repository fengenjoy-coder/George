export function IPhoneFrame({ children, scale = 1 }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Outer frame */}
      <div
        className="relative w-[375px] h-[812px] rounded-[54px] p-3"
        style={{
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
          boxShadow: `
            0 0 0 2px #3a3a3a,
            0 25px 50px -12px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.08) inset,
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Inner bezel */}
        <div
          className="w-full h-full rounded-[42px] overflow-hidden relative"
          style={{ background: '#F2F2F7' }}
        >
          {/* Notch / Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-50"
            style={{
              width: '126px',
              height: '37px',
              background: '#1a1a1a',
              borderRadius: '20px',
            }}
          />

          {/* Screen content */}
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50"
            style={{
              width: '134px',
              height: '5px',
              background: '#000',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
