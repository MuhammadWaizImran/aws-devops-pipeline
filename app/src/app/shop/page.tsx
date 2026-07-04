import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

const categoryLinks = [
  { label: 'All', href: '/shop' },
  { label: 'Women', href: '/shop/women' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Accessories', href: '/shop/accessories' },
]

export default function ShopPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '48px', borderBottom: '1px solid #2a2826', paddingBottom: '24px' }}>
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#6b6558',
            marginBottom: '8px',
          }}
        >
          COLLECTION
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '40px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: '#F5F3EF',
          }}
        >
          New Arrivals
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px' }}>
        {/* Sidebar */}
        <aside>
          <div
            style={{
              position: 'sticky',
              top: '80px',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: '#6b6558',
                marginBottom: '16px',
              }}
            >
              CATEGORY
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categoryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: '14px',
                      color: l.href === '/shop' ? '#F5F3EF' : '#9a9284',
                      fontWeight: l.href === '/shop' ? 600 : 400,
                      display: 'block',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #2a2826',
                    }}
                  >
                    {l.label}
                    <span style={{ float: 'right', fontSize: '12px', color: '#6b6558' }}>
                      {l.href === '/shop'
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === l.href.split('/').pop()).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#6b6558' }}>
              {PRODUCTS.length} products
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
