import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion as Motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { getCategoryBySlug, getProductsByCategory } from '../lib/productCatalog'
import { getProductImage } from '../lib/productImages'

export default function ProductCategory({ onEnquireClick }) {
  const { categorySlug = '' } = useParams()
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    return (
      <PageTransition>
        <section className="flex min-h-[65vh] items-center justify-center px-6 pt-[calc(var(--bsi-navbar-height)+2rem)] text-center">
          <div className="max-w-lg">
            <p className="text-bsi-secondary mb-3 text-xs font-bold uppercase tracking-[0.2em]">Catalog</p>
            <h1 className="font-headline text-bsi-primary text-4xl font-extrabold">Category not found</h1>
            <p className="text-bsi-secondary mt-4 text-sm leading-relaxed">
              This category does not exist in the current catalog. Please go back to Products and choose an available
              category.
            </p>
            <Link
              to="/products"
              className="bg-bsi-primary mt-8 inline-flex rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            >
              Back to Products
            </Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  const products = getProductsByCategory(category.categoryName)

  return (
    <PageTransition>
      <Helmet>
        <title>{category.categoryName} - BSI Solutionz Product Catalog</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.categoryName} | BSI Solutionz`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:image" content="/og-products-placeholder.png" />
      </Helmet>

      <main className="relative overflow-hidden pb-24 pt-[calc(var(--bsi-navbar-height)+2rem)]">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <header className="mb-12 pl-2 sm:pl-4 md:mb-14 md:pl-8 lg:mb-16 lg:pl-16">
            <Link
              to="/products"
              className="text-bsi-secondary hover:text-bsi-primary mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition"
            >
              <span aria-hidden="true">&larr;</span>
              All Categories
            </Link>

            <h1 className="font-headline text-bsi-primary mb-5 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {category.categoryName}
            </h1>

            <p className="text-bsi-secondary max-w-3xl text-base leading-relaxed sm:text-lg">{category.description}</p>
          </header>

          <section className="grid grid-cols-1 gap-6 px-2 sm:px-4 md:grid-cols-3 md:px-8 lg:gap-8 lg:px-16">
            {products.map((product) => {
              const productImage = getProductImage(category, product)

              return (
              <Motion.article
                key={product.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="border-bsi-outline/30 bg-bsi-surface-lowest group flex h-full min-h-112 flex-col rounded-none border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
              >
                <div className="border-bsi-outline/30 mb-5 flex h-44 w-full items-center justify-center rounded-none border bg-white p-3">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full rounded-none object-contain"
                    />
                  ) : (
                    <img
                      src="/product-placeholder.svg"
                      alt={`${product.title} placeholder`}
                      loading="lazy"
                      className="h-full w-full rounded-none object-contain"
                    />
                  )}
                </div>

                <h3 className="font-headline text-bsi-primary mb-3 text-xl font-bold">
                  {product.title}
                </h3>

                <p className={['text-bsi-secondary mb-7 grow leading-relaxed', product.featured ? 'text-base' : 'text-sm'].join(' ')}>
                  {product.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-bsi-secondary text-[10px] font-bold uppercase tracking-[0.2em]">{product.specLabel}</span>
                    <span className="text-bsi-primary text-sm font-semibold">
                      {product.spec}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onEnquireClick?.(product.title)}
                    className="bg-bsi-primary-container rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-bsi-primary sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Enquire Now
                  </button>
                </div>
              </Motion.article>
              )
            })}
          </section>
        </div>
      </main>
    </PageTransition>
  )
}
