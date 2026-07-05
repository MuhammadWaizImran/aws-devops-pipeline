import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import SiteHeader from './SiteHeader'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Prime Bazaar',
  description: 'Quiet Luxury Edit',
}

const footerNav = {
  SHOP: [
    { label: 'New Arrivals', href: '/shop' },
    { label: 'Men', href: '/shop/men' },
    { label: 'Accessories', href: '/shop/accessories' },
  ],
  ABOUT: [
    { label: 'Our Story', href: '#' },
    { label: 'Craftsmanship', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
  ],
  SUPPORT: [
    { label: 'Shipping & Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <SiteHeader />
          <ScrollReveal />
          <main>{children}</main>

          {/* Footer */}
          <footer
            style={{
              background: '#3D2810',
              color: '#F5F3EF',
              padding: '60px 24px 40px',
              marginTop: '80px',
              borderTop: '1px solid #4A3020',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '40px',
              }}
            >
              {/* Brand column */}
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    marginBottom: '16px',
                  }}
                >
                  PRIME BAZAAR
                </div>
                <p style={{ fontSize: '13px', color: '#C8A882', lineHeight: 1.7 }}>
                  Quietly considered pieces for the discerning wardrobe.
                  Crafted for permanence, not seasons.
                </p>
              </div>

              {/* Nav columns */}
              {Object.entries(footerNav).map(([section, links]) => (
                <div key={section}>
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      marginBottom: '16px',
                      color: '#C8A882',
                    }}
                  >
                    {section}
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="footer-link">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                maxWidth: '1200px',
                margin: '40px auto 0',
                borderTop: '1px solid #4A3020',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '12px', color: '#9A846A' }}>
                &copy; 2026 Prime Bazaar. All rights reserved.
              </p>
              <p
                style={{ fontSize: '12px', color: '#9A846A', letterSpacing: '0.08em' }}
              >
                CRAFTED WITH INTENTION
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
