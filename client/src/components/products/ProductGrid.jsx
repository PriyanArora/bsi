import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CATEGORY_CATALOG } from '../../lib/productCatalog'
import { getCategoryTitleImage } from '../../lib/productImages'

const SORTED_CATEGORY_CATALOG = [...CATEGORY_CATALOG].sort(
  (a, b) => b.productsCount - a.productsCount || a.categoryName.localeCompare(b.categoryName)
)

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 px-2 sm:px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:gap-8 lg:px-16">
      {SORTED_CATEGORY_CATALOG.map((category) => {
        const categoryImage = getCategoryTitleImage(category)

        return (
        <Link key={category.slug} to={`/products/${category.slug}`} className="group block h-full">
          <Motion.article
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="border-bsi-outline/30 bg-bsi-surface-lowest flex h-full min-h-116 flex-col rounded-none border p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow group-hover:shadow-[0_14px_40px_rgb(0,0,0,0.08)]"
          >
            <div className="mb-5 flex h-44 items-center justify-center rounded-none border border-slate-200 bg-white p-3 md:h-48 lg:h-52">
              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={`${category.categoryName} title`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-bsi-primary/45 font-headline text-[3rem] font-extrabold uppercase tracking-tight">
                  {category.categoryName
                    .split(' ')
                    .map((word) => word[0])
                    .join('')}
                </span>
              )}
            </div>

            <h3 className="font-headline text-bsi-primary mb-2 text-xl font-bold">{category.categoryName}</h3>
            <p className="text-bsi-secondary mb-8 text-sm leading-relaxed">{category.description}</p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-2">
              <span className="text-bsi-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                {`${category.productsCount} OPTIONS`}
              </span>

              <div
                aria-hidden="true"
                className="bg-bsi-primary-container text-white flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Motion.article>
        </Link>
        )
      })}
    </div>
  )
}
