'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'

const PLACEHOLDER = 'repeating-linear-gradient(45deg,#C9C2B5,#C9C2B5 8px,#D9D3C8 8px,#D9D3C8 16px)'

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '80px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#8B7355', marginBottom: '16px' }}>
          YOUR BAG
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 500, marginBottom: '12px', color: '#2C1A0E' }}>
          Your bag is empty
        </h1>
        <p style={{ color: '#8B7355', fontSize: '14px', marginBottom: '40px' }}>
          Discover our collection and add pieces you love.
        </p>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            padding: '16px 34px',
            background: '#7A5230',
            color: '#F5F3EF',
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
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '40px', color: '#2C1A0E', margin: '0 0 40px' }}>
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
                borderBottom: '1px solid #EFEAE2',
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
                <p style={{ fontSize: '15px', color: '#2C1A0E', marginBottom: '6px' }}>{item.name}</p>
                <p style={{ fontSize: '13px', color: '#8B7355', marginBottom: '12px' }}>Size {item.size}</p>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D4B896', width: '110px' }}>
                  <button
                    onClick={() => updateQty(item.productId, item.size, Math.max(1, item.quantity - 1))}
                    style={{ flex: 1, padding: '8px', cursor: 'pointer', color: '#2C1A0E' }}
                  >
                    &minus;
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: '#2C1A0E' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                    style={{ flex: 1, padding: '8px', cursor: 'pointer', color: '#2C1A0E' }}
                  >
                    &#43;
                  </button>
                </div>
              </div>

              {/* Price + remove */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '15px', color: '#2C1A0E', marginBottom: '16px' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#8B7355', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: '#EDE5D8', padding: '32px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#2C1A0E', marginBottom: '20px' }}>
            Order Summary
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
            <span style={{ color: '#8B7355' }}>Subtotal</span>
            <span style={{ color: '#2C1A0E' }}>${subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
            <span style={{ color: '#8B7355' }}>Shipping</span>
            <span style={{ color: '#8B7355' }}>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', margin: '20px 0', paddingTop: '16px', borderTop: '1px solid #DAD4C8' }}>
            <span style={{ color: '#2C1A0E' }}>Total</span>
            <span style={{ color: '#2C1A0E', fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            style={{
              display: 'block',
              width: '100%',
              padding: '18px',
              background: '#141310',
              color: '#F5F3EF',
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
              color: '#8B7355',
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
