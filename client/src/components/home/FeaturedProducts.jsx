import { motion as Motion } from 'framer-motion'

const featuredProducts = [
  {
    label: 'Hoisting Systems',
    title: 'Indef Hoists',
    description:
      'From electric chain hoists and manual chain pulley blocks to wire rope hoists, we offer dependable lifting options for light, medium, and heavy duty operations across plants and warehouses.',
    mediaPlaceholder: 'placeholder'
  },
  {
    label: 'Crane Solutions',
    title: 'Indef Cranes',
    description:
      'Our Indef crane range covers single girder, double girder, underslung, gantry, semi gantry, jib, and light rail systems built for smooth and safe movement across every bay.',
    mediaPlaceholder: 'placeholder'
  },
  {
    label: 'Service Support',
    title: 'AMC care',
    description:
      'We support every installation with AMC care through annual maintenance contracts that include scheduled inspections, preventive servicing, and quick support to keep downtime low.',
    mediaPlaceholder: 'placeholder'
  },
  {
    label: 'Power Backup',
    title: 'Jakson Diesel Generators',
    description: 'placeholder (include rental generator)',
    mediaPlaceholder: 'placeholder'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8 xl:max-w-368">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-bsi-primary text-3xl font-bold sm:text-4xl">Engineered Performance</h2>
          <p className="text-bsi-secondary mt-4">Explore our flagship industrial lifting solutions</p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Motion.article
              key={product.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="border-bsi-outline/30 bg-bsi-surface-lowest group w-full max-w-xl rounded-none border p-6 shadow-sm md:max-w-none md:p-7"
            >
              <div className="bg-bsi-surface text-bsi-secondary mb-6 flex h-52 items-center justify-center rounded-none border border-slate-200 text-sm font-medium uppercase tracking-[0.08em] sm:h-56">
                {product.mediaPlaceholder}
              </div>
              <h3 className="font-headline text-bsi-primary text-xl font-bold">{product.title}</h3>
              <p className="text-bsi-secondary mt-4 text-sm leading-relaxed">{product.description}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
