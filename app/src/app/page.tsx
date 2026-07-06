import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import HeroSlider from '@/components/HeroSlider'

const categories = [
  { label: 'Men', slug: 'men', image: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg' },
  { label: 'Accessories', slug: 'accessories', image: '/uploads/mnz-ToLMORRb97Q-unsplash.jpg' },
]

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.category !== 'women').slice(0, 4)

  return (
    <>
      <HeroSlider />

      {/* ── CATEGORY TILES ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
          background: '#0a0a0a',
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="product-link"
            data-reveal=""
            style={{
              position: 'relative',
              display: 'block',
              aspectRatio: '4/5',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {cat.image ? (
              <Image src={cat.image} alt={cat.label} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#0a0a0a',
                }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 55%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '28px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '26px',
                  background: '#C24D00',
                  color: '#ffffff',
                  padding: '10px 26px',
                }}
              >
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 48px 64px' }}>
        <div
          data-reveal=""
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: '36px',
              color: '#C24D00',
              margin: 0,
            }}
          >
            New Arrivals
          </h2>
          <Link
            href="/shop"
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: '#C24D00',
              borderBottom: '1px solid #C24D00',
              paddingBottom: '2px',
            }}
          >
            VIEW ALL
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="product-link"
              data-reveal=""
              style={{ display: 'block' }}
            >
              <div
                style={{
                  aspectRatio: '3/4',
                  background: '#1a1a1a',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {product.image && (
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                )}
              </div>
              <p style={{ fontSize: '14px', marginBottom: '4px', color: '#C24D00' }}>
                {product.name}
              </p>
              <p style={{ fontSize: '14px', color: '#9a9284' }}>${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '420px',
          background: '#111111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #C24D00',
          borderBottom: '1px solid #C24D00',
        }}
      >
        <div data-reveal="" style={{ textAlign: 'center', maxWidth: '560px', padding: '0 24px' }}>
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 5vw, 40px)',
              color: '#C24D00',
              lineHeight: 1.3,
              margin: '0 0 20px',
            }}
          >
            &ldquo;Crafted for permanence, not seasons.&rdquo;
          </blockquote>
          <Link
            href="/shop"
            style={{
              fontSize: '13px',
              letterSpacing: '0.12em',
              color: '#C24D00',
              borderBottom: '1px solid #C24D00',
              paddingBottom: '2px',
            }}
          >
            DISCOVER THE STORY
          </Link>
        </div>
      </section>
    </>
  )
}
