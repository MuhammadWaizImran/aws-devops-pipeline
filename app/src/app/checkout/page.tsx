'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'

type Step = 'shipping' | 'payment' | 'review' | 'confirmed'

interface ShippingData {
  firstName: string; lastName: string; address: string; city: string; state: string; zip: string
}
interface PaymentData {
  cardNumber: string; expiry: string; cvc: string
}

const STEPS: Step[] = ['shipping', 'payment', 'review']
const STEP_LABELS = { shipping: '1. SHIPPING', payment: '2. PAYMENT', review: '3. REVIEW', confirmed: '' }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px', border: '1px solid #E8DFC8',
  background: '#FAF8F5', fontSize: '14px', color: '#141310', outline: 'none',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', letterSpacing: '0.1em',
  fontWeight: 600, color: '#B8860B', marginBottom: '8px',
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()

  const [step, setStep] = useState<Step>('shipping')
  const [shipping, setShipping] = useState<ShippingData>({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '' })
  const [payment, setPayment] = useState<PaymentData>({ cardNumber: '', expiry: '', cvc: '' })
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateShipping = (field: keyof ShippingData, value: string) =>
    setShipping((s) => ({ ...s, [field]: value }))
  const updatePayment = (field: keyof PaymentData, value: string) =>
    setPayment((p) => ({ ...p, [field]: value }))

  const handlePlaceOrder = async () => {
    setLoading(true); setError(null)
    const cardLast4 = payment.cardNumber.replace(/\s/g, '').slice(-4)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping, cardLast4, total: subtotal }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Order failed')
      setOrderNumber(data.orderNumber); clearCart(); setStep('confirmed')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally { setLoading(false) }
  }

  // ── CONFIRMED ──
  if (step === 'confirmed') {
    return (
      <div style={{ textAlign: 'center', padding: '100px 48px', animation: 'fadeUp 0.6s cubic-bezier(.16,1,.3,1) both' }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#B8860B', marginBottom: '16px' }}>
          ORDER CONFIRMED
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '44px', color: '#141310', margin: '0 0 20px' }}>
          Thank you, {shipping.firstName}.
        </h1>
        <p style={{ fontSize: '15px', color: '#4a463d', marginBottom: '40px' }}>
          Your order {orderNumber} has been placed and will arrive in 3–5 business days.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block', padding: '16px 34px',
            background: '#141310', color: '#FAF8F5',
            fontSize: '13px', letterSpacing: '0.12em', fontWeight: 500,
          }}
        >
          RETURN HOME
        </Link>
      </div>
    )
  }

  const stepIndex = STEPS.indexOf(step)
  const step1Invalid = !shipping.firstName || !shipping.lastName || !shipping.address || !shipping.city || !shipping.state || !shipping.zip
  const step2Invalid = !payment.cardNumber || !payment.expiry || !payment.cvc

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 48px' }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', letterSpacing: '0.06em', fontWeight: 600, color: '#141310', display: 'block', marginBottom: '24px' }}>
          PRIME BAZAAR
        </Link>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', fontSize: '12px', letterSpacing: '0.1em' }}>
          {STEPS.map((s) => (
            <span key={s} style={{ color: s === step ? '#141310' : '#8a8578', fontWeight: s === step ? 600 : 400 }}>
              {STEP_LABELS[s]}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '64px', alignItems: 'start' }}>
        {/* ── FORMS ── */}
        <div>
          {/* STEP 1: SHIPPING */}
          {step === 'shipping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '420px', animation: 'fadeUp 0.4s ease both' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input style={inputStyle} value={shipping.firstName} onChange={(e) => updateShipping('firstName', e.target.value)} placeholder="Jane" />
                </div>
                <div>
                  <label style={labelStyle}>LAST NAME</label>
                  <input style={inputStyle} value={shipping.lastName} onChange={(e) => updateShipping('lastName', e.target.value)} placeholder="Smith" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>ADDRESS</label>
                <input style={inputStyle} value={shipping.address} onChange={(e) => updateShipping('address', e.target.value)} placeholder="123 Elm Street" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input style={inputStyle} value={shipping.city} onChange={(e) => updateShipping('city', e.target.value)} placeholder="New York" />
                </div>
                <div>
                  <label style={labelStyle}>STATE</label>
                  <input style={inputStyle} value={shipping.state} onChange={(e) => updateShipping('state', e.target.value)} placeholder="NY" />
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input style={inputStyle} value={shipping.zip} onChange={(e) => updateShipping('zip', e.target.value)} placeholder="10001" />
                </div>
              </div>
              <button
                onClick={() => setStep('payment')}
                disabled={step1Invalid}
                style={{
                  background: '#141310', color: '#FAF8F5', border: 'none',
                  padding: '16px', fontSize: '13px', letterSpacing: '0.12em',
                  fontWeight: 500, cursor: 'pointer', opacity: step1Invalid ? 0.4 : 1, transition: 'opacity 0.2s',
                }}
              >
                CONTINUE TO PAYMENT
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '420px', animation: 'fadeUp 0.4s ease both' }}>
              <div>
                <label style={labelStyle}>CARD NUMBER</label>
                <input style={inputStyle} value={payment.cardNumber}
                  onChange={(e) => { const raw = e.target.value.replace(/\D/g, '').slice(0, 16); updatePayment('cardNumber', raw.replace(/(.{4})/g, '$1 ').trim()) }}
                  placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>EXPIRY (MM/YY)</label>
                  <input style={inputStyle} value={payment.expiry}
                    onChange={(e) => { const raw = e.target.value.replace(/\D/g, '').slice(0, 4); updatePayment('expiry', raw.length > 2 ? `${raw.slice(0,2)}/${raw.slice(2)}` : raw) }}
                    placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <label style={labelStyle}>CVC</label>
                  <input style={inputStyle} type="password" value={payment.cvc}
                    onChange={(e) => updatePayment('cvc', e.target.value.replace(/\D/g,'').slice(0,4))}
                    placeholder="•••" maxLength={4} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <span onClick={() => setStep('shipping')} style={{ fontSize: '13px', letterSpacing: '0.06em', textDecoration: 'underline', cursor: 'pointer', alignSelf: 'center', color: '#141310' }}>
                  BACK
                </span>
                <button
                  onClick={() => setStep('review')}
                  disabled={step2Invalid}
                  style={{
                    flex: 1, background: '#141310', color: '#FAF8F5', border: 'none',
                    padding: '16px', fontSize: '13px', letterSpacing: '0.12em',
                    fontWeight: 500, cursor: 'pointer', opacity: step2Invalid ? 0.4 : 1, transition: 'opacity 0.2s',
                  }}
                >
                  REVIEW ORDER
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 'review' && (
            <div style={{ maxWidth: '420px', animation: 'fadeUp 0.4s ease both' }}>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#B8860B', marginBottom: '8px' }}>SHIP TO</p>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#141310' }}>
                  {shipping.firstName} {shipping.lastName}<br />
                  {shipping.address}<br />
                  {shipping.city}, {shipping.state} {shipping.zip}
                </p>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#B8860B', marginBottom: '8px' }}>PAYMENT</p>
                <p style={{ fontSize: '14px', color: '#141310' }}>
                  Card ending {payment.cardNumber.replace(/\s/g,'').slice(-4)}
                </p>
              </div>
              {error && (
                <div style={{ padding: '12px 16px', background: '#fff0f0', border: '1px solid #ffb3b3', fontSize: '13px', color: '#c00', marginBottom: '20px' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '16px' }}>
                <span onClick={() => setStep('payment')} style={{ fontSize: '13px', letterSpacing: '0.06em', textDecoration: 'underline', cursor: 'pointer', alignSelf: 'center', color: '#141310' }}>
                  BACK
                </span>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    flex: 1, background: '#141310', color: '#FAF8F5', border: 'none',
                    padding: '16px', fontSize: '13px', letterSpacing: '0.12em',
                    fontWeight: 500, cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                  }}
                >
                  {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div style={{ background: '#F5EFDE', padding: '32px' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#141310', marginBottom: '20px' }}>
            Order Summary
          </h3>
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px', color: '#4a463d' }}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E8DFC8', color: '#141310' }}>
            <span>Total</span>
            <span style={{ fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
