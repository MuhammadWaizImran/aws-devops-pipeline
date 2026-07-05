'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/products'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function SortableProductGrid({
  products,
}: {
  products: Product[]
}) {
  const [sort, setSort] = useState<SortOption>('featured')

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  if (sorted.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', color: '#6b6558' }}>No products found in this category.</p>
      </div>
    )
  }

  return (
    <section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <p style={{ fontSize: '13px', color: '#8B7355' }}>
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{
            padding: '8px 14px',
            border: '1px solid #D4B896',
            background: '#F5F3EF',
            color: '#2C1A0E',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
        }}
      >
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
