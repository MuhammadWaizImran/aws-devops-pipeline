import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, Product } from '@/lib/products'
import SortableProductGrid from '@/components/SortableProductGrid'

const validCategories = ['women', 'men', 'accessories'] as const
type CategorySlug = typeof validCategories[number]

const categoryTitles: Record<CategorySlug, string> = {
  women: 'Women',
  men: 'Men',
  accessories: 'Accessories',
}

const categoryLinks = [
  { label: 'All', href: '/shop' },
  { label: 'Women', href: '/shop/women' },
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
  if (!validCategories.includes(slug)) {
    notFound()
  }

  const filtered: Product[] = PRODUCTS.filter((p) => p.category === slug)
  const title = categoryTitles[slug]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/" style={{ fontSize: '12px', color: '#6b6558', letterSpacing: '0.08em' }}>
          HOME
        </Link>
        <span style={{ fontSize: '12px', color: '#2a2826' }}>/</span>
        <Link href="/shop" style={{ fontSize: '12px', color: '#6b6558', letterSpacing: '0.08em' }}>
          SHOP
        </Link>
        <span style={{ fontSize: '12px', color: '#2a2826' }}>/</span>
        <span
          style={{ fontSize: '12px', color: '#F5F3EF', letterSpacing: '0.08em', fontWeight: 500 }}
        >
          {title.toUpperCase()}
        </span>
      </div>

      {/* Page header */}
      <div
        style={{ marginBottom: '48px', borderBottom: '1px solid #2a2826', paddingBottom: '24px' }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#6b6558',
            marginBottom: '8px',
          }}
        >
          COLLECTION
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '40px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: '#F5F3EF',
          }}
        >
          {title}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px' }}>
        {/* Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: '80px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: '#6b6558',
                marginBottom: '16px',
              }}
            >
              CATEGORY
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categoryLinks.map((l) => {
                const isActive =
                  l.href === `/shop/${slug}` || (l.href === '/shop' && false)
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        fontSize: '14px',
                        color: isActive ? '#F5F3EF' : '#9a9284',
                        fontWeight: isActive ? 600 : 400,
                        display: 'block',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #2a2826',
                      }}
                    >
                      {l.label}
                      <span
                        style={{ float: 'right', fontSize: '12px', color: '#6b6558' }}
                      >
                        {l.href === '/shop'
                          ? PRODUCTS.length
                          : PRODUCTS.filter(
                              (p) => p.category === l.href.split('/').pop()
                            ).length}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Product grid with sort */}
        <SortableProductGrid products={filtered} />
      </div>
    </div>
  )
}
