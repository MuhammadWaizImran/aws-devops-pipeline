'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SLIDES = [
  { src: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg', label: 'Linen Collection' },
  { src: '/uploads/haryo-setyadi-acn5ERAeSb4-unsplash.jpg', label: 'Denim Edit' },
  { src: '/uploads/caio-coelho-xFmXLq_KJxg-unsplash.jpg', label: 'Flannel Series' },
  { src: '/uploads/mnz-ToLMORRb97Q-unsplash.jpg', label: 'Structured Pieces' },
  { src: '/uploads/mediamodifier-7cERndkOyDw-unsplash.jpg', label: 'Essential Tees' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        height: '82vh',
        minHeight: '560px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Slides — cross-fade */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay — gradient from bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(20,19,16,0.75) 0%, rgba(20,19,16,0.05) 55%)',
          zIndex: 2,
        }}
      />

      {/* Hero copy */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '0 48px 64px',
          width: '100%',
          color: '#FAF8F5',
          animation: 'fadeUp 0.9s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', marginBottom: '14px', color: '#E8DFC8' }}>
          AUTUMN / WINTER 2026
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 84px)',
            lineHeight: 1.15,
            margin: '0 0 32px',
            maxWidth: '820px',
          }}
        >
          The Quiet Luxury Edit
        </h1>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            padding: '16px 34px',
            background: '#141310',
            color: '#FAF8F5',
            fontSize: '13px',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          SHOP THE COLLECTION
        </Link>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '48px',
          display: 'flex',
          gap: '8px',
          zIndex: 3,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#FAF8F5' : 'rgba(245,243,239,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              borderRadius: '4px',
            }}
          />
        ))}
      </div>
    </section>
  )
}
