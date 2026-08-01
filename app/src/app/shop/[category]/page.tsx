import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, Product } from '@/lib/products'
import SortableProductGrid from '@/components/SortableProductGrid'

const validCategories = ['men', 'accessories'] as const
type CategorySlug = typeof validCategories[number]

const categoryTitles: Record<CategorySlug, string> = {
  men: 'Men',
  accessories: 'Accessories',
}

const categoryLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Accessories', href: '/shop/accessories' },
]

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const slug = category as CategorySlug
  if (!validCategories.includes(slug)) notFound()

  const filtered: Product[] = PRODUCTS.filter((p) => p.category === slug)
  const title = categoryTitles[slug]

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px' }}>
      <p style={{ fontSize: '12px', letterSpacing: '0.06em', color: '#8B7355', marginBottom: '8px' }}>
        HOME / {title.toUpperCase()}
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '44px',
          fontWeight: 500,
          color: '#2C1A0E',
          margin: '0 0 40px',
        }}
      >
        {title}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px' }}>
        {/* Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: '80px' }}>
            <p
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                color: '#2C1A0E',
                marginBottom: '16px',
              }}
            >
              CATEGORY
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>
              {categoryLinks.map((l) => {
                const isActive = l.href === `/shop/${slug}`
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        fontSize: '14px',
                        color: isActive ? '#141310' : '#8a8578',
                        fontWeight: isActive ? 600 : 400,
                        display: 'block',
                        padding: '8px 0',
                        borderBottom: '1px solid #F5F3EF',
                        transition: 'padding-left 0.25s ease, color 0.25s ease',
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Grid with sort */}
        <SortableProductGrid products={filtered} />
      </div>
    </div>
  )
}
