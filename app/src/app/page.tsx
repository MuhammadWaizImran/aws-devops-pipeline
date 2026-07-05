import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import HeroSlider from '@/components/HeroSlider'

const categories = [
  { label: 'Men', slug: 'men', image: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg' },
  { label: 'Accessories', slug: 'accessories', image: '/uploads/acc-bangle.jpg' },
]

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.category !== 'women').slice(0, 4)

  return (
    <>
      {/* ── HERO — auto-sliding image carousel ── */}
      <HeroSlider />

      {/* ── CATEGORY TILES ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3px',
          background: '#D4B896',
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
                  background:
                    'repeating-linear-gradient(45deg,#C9C2B5,#C9C2B5 10px,#D9D3C8 10px,#D9D3C8 20px)',
                }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(61,40,16,0.45), rgba(61,40,16,0.02) 55%)',
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
                  background: 'rgba(245,243,239,0.92)',
                  color: '#3D2810',
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
              color: '#2C1A0E',
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
              color: '#7A5230',
              borderBottom: '1px solid #7A5230',
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
                  background:
                    'repeating-linear-gradient(45deg,#C9C2B5,#C9C2B5 10px,#D9D3C8 10px,#D9D3C8 20px)',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {product.image && (
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                )}
              </div>
              <p style={{ fontSize: '14px', marginBottom: '4px', color: '#2C1A0E' }}>
                {product.name}
              </p>
              <p style={{ fontSize: '14px', color: '#8B7355' }}>${product.price}</p>
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
          background:
            'repeating-linear-gradient(70deg,#EDE5D8,#EDE5D8 16px,#DAC9B0 16px,#DAC9B0 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div data-reveal="" style={{ textAlign: 'center', maxWidth: '560px', padding: '0 24px' }}>
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 5vw, 40px)',
              color: '#3D2810',
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
              color: '#7A5230',
              borderBottom: '1px solid #7A5230',
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
