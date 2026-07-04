import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'

const categories = [
  { label: 'Women', slug: 'women' },
  { label: 'Men', slug: 'men' },
  { label: 'Accessories', slug: 'accessories' },
]

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          height: '78vh',
          minHeight: '520px',
          background: 'linear-gradient(160deg, #0a0908 0%, #1a1612 60%, #111009 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(218,212,200,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(218,212,200,0.03) 0%, transparent 50%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#6b6558',
              marginBottom: '20px',
              fontWeight: 500,
            }}
          >
            AUTUMN / WINTER 2026 — NEW COLLECTION LIVE ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 400,
              color: '#F5F3EF',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '36px',
            }}
          >
            The Quiet
            <br />
            Luxury Edit
          </h1>
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              border: '1px solid #DAD4C8',
              color: '#F5F3EF',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 500,
              transition: 'all 0.25s',
            }}
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              style={{ display: 'block', position: 'relative', overflow: 'hidden' }}
            >
              <div
                style={{
                  aspectRatio: '4/5',
                  background: '#1a1916',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px',
                  transition: 'transform 0.4s ease',
                }}
              >
                {/* Category placeholder graphic */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.12,
                  }}
                >
                  <div
                    style={{
                      width: '60%',
                      height: '70%',
                      border: '1px solid #DAD4C8',
                      borderRadius: '2px',
                    }}
                  />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      color: '#6b6558',
                      marginBottom: '6px',
                    }}
                  >
                    COLLECTION
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '28px',
                      fontWeight: 500,
                      color: '#F5F3EF',
                      lineHeight: 1.1,
                    }}
                  >
                    {cat.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '40px',
            borderBottom: '1px solid #2a2826',
            paddingBottom: '16px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '32px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: '#F5F3EF',
            }}
          >
            New Arrivals
          </h2>
          <Link
            href="/shop"
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              fontWeight: 500,
              color: '#9a9284',
              borderBottom: '1px solid #6b6558',
              paddingBottom: '1px',
            }}
          >
            VIEW ALL
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              style={{ display: 'block' }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio: '3/4',
                  background: '#1a1916',
                  marginBottom: '16px',
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
                      width: '100%',
                      height: '100%',
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
                        borderRadius: '2px',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Info */}
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#6b6558',
                  marginBottom: '4px',
                }}
              >
                {product.category.toUpperCase()}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: '#F5F3EF' }}>
                {product.name}
              </p>
              <p style={{ fontSize: '14px', color: '#9a9284' }}>${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section
        style={{
          background: '#111009',
          padding: '100px 24px',
          textAlign: 'center',
          borderTop: '1px solid #2a2826',
          borderBottom: '1px solid #2a2826',
        }}
      >
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#F5F3EF',
            lineHeight: 1.3,
            maxWidth: '700px',
            margin: '0 auto 32px',
          }}
        >
          &ldquo;Crafted for permanence, not seasons.&rdquo;
        </blockquote>
        <Link
          href="/shop"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            fontWeight: 500,
            color: '#DAD4C8',
            borderBottom: '1px solid #6b6558',
            paddingBottom: '2px',
          }}
        >
          DISCOVER THE STORY
        </Link>
      </section>
    </>
  )
}
