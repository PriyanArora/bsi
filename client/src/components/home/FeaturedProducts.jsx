import { motion as Motion } from 'framer-motion'

const featuredProducts = [
  {
    label: 'Indef Excellence',
    title: 'Electric Chain Hoists',
    description: 'Precision-engineered for heavy lifting with modular design and safety brakes.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3tPCtz0fdd90YbhI0ZoPSSL4WmJtQoJPQK9y21DM-NKFfnD6kdVYa2EKT4khTiMm-B3YUl6xWPUe8ZDVyy-TDqpzU4DotXwz-8hpZgFhU1rEWHid-0XioGVYL4iRAlyjvogUYhiugFqCrZLzE6nlufVuo-zSb3CkYjhquwFBC8i8Zb8EKsHSnneV2noHL2wRHrVOrUOVRjeJP03AT97fNEnd_rQCQK8MXEs5CzlTsPSP89yCpee39oDPnGUXIQmswHR8g-j_MbCD'
  },
  {
    label: 'System Solutions',
    title: 'EOT Cranes',
    description: 'Single and double girder configurations for comprehensive facility coverage.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDL0-pOLxn9C_ftRWkB4kWROUXdITb5NvLUpLeVmm2o3AFVckYjK0C6clfPNC6-EGU1G9BhHgWZltT4899Qg1jDl6hEGULbrrzB_f1Kvyx-c8I8B3KtwJkJECUhNYnOKMRTFCZqtuEUtBMCJYWVDzItvreONtccz7IK0OCJIJy3QCmc7cZDQfXSGljzW9M3O-4-WJglw3QCIh2B8CIvTQYoiH1wHg0je3ey_rtD4orfroJYrki8NZYDpNb-ZN5-ErypULJCvtZyNp2p'
  },
  {
    label: 'Custom Design',
    title: 'Custom Gantries',
    description: 'Tailored material handling structures designed for specific workflow constraints.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgUUpjHU0FYbRlOZhSYUnsychojEK6oZ4GUW11f45kWOvHtSdVtWXnxf80hfT4JwJrHIULjeXl5a5z7e6kDAM1QH8X1CuF6_h7dHArs1VJguMi63fpPitv2L4jnTMfl3M7eagZ26Tv4CdZACALLdhmivcqdGtwH6GZXw8QdQZj6o3R5LktEqit7yH3khTETSdY3SmMb8AT8EgvofZCP_2Q263d7V3CaaMcuaRtmQMXRHVaTmmVYS4oHbFmw1MT8mXoX8rhHSpSJu-k'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-bsi-primary text-3xl font-bold sm:text-4xl">Engineered Performance</h2>
          <p className="text-bsi-secondary mt-4">Explore our flagship industrial lifting solutions</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Motion.article
              key={product.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="border-bsi-outline/30 bg-bsi-surface-lowest group rounded-2xl border p-6 shadow-sm sm:p-8"
            >
              <div className="bg-bsi-surface mb-6 h-44 overflow-hidden rounded-lg sm:h-48">
                {/* TODO: replace with real client images */}
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <span className="text-bsi-accent text-[10px] font-bold uppercase tracking-[0.2em]">{product.label}</span>
              <h3 className="font-headline text-bsi-primary mt-2 text-xl font-bold">{product.title}</h3>
              <p className="text-bsi-secondary mt-4 text-sm leading-relaxed">{product.description}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
