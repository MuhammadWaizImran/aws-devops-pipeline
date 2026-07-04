import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'

const categories = [
  {
    label: 'Women',
    slug: 'women',
    image: null as string | null,
  },
  {
    label: 'Men',
    slug: 'men',
    image: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg',
  },
  {
    label: 'Accessories',
    slug: 'accessories',
    image: '/uploads/acc-bangle.jpg',
  },
]

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          height: '78vh',
          minHeight: '520px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background with heroZoom animation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #0a0908 0%, #1a1612 60%, #111009 100%)',
            animation: 'heroZoom 8s ease-out both',
          }}
        />
        {/* Bottom gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(0deg, rgba(13,12,10,0.7) 0%, rgba(13,12,10,0.05) 55%)',
          }}
        />
        {/* Subtle radial texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(218,212,200,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(218,212,200,0.03) 0%, transparent 50%)',
          }}
        />

        {/* Hero copy */}
        <div
          style={{
            position: 'relative',
            padding: '0 48px 64px',
            width: '100%',
            animation: 'fadeUp 0.9s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: '#9a9284',
              marginBottom: '14px',
            }}
          >
            AUTUMN / WINTER 2026
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 84px)',
              lineHeight: 1.15,
              color: '#F5F3EF',
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
              background: '#DAD4C8',
              color: '#0d0c0a',
              fontSize: '13px',
              letterSpacing: '0.12em',
              fontWeight: 500,
            }}
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </section>

      {/* ── CATEGORY TILES ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          background: '#2a2826',
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
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: '#1a1916' }} />
            )}
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(0deg, rgba(13,12,10,0.55) 0%, rgba(13,12,10,0.02) 55%)',
              }}
            />
            {/* Label */}
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
                  color: '#141310',
                  padding: '10px 26px',
                }}
              >
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────────────── */}
      <section
        style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 48px 64px' }}
      >
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
              color: '#F5F3EF',
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
              color: '#9a9284',
              borderBottom: '1px solid #6b6558',
              paddingBottom: '2px',
            }}
          >
            VIEW ALL
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
        >
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
                  background: '#1a1916',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40%',
                        height: '50%',
                        border: '1px solid #2a2826',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                )}
              </div>
              <p style={{ fontSize: '14px', marginBottom: '4px', color: '#F5F3EF' }}>
                {product.name}
              </p>
              <p style={{ fontSize: '14px', color: '#9a9284' }}>${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL BANNER ───────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '420px',
          background: '#111009',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #2a2826',
          borderBottom: '1px solid #2a2826',
        }}
      >
        <div
          data-reveal=""
          style={{
            textAlign: 'center',
            maxWidth: '560px',
            padding: '0 24px',
          }}
        >
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 5vw, 52px)',
              color: '#F5F3EF',
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
              color: '#DAD4C8',
              borderBottom: '1px solid #6b6558',
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
