'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: '#6b6558',
            marginBottom: '16px',
          }}
        >
          YOUR BAG
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '36px',
            fontWeight: 500,
            marginBottom: '12px',
            color: '#F5F3EF',
          }}
        >
          Your bag is empty
        </h1>
        <p style={{ color: '#9a9284', fontSize: '14px', marginBottom: '40px' }}>
          Discover our collection and add pieces you love.
        </p>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            padding: '14px 40px',
            background: '#DAD4C8',
            color: '#0d0c0a',
            fontSize: '12px',
            letterSpacing: '0.14em',
            fontWeight: 500,
          }}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #2a2826', paddingBottom: '20px' }}>
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: '#6b6558',
            marginBottom: '8px',
          }}
        >
          YOUR BAG
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '36px',
            fontWeight: 500,
            color: '#F5F3EF',
          }}
        >
          Shopping Bag
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Items list */}
        <div>
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${item.size}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '20px',
                paddingBottom: '28px',
                marginBottom: '28px',
                borderBottom: idx < items.length - 1 ? '1px solid #2a2826' : 'none',
              }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio: '3/4',
                  background: '#1a1916',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
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
                        opacity: 0.5,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px', color: '#F5F3EF' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b6558', letterSpacing: '0.06em' }}>
                        Size: {item.size}
                      </p>
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: '#DAD4C8' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <p style={{ fontSize: '13px', color: '#9a9284' }}>${item.price} each</p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  {/* Qty stepper */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid #2a2826',
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.size, Math.max(1, item.quantity - 1))
                      }
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        color: '#F5F3EF',
                        cursor: 'pointer',
                      }}
                    >
                      &minus;
                    </button>
                    <span
                      style={{
                        width: '40px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#F5F3EF',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        color: '#F5F3EF',
                        cursor: 'pointer',
                      }}
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      color: '#6b6558',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          style={{
            background: '#1a1916',
            padding: '32px',
            position: 'sticky',
            top: '80px',
            border: '1px solid #2a2826',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px',
              fontWeight: 500,
              marginBottom: '24px',
              color: '#F5F3EF',
            }}
          >
            Order Summary
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#9a9284' }}>Subtotal</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#F5F3EF' }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#9a9284' }}>Shipping</span>
              <span style={{ fontSize: '13px', color: '#9a9284' }}>Free</span>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #2a2826',
              paddingTop: '16px',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F3EF' }}>Total</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#DAD4C8' }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              background: '#DAD4C8',
              color: '#0d0c0a',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            CHECKOUT
          </Link>

          <Link
            href="/shop"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '16px',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: '#6b6558',
              textDecoration: 'underline',
            }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  )
}
