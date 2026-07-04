'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'

type Step = 'shipping' | 'payment' | 'review' | 'confirmed'

interface ShippingData {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
}

interface PaymentData {
  cardNumber: string
  expiry: string
  cvc: string
}

const STEPS: Step[] = ['shipping', 'payment', 'review']
const STEP_LABELS: Record<Step, string> = {
  shipping: 'SHIPPING',
  payment: 'PAYMENT',
  review: 'REVIEW',
  confirmed: 'CONFIRMED',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #2a2826',
  background: '#1a1916',
  fontSize: '14px',
  color: '#F5F3EF',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '0.1em',
  fontWeight: 600,
  color: '#6b6558',
  marginBottom: '8px',
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()

  const [step, setStep] = useState<Step>('shipping')
  const [shipping, setShipping] = useState<ShippingData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })
  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateShipping = (field: keyof ShippingData, value: string) =>
    setShipping((s) => ({ ...s, [field]: value }))

  const updatePayment = (field: keyof PaymentData, value: string) =>
    setPayment((p) => ({ ...p, [field]: value }))

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError(null)
    const cardLast4 = payment.cardNumber.replace(/\s/g, '').slice(-4)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shipping,
          cardLast4,
          total: subtotal,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Order failed')
      setOrderNumber(data.orderNumber)
      clearCart()
      setStep('confirmed')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── CONFIRMED ──────────────────────────────────────────────────────────────
  if (step === 'confirmed') {
    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            border: '2px solid #DAD4C8',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: '22px',
            color: '#DAD4C8',
          }}
        >
          &#10003;
        </div>
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#6b6558',
            marginBottom: '16px',
          }}
        >
          ORDER CONFIRMED
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '36px',
            fontWeight: 500,
            marginBottom: '16px',
            color: '#F5F3EF',
          }}
        >
          Thank you, {shipping.firstName}.
        </h1>
        <p style={{ fontSize: '15px', color: '#9a9284', marginBottom: '8px' }}>
          Your order has been placed successfully.
        </p>
        {orderNumber && (
          <p
            style={{
              fontSize: '14px',
              color: '#DAD4C8',
              marginBottom: '40px',
              fontWeight: 500,
            }}
          >
            Order #{orderNumber}
          </p>
        )}
        <p style={{ fontSize: '13px', color: '#9a9284', marginBottom: '40px' }}>
          A confirmation email will be sent to you shortly.
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

  const stepIndex = STEPS.indexOf(step)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          borderBottom: '1px solid #2a2826',
          paddingBottom: '24px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: '#F5F3EF',
            display: 'block',
            marginBottom: '24px',
          }}
        >
          PRIME BAZAAR
        </Link>

        {/* Step indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: i <= stepIndex ? '#DAD4C8' : '#2a2826',
                    background: i < stepIndex ? '#DAD4C8' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: i < stepIndex ? '#0d0c0a' : i === stepIndex ? '#DAD4C8' : '#6b6558',
                  }}
                >
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: i === stepIndex ? '#F5F3EF' : '#6b6558',
                    fontWeight: i === stepIndex ? 600 : 400,
                  }}
                >
                  {STEP_LABELS[s]}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: '80px',
                    height: '1px',
                    background: i < stepIndex ? '#DAD4C8' : '#2a2826',
                    margin: '0 8px',
                    marginBottom: '20px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: Form steps ── */}
        <div>
          {/* STEP 1: SHIPPING */}
          {step === 'shipping' && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 500,
                  marginBottom: '32px',
                  color: '#F5F3EF',
                }}
              >
                Shipping Information
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input
                    style={inputStyle}
                    value={shipping.firstName}
                    onChange={(e) => updateShipping('firstName', e.target.value)}
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label style={labelStyle}>LAST NAME</label>
                  <input
                    style={inputStyle}
                    value={shipping.lastName}
                    onChange={(e) => updateShipping('lastName', e.target.value)}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>ADDRESS</label>
                <input
                  style={inputStyle}
                  value={shipping.address}
                  onChange={(e) => updateShipping('address', e.target.value)}
                  placeholder="123 Elm Street, Apt 4B"
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 120px',
                  gap: '16px',
                  marginBottom: '32px',
                }}
              >
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input
                    style={inputStyle}
                    value={shipping.city}
                    onChange={(e) => updateShipping('city', e.target.value)}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label style={labelStyle}>STATE</label>
                  <input
                    style={inputStyle}
                    value={shipping.state}
                    onChange={(e) => updateShipping('state', e.target.value)}
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input
                    style={inputStyle}
                    value={shipping.zip}
                    onChange={(e) => updateShipping('zip', e.target.value)}
                    placeholder="10001"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={
                  !shipping.firstName ||
                  !shipping.lastName ||
                  !shipping.address ||
                  !shipping.city ||
                  !shipping.state ||
                  !shipping.zip
                }
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#DAD4C8',
                  color: '#0d0c0a',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  opacity:
                    !shipping.firstName ||
                    !shipping.lastName ||
                    !shipping.address ||
                    !shipping.city ||
                    !shipping.state ||
                    !shipping.zip
                      ? 0.5
                      : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                CONTINUE TO PAYMENT
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 500,
                  marginBottom: '32px',
                  color: '#F5F3EF',
                }}
              >
                Payment Details
              </h2>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>CARD NUMBER</label>
                <input
                  style={inputStyle}
                  value={payment.cardNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
                    const formatted = raw.replace(/(.{4})/g, '$1 ').trim()
                    updatePayment('cardNumber', formatted)
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '32px',
                }}
              >
                <div>
                  <label style={labelStyle}>EXPIRY DATE (MM/YY)</label>
                  <input
                    style={inputStyle}
                    value={payment.expiry}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
                      const formatted = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw
                      updatePayment('expiry', formatted)
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label style={labelStyle}>CVC</label>
                  <input
                    style={inputStyle}
                    type="password"
                    value={payment.cvc}
                    onChange={(e) => updatePayment('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="&bull;&bull;&bull;"
                    maxLength={4}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep('shipping')}
                  style={{
                    padding: '16px 24px',
                    border: '1px solid #2a2826',
                    background: 'transparent',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: '#F5F3EF',
                    cursor: 'pointer',
                  }}
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep('review')}
                  disabled={!payment.cardNumber || !payment.expiry || !payment.cvc}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: '#DAD4C8',
                    color: '#0d0c0a',
                    fontSize: '12px',
                    letterSpacing: '0.14em',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    opacity: !payment.cardNumber || !payment.expiry || !payment.cvc ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  REVIEW ORDER
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 'review' && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 500,
                  marginBottom: '32px',
                  color: '#F5F3EF',
                }}
              >
                Review Your Order
              </h2>

              {/* Shipping summary */}
              <div
                style={{
                  background: '#1a1916',
                  border: '1px solid #2a2826',
                  padding: '20px 24px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      fontWeight: 600,
                      color: '#6b6558',
                    }}
                  >
                    SHIPPING TO
                  </p>
                  <button
                    onClick={() => setStep('shipping')}
                    style={{
                      fontSize: '11px',
                      color: '#9a9284',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#F5F3EF' }}>
                  {shipping.firstName} {shipping.lastName}
                </p>
                <p style={{ fontSize: '13px', color: '#9a9284' }}>{shipping.address}</p>
                <p style={{ fontSize: '13px', color: '#9a9284' }}>
                  {shipping.city}, {shipping.state} {shipping.zip}
                </p>
              </div>

              {/* Payment summary */}
              <div
                style={{
                  background: '#1a1916',
                  border: '1px solid #2a2826',
                  padding: '20px 24px',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      fontWeight: 600,
                      color: '#6b6558',
                    }}
                  >
                    PAYMENT
                  </p>
                  <button
                    onClick={() => setStep('payment')}
                    style={{
                      fontSize: '11px',
                      color: '#9a9284',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#F5F3EF' }}>
                  Card ending in {payment.cardNumber.replace(/\s/g, '').slice(-4)}
                </p>
                <p style={{ fontSize: '13px', color: '#9a9284' }}>Expires {payment.expiry}</p>
              </div>

              {error && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: '#1a0808',
                    border: '1px solid #3a1515',
                    fontSize: '13px',
                    color: '#f87171',
                    marginBottom: '20px',
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep('payment')}
                  style={{
                    padding: '16px 24px',
                    border: '1px solid #2a2826',
                    background: 'transparent',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: '#F5F3EF',
                    cursor: 'pointer',
                  }}
                >
                  BACK
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: '#DAD4C8',
                    color: '#0d0c0a',
                    fontSize: '12px',
                    letterSpacing: '0.14em',
                    fontWeight: 500,
                    border: 'none',
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div
          style={{
            background: '#1a1916',
            border: '1px solid #2a2826',
            padding: '28px',
            position: 'sticky',
            top: '80px',
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '22px',
              fontWeight: 500,
              marginBottom: '20px',
              color: '#F5F3EF',
            }}
          >
            Order Summary
          </h3>

          {items.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#9a9284' }}>Your bag is empty.</p>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '20px',
                  maxHeight: '320px',
                  overflowY: 'auto',
                }}
              >
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '72px',
                        background: '#2a2826',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          marginBottom: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: '#F5F3EF',
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b6558', marginBottom: '2px' }}>
                        {item.size} &times; {item.quantity}
                      </p>
                      <p style={{ fontSize: '13px', fontWeight: 500, color: '#DAD4C8' }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #2a2826', paddingTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#9a9284' }}>Subtotal</span>
                  <span style={{ fontSize: '13px', color: '#F5F3EF' }}>${subtotal.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#9a9284' }}>Shipping</span>
                  <span style={{ fontSize: '13px', color: '#9a9284' }}>Free</span>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #2a2826',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F3EF' }}>Total</span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#DAD4C8' }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
