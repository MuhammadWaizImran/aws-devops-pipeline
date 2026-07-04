import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} style={{ display: 'block' }}>
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
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
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
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: '#6b6558',
          marginBottom: '4px',
          fontWeight: 500,
        }}
      >
        {product.category.toUpperCase()}
      </p>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '4px',
          color: '#F5F3EF',
        }}
      >
        {product.name}
      </p>
      <p style={{ fontSize: '14px', color: '#9a9284' }}>${product.price}</p>
    </Link>
  )
}
