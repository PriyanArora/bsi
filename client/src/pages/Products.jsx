import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import ProductsHero from '../components/products/ProductsHero'
import ProductGrid from '../components/products/ProductGrid'
import ProductsCTA from '../components/products/ProductsCTA'
import { JAKSON_CATEGORY_CATALOG } from '../lib/productCatalog'

export default function Products({ onEnquireClick }) {
    return (
        <PageTransition>
            <Helmet>
                <title>Products - BSI Solutionz Industrial Lifting Systems</title>
                <meta
                    name="description"
                    content="Explore BSI Solutionz product range including overhead cranes, material handling systems, electric chain hoists and wire rope hoists for industrial lifting."
                />
                <meta
                    name="keywords"
                    content="overhead cranes, material handling systems, electric chain hoist, wire rope hoist, EOT crane, industrial lifting products"
                />
                <meta property="og:title" content="BSI Solutionz Products" />
                <meta
                    property="og:description"
                    content="Discover engineered lifting products for warehouse, manufacturing and construction operations."
                />
                <meta property="og:image" content="/og-products-placeholder.png" />
            </Helmet>

            <main className="relative overflow-hidden pb-24 pt-[calc(var(--bsi-navbar-height)+2rem)]">
                <div className="mx-auto max-w-7xl px-6 md:px-8 lg:max-w-368 xl:max-w-392">
                    <ProductsHero />
                    <ProductGrid />
                    <h2 className="text-bsi-secondary relative top-9 mt-14 mb-14 px-2 text-base font-semibold tracking-[0.08em] uppercase sm:px-4 sm:text-lg md:mb-16 md:px-8 lg:mb-20 lg:px-16">
                        Jakson Diesel generators
                    </h2>
                    <ProductGrid categories={JAKSON_CATEGORY_CATALOG} showPlaceholderOnMissingImage sortCategories={false} />
                </div>
                <ProductsCTA onEnquireClick={onEnquireClick} />
            </main>
        </PageTransition>
    )
}