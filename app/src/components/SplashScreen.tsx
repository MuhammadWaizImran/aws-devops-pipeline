'use client'

import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2200)
    const t2 = setTimeout(() => setPhase('done'), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#141310',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1)',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 8vw, 88px)',
          fontWeight: 400,
          color: '#FFFFFF',
          letterSpacing: '0.22em',
          animation: 'splashIn 1.5s cubic-bezier(.16,1,.3,1) both',
          textAlign: 'center',
          lineHeight: 1.25,
        }}
      >
        PRIME<br />BAZAAR
      </div>
      <div
        style={{
          height: '1px',
          width: '56px',
          background: '#E5E5E5',
          transformOrigin: 'center',
          animation: 'splashLine 0.9s 0.5s ease both',
        }}
      />
    </div>
  )
}
