'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/cart'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const product = PRODUCTS.find((p) => p.id === id)

  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [toast, setToast] = useState(false)
  const [descOpen, setDescOpen] = useState(true)

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0])
    }
  }, [product])

  if (!product) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '36px',
            marginBottom: '16px',
          }}
        >
          Product not found
        </h1>
        <Link href="/shop" style={{ fontSize: '13px', color: '#6b6558', letterSpacing: '0.1em' }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  const handleAddToBag = () => {
    if (!selectedSize) return
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: qty,
      image: product.image,
    })
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <Link href="/" style={{ fontSize: '12px', color: '#9a9284', letterSpacing: '0.08em' }}>
          HOME
        </Link>
        <span style={{ fontSize: '12px', color: '#c8c1b6' }}>/</span>
        <Link
          href={`/shop/${product.category}`}
          style={{ fontSize: '12px', color: '#9a9284', letterSpacing: '0.08em' }}
        >
          {product.category.toUpperCase()}
        </Link>
        <span style={{ fontSize: '12px', color: '#c8c1b6' }}>/</span>
        <span
          style={{
            fontSize: '12px',
            color: '#141310',
            letterSpacing: '0.08em',
            fontWeight: 500,
          }}
        >
          {product.name.toUpperCase()}
        </span>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Left — Image */}
        <div>
          <div
            style={{
              aspectRatio: '3/4',
              background: '#EFEAE2',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '12px',
            }}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
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
                    border: '1px solid #c8c1b6',
                    borderRadius: '2px',
                    opacity: 0.5,
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbnail strip (shown when image exists) */}
          {product.image && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '72px',
                  height: '90px',
                  background: '#EFEAE2',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #141310',
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div style={{ paddingTop: '8px' }}>
          {/* Category label */}
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: '#6b6558',
              marginBottom: '12px',
              fontWeight: 500,
            }}
          >
            {product.category.toUpperCase()}
          </p>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '36px',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '16px',
              color: '#141310',
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#141310',
              marginBottom: '32px',
            }}
          >
            ${product.price}
          </p>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #DAD4C8', marginBottom: '28px' }} />

          {/* SIZE */}
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: '#141310',
                }}
              >
                SIZE
              </p>
              <button
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#6b6558',
                  textDecoration: 'underline',
                }}
              >
                SIZE GUIDE
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid',
                    borderColor: selectedSize === size ? '#141310' : '#DAD4C8',
                    background: selectedSize === size ? '#141310' : 'transparent',
                    color: selectedSize === size ? '#F5F3EF' : '#141310',
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    minWidth: '48px',
                    transition: 'all 0.2s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: '#141310',
                marginBottom: '12px',
              }}
            >
              QUANTITY
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #DAD4C8',
              }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: '#141310',
                  cursor: 'pointer',
                }}
              >
                &minus;
              </button>
              <span
                style={{
                  width: '48px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: '#141310',
                  cursor: 'pointer',
                }}
              >
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
              padding: '16px',
              background: '#141310',
              color: '#F5F3EF',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              marginBottom: '32px',
              transition: 'opacity 0.2s',
              opacity: selectedSize ? 1 : 0.5,
            }}
          >
            ADD TO BAG
          </button>

          {/* DESCRIPTION accordion */}
          <div style={{ borderTop: '1px solid #DAD4C8' }}>
            <button
              onClick={() => setDescOpen((o) => !o)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: '#141310',
                cursor: 'pointer',
              }}
            >
              DESCRIPTION
              <span style={{ fontSize: '18px', fontWeight: 300 }}>
                {descOpen ? '−' : '+'}
              </span>
            </button>
            {descOpen && (
              <p
                style={{
                  fontSize: '14px',
                  color: '#6b6558',
                  lineHeight: 1.7,
                  paddingBottom: '20px',
                }}
              >
                {product.description}
              </p>
            )}
            <div style={{ borderTop: '1px solid #DAD4C8' }} />
          </div>

          {/* Care */}
          <div style={{ borderBottom: '1px solid #DAD4C8' }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: '#141310',
                cursor: 'pointer',
              }}
            >
              CARE &amp; COMPOSITION
              <span style={{ fontSize: '18px', fontWeight: 300 }}>+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            background: '#141310',
            color: '#F5F3EF',
            padding: '14px 24px',
            fontSize: '13px',
            letterSpacing: '0.06em',
            zIndex: 100,
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          Added to bag
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
