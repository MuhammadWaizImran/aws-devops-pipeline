import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'

const categories = [
  { label: 'Women', slug: 'women', image: null as string | null },
  { label: 'Men', slug: 'men', image: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg' },
  { label: 'Accessories', slug: 'accessories', image: '/uploads/acc-bangle.jpg' },
]

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          height: '78vh',
          minHeight: '520px',
          overflow: 'hidden',
          background: 'repeating-linear-gradient(115deg,#C9C2B5,#C9C2B5 14px,#D9D3C8 14px,#D9D3C8 28px)',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Zoom layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'heroZoom 8s ease-out both',
            background: 'inherit',
          }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(20,19,16,0.45), rgba(20,19,16,0.05) 55%)',
          }}
        />

        {/* Hero copy */}
        <div
          style={{
            position: 'relative',
            padding: '0 48px 64px',
            width: '100%',
            color: '#F5F3EF',
            animation: 'fadeUp 0.9s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', marginBottom: '14px' }}>
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
          <button
            onClick={undefined}
            style={{
              background: '#F5F3EF',
              color: '#141310',
              border: 'none',
              padding: '16px 34px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              cursor: 'pointer',
            }}
          >
            <Link href="/shop" style={{ color: '#141310' }}>
              SHOP THE COLLECTION
            </Link>
          </button>
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          background: '#DAD4C8',
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
                background: 'linear-gradient(0deg, rgba(20,19,16,0.35), rgba(20,19,16,0.02) 55%)',
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
              color: '#141310',
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
              color: '#141310',
              borderBottom: '1px solid #141310',
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
              <p style={{ fontSize: '14px', marginBottom: '4px', color: '#141310' }}>
                {product.name}
              </p>
              <p style={{ fontSize: '14px', color: '#6b6558' }}>${product.price}</p>
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
            'repeating-linear-gradient(70deg,#EFEAE2,#EFEAE2 16px,#E3DCCF 16px,#E3DCCF 32px)',
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
              color: '#141310',
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
              color: '#141310',
              borderBottom: '1px solid #141310',
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
