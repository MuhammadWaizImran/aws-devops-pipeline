import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import SortableProductGrid from '@/components/SortableProductGrid'

const categoryLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Accessories', href: '/shop/accessories' },
]

export default function ShopPage() {
  const products = PRODUCTS.filter((p) => p.category !== 'women')

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px' }}>
      <p style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#8B7355', marginBottom: '8px' }}>
        HOME / ALL PRODUCTS
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '44px',
          fontWeight: 500,
          color: '#2C1A0E',
          margin: '0 0 40px',
        }}
      >
        All Products
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px' }}>
        {/* Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: '80px' }}>
            <p
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                color: '#2C1A0E',
                marginBottom: '16px',
              }}
            >
              CATEGORY
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>
              {categoryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: '14px',
                      color: l.href === '/shop' ? '#141310' : '#8a8578',
                      fontWeight: l.href === '/shop' ? 600 : 400,
                      display: 'block',
                      padding: '8px 0',
                      borderBottom: '1px solid #EFEAE2',
                      transition: 'padding-left 0.25s ease, color 0.25s ease',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid with sort */}
        <SortableProductGrid products={products} />
      </div>
    </div>
  )
}
