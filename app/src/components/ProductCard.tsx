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
            'repeating-linear-gradient(45deg,#DADADA,#DADADA 10px,#E5E5E5 10px,#E5E5E5 20px)',
          marginBottom: '14px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {product.image && (
          <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
        )}
      </div>

      <p style={{ fontSize: '14px', marginBottom: '4px', color: '#141310' }}>{product.name}</p>
      <p style={{ fontSize: '14px', color: '#B8860B' }}>${product.price}</p>
    </Link>
  )
}
