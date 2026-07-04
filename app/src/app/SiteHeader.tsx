'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function SiteHeader() {
  const { totalItems } = useCart()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#141310',
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
          }}
        >
          PRIME BAZAAR
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/shop" className="nav-link">
            NEW ARRIVALS
          </Link>
          <Link href="/shop/women" className="nav-link">
            WOMEN
          </Link>
          <Link href="/shop/men" className="nav-link">
            MEN
          </Link>
          <Link href="/shop/accessories" className="nav-link">
            ACCESSORIES
          </Link>
        </nav>

        {/* Right: Bag */}
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
                color: '#141310',
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
