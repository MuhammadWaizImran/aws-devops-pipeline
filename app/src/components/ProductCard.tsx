import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="product-link" style={{ display: 'block' }}>
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

      <p style={{ fontSize: '14px', marginBottom: '4px', color: '#2C1A0E' }}>{product.name}</p>
      <p style={{ fontSize: '14px', color: '#8B7355' }}>${product.price}</p>
    </Link>
  )
}
