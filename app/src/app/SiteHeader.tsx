'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart'

const NAV_ITEMS = [
  { label: 'NEW ARRIVALS', href: '/shop' },
  { label: 'MEN', href: '/shop/men' },
  { label: 'ACCESSORIES', href: '/shop/accessories' },
]

const HEADER_BG = '#141310'

function getActiveIdx(pathname: string) {
  if (pathname === '/shop') return 0
  if (pathname === '/shop/men' || pathname.startsWith('/shop/men/')) return 1
  if (pathname === '/shop/accessories' || pathname.startsWith('/shop/accessories/')) return 2
  return -1
}

export default function SiteHeader() {
  const { totalItems } = useCart()
  const pathname = usePathname()
  const ulRef = useRef<HTMLUListElement>(null)
  const [sel, setSel] = useState({ left: 0, width: 0, ready: false })

  const activeIdx = getActiveIdx(pathname)

  const measureSel = useCallback(() => {
    if (!ulRef.current || activeIdx < 0) {
      setSel((s) => ({ ...s, ready: false }))
      return
    }
    const items = ulRef.current.querySelectorAll<HTMLElement>('li[data-nav]')
    const el = items[activeIdx]
    if (el) setSel({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
  }, [activeIdx])

  useEffect(() => {
    measureSel()
  }, [measureSel])

  useEffect(() => {
    window.addEventListener('resize', measureSel)
    return () => window.removeEventListener('resize', measureSel)
  }, [measureSel])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: HEADER_BG,
        borderBottom: '1px solid #2b2820',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: '#F5F3EF',
            textDecoration: 'none',
          }}
        >
          PRIME BAZAAR
        </Link>

        {/* ── Animated Nav ── */}
        <nav style={{ position: 'relative', height: '64px' }}>
          <ul
            ref={ulRef}
            style={{
              display: 'flex',
              height: '100%',
              margin: 0,
              padding: 0,
              listStyle: 'none',
              position: 'relative',
            }}
          >
            {/* ── Sliding selector block ── */}
            {sel.ready && (
              <>
                {/* Main white pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: sel.left,
                    width: sel.width,
                    height: 'calc(100% - 10px)',
                    background: '#F5F3EF',
                    borderTopLeftRadius: '14px',
                    borderTopRightRadius: '14px',
                    transition:
                      'left 0.6s cubic-bezier(0.68,-0.55,0.265,1.55), width 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Left inverse corner */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: sel.left - 18,
                    width: 18,
                    height: 18,
                    background: '#F5F3EF',
                    overflow: 'hidden',
                    transition: 'left 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -18,
                      left: 0,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: HEADER_BG,
                    }}
                  />
                </div>

                {/* Right inverse corner */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: sel.left + sel.width,
                    width: 18,
                    height: 18,
                    background: '#F5F3EF',
                    overflow: 'hidden',
                    transition: 'left 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -18,
                      left: -18,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: HEADER_BG,
                    }}
                  />
                </div>
              </>
            )}

            {/* ── Nav items ── */}
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeIdx === i
              return (
                <li
                  key={item.href}
                  data-nav=""
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    position: 'relative',
                    zIndex: 3,
                  }}
                >
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 24px',
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      color: isActive ? HEADER_BG : 'rgba(245,243,239,0.6)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'color 0.5s',
                      textDecoration: 'none',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Cart */}
        <Link
          href="/cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            letterSpacing: '0.08em',
            color: '#F5F3EF',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          BAG
          {totalItems > 0 && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#F5F3EF',
                color: '#C24D00',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
