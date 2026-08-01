'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/cart'

type AccordionKey = 'description' | 'shipping' | 'materials'

const ACCORDION_DEFS: { key: AccordionKey; title: string; body: (desc: string) => string }[] = [
  {
    key: 'description',
    title: 'DESCRIPTION',
    body: (desc) =>
      desc || 'Crafted from premium materials with meticulous attention to detail. Designed to be worn season after season.',
  },
  {
    key: 'shipping',
    title: 'SHIPPING & RETURNS',
    body: () => 'Free standard shipping on all orders. Complimentary returns within 30 days of delivery.',
  },
  {
    key: 'materials',
    title: 'MATERIALS & CARE',
    body: () => 'Made from responsibly sourced materials. Dry clean only. Store folded to preserve shape.',
  },
]

const PLACEHOLDER =
  'repeating-linear-gradient(45deg,#DADADA,#DADADA 8px,#E5E5E5 8px,#E5E5E5 16px)'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const product = PRODUCTS.find((p) => p.id === id)

  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<AccordionKey>('description')
  const [activeThumb, setActiveThumb] = useState(0)

  useEffect(() => {
    if (product?.sizes?.length) setSelectedSize(product.sizes[0])
  }, [product])

  if (!product) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', marginBottom: '16px', color: '#141310' }}>
          Product not found
        </h1>
        <Link href="/shop" style={{ fontSize: '13px', color: '#B8860B', letterSpacing: '0.1em' }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  const toggleAccordion = (key: AccordionKey) =>
    setOpenAccordion((prev) => (prev === key ? 'description' : key))

  const handleAddToBag = () => {
    if (!selectedSize) return
    addItem({ productId: product.id, name: product.name, price: product.price, size: selectedSize, quantity: qty, image: product.image })
    setToastMessage(`${product.name} added to bag`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2200)
  }

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px' }}>
      {/* Back link */}
      <Link
        href={`/shop/${product.category}`}
        style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#B8860B', display: 'inline-block', marginBottom: '32px' }}
      >
        ← BACK TO {product.category.toUpperCase()}
      </Link>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

        {/* ── LEFT: Thumbnail sidebar + main image ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: '16px', minWidth: 0 }}>
          {/* Thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                onClick={() => setActiveThumb(i)}
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: PLACEHOLDER,
                  cursor: 'pointer',
                  border: `1px solid ${activeThumb === i ? '#141310' : 'transparent'}`,
                  transition: 'border-color 0.2s',
                }}
              >
                {product.image && (
                  <Image src={product.image} alt={`${product.name} view ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                )}
              </div>
            ))}
          </div>

          {/* Main image */}
          <div
            className="product-link"
            style={{ position: 'relative', aspectRatio: '3/4', minWidth: 0, overflow: 'hidden', background: PLACEHOLDER }}
          >
            {product.image && (
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
            )}
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div style={{ maxWidth: '420px', minWidth: 0 }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#B8860B', marginBottom: '10px' }}>
            {product.category.toUpperCase()}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: '38px',
              lineHeight: 1.15,
              color: '#141310',
              margin: '0 0 14px',
            }}
          >
            {product.name}
          </h1>
          <p style={{ fontSize: '20px', color: '#141310', marginBottom: '28px' }}>${product.price}</p>

          {/* SIZE */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#141310' }}>SIZE</p>
              <button style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#B8860B', textDecoration: 'underline' }}>
                SIZE GUIDE
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${selectedSize === size ? '#141310' : '#E5E5E5'}`,
                    background: selectedSize === size ? '#141310' : 'transparent',
                    color: selectedSize === size ? '#FFFFFF' : '#141310',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#141310', marginBottom: '12px' }}>QUANTITY</p>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E5E5', width: '120px' }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ flex: 1, padding: '10px', fontSize: '16px', cursor: 'pointer', color: '#141310' }}>
                &minus;
              </button>
              <span style={{ flex: 1, textAlign: 'center', fontSize: '14px', color: '#141310' }}>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} style={{ flex: 1, padding: '10px', fontSize: '16px', cursor: 'pointer', color: '#141310' }}>
                &#43;
              </button>
            </div>
          </div>

          {/* ADD TO BAG */}
          <button
            onClick={handleAddToBag}
            disabled={!selectedSize}
            style={{
              width: '100%',
              background: '#141310',
              color: '#FFFFFF',
              border: 'none',
              padding: '18px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              fontWeight: 500,
              cursor: selectedSize ? 'pointer' : 'not-allowed',
              marginBottom: '12px',
              opacity: selectedSize ? 1 : 0.4,
              transition: 'opacity 0.2s',
            }}
          >
            {selectedSize ? 'ADD TO BAG' : 'SELECT A SIZE TO CONTINUE'}
          </button>
          <p style={{ fontSize: '12px', color: '#B8860B', textAlign: 'center', marginBottom: '32px' }}>
            Free shipping &amp; returns
          </p>

          {/* ACCORDIONS */}
          <div style={{ borderTop: '1px solid #E5E5E5' }}>
            {ACCORDION_DEFS.map(({ key, title, body }) => (
              <div key={key} style={{ borderBottom: '1px solid #E5E5E5' }}>
                <button
                  onClick={() => toggleAccordion(key)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 0',
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    color: '#141310',
                    cursor: 'pointer',
                  }}
                >
                  {title}
                  <span style={{ fontSize: '18px', fontWeight: 300 }}>
                    {openAccordion === key ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === key && (
                  <p style={{ paddingBottom: '18px', fontSize: '13px', lineHeight: 1.7, color: '#4a463d', animation: 'fadeUp 0.35s ease both' }}>
                    {body(product.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            background: '#7A5230',
            color: '#FFFFFF',
            padding: '16px 24px',
            fontSize: '13px',
            letterSpacing: '0.04em',
            zIndex: 100,
            animation: 'toastIn 0.25s ease',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  )
}
