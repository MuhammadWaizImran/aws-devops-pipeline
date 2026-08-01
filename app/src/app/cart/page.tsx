'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'

const PLACEHOLDER = 'repeating-linear-gradient(45deg,#D4C9A8,#D4C9A8 8px,#E8DFC8 8px,#E8DFC8 16px)'

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '80px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#B8860B', marginBottom: '16px' }}>
          YOUR BAG
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 500, marginBottom: '12px', color: '#141310' }}>
          Your bag is empty
        </h1>
        <p style={{ color: '#B8860B', fontSize: '14px', marginBottom: '40px' }}>
          Discover our collection and add pieces you love.
        </p>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            padding: '16px 34px',
            background: '#141310',
            color: '#FAF8F5',
            fontSize: '13px',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 48px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '40px', color: '#141310', margin: '0 0 40px' }}>
        Shopping Bag
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '64px', alignItems: 'start' }}>
        {/* Items */}
        <div>
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${item.size}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '20px',
                padding: '24px 0',
                borderBottom: '1px solid #F5EFDE',
                alignItems: 'center',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: PLACEHOLDER }}>
                {item.image && (
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                )}
              </div>

              {/* Info + stepper */}
              <div>
                <p style={{ fontSize: '15px', color: '#141310', marginBottom: '6px' }}>{item.name}</p>
                <p style={{ fontSize: '13px', color: '#B8860B', marginBottom: '12px' }}>Size {item.size}</p>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E8DFC8', width: '110px' }}>
                  <button
                    onClick={() => updateQty(item.productId, item.size, Math.max(1, item.quantity - 1))}
                    style={{ flex: 1, padding: '8px', cursor: 'pointer', color: '#141310' }}
                  >
                    &minus;
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: '#141310' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                    style={{ flex: 1, padding: '8px', cursor: 'pointer', color: '#141310' }}
                  >
                    &#43;
                  </button>
                </div>
              </div>

              {/* Price + remove */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '15px', color: '#141310', marginBottom: '16px' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#B8860B', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: '#F5EFDE', padding: '32px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#141310', marginBottom: '20px' }}>
            Order Summary
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
            <span style={{ color: '#B8860B' }}>Subtotal</span>
            <span style={{ color: '#141310' }}>${subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
            <span style={{ color: '#B8860B' }}>Shipping</span>
            <span style={{ color: '#B8860B' }}>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', margin: '20px 0', paddingTop: '16px', borderTop: '1px solid #E8DFC8' }}>
            <span style={{ color: '#141310' }}>Total</span>
            <span style={{ color: '#141310', fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            style={{
              display: 'block',
              width: '100%',
              padding: '18px',
              background: '#141310',
              color: '#FAF8F5',
              fontSize: '13px',
              letterSpacing: '0.12em',
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
              color: '#B8860B',
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
