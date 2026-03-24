import { motion as Motion } from 'framer-motion'

const PRODUCTS = [
  {
    title: 'Electric Chain Hoists',
    description:
      'Designed for precision lifting in medium to heavy duty workshops. Featuring dual speed options and robust mechanical brakes.',
    specLabel: 'Capacity',
    spec: '0.5 to 5.0 Tonnes',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhKu0GHPC3VcduWduc5YL-KVbmIAg2ZuWXB-K2gkWR8ZZ7UwZX_0QK5_6Z44dsNKM0lRAd7VTkCtE7cWhhCLdrtFYr1LPy0uEgB-_AT2TYmoVHbivTA9Y9rQXaCof5_5dm8tYD6qE9gYoYCpu4LUCEf4s7d92r_bhNV-zhi210LCgDwr0aKHPUkdbgdLnWRq2SRbkGRKAH6VV09fLAmXaATapiuft5yOES0NePf_WPF_NjEaGl-dklIS5BamffJAg0kHESvj_3E4o'
  },
  {
    title: 'Wire Rope Hoists',
    description:
      'The industry standard for high-volume manufacturing. Engineered for maximum headroom and extreme duty cycles.',
    specLabel: 'Capacity',
    spec: '1 to 20 Tonnes',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsJuErUFBi7tjozYldZGWv-pVIpBeytwALJ_P1jQuFUb60GcIkHaS7AsVHsEZ1dZ9n7v3US6CCPDaSbvSeLsh551OA3r9olYUX8K2-pE9hyaWKR9eAE6PFvv3TdIkA02QIuGUd36ZwvOId0Pll5a0upVD71P4jGExWKfbRJRGetFFPfJzHmi0AiuIw2qIymcOzwaH_Gf0E6bKJOEgqxrgFawN1ku0VGOz1LwjJ2k3oySLTImo27pFtNueY7CrU_jVqwJX3jHH7dbc'
  },
  {
    title: 'Manual Chain Pulley Blocks',
    description:
      'Reliable, portable lifting solutions for maintenance and localized assembly. High-strength steel construction.',
    specLabel: 'Capacity',
    spec: '0.5 to 40 Tonnes',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtMI6ELvPT2zwAYEhlJRuLv-b-JLV4F2QArT46W97gm-maxtiAN8H0jPfLnvTjd_DdhZrKCuT8Z37gSg_jd15CNEIcC9FFK_QIh-_RSL0xQvr2rmTXfA9gj5NQ841vfuyyQY3fU7ilOYb1HcQbb7cc6nd6XUifPYPkwyzSHIBkt60Ii9uSi9S3gsSQr-8tK5dHYv3jCNwpeNAWeRvh7-vxUAqvvuuaeE99O80ymYANZLLGU1Bx6L2qC9YcemzACO_ctVz71TjlJNmb'
  },
  {
    title: 'Jib Cranes',
    description:
      'Versatile material handling for individual workstations. Available in wall-mounted or floor-mounted configurations.',
    specLabel: 'Span',
    spec: 'Up to 6 Meters',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsK4d0NAg6Zkzzw1b0o42V2vNFsKzWRKZd2AhWsgCtOVn5QsiQuDQv7KLB4wKum7_p5jtiPC8ultT-LIECTsljW_QE5HkjdNu_6T4AxluThcKM4_Gjiv9iQpPtLn2US0uXNp_lKgUjnnHtcDgOExtzgxt7zCrfwNwrmVidhfzzZNxljilYJc13zwClT7lpHbvB8BfXs1_dWFUsHsi8Qo7HVv-s5qHdEaQdtLNl9nkU8Rg5bus_PSvHNVNXCkhzhe3qwEN_j5gCGH2-'
  },
  {
    title: 'EOT Cranes',
    description:
      'Complete facility-wide lifting systems with Single and Double Girder options customized for layout and load requirements.',
    specLabel: 'Capacity Range',
    spec: '1 to 100 Tonnes',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUO569QEpcz2ppUSrn_rDKab5XdGOp2c2rhjGEJG-GD-n2tQAXjcRcyVfdm0abWmvcTFu6uWRJVThreKXY9xqrM83M_vZesGlYYlQNxveGHtGdGzHSDY2tahuvF4E-ibmGG0eCuThpdH1yTSN_7QbQks5y__htahhjrMHJuOnsbydLy9x78uLiyMH5tFjPmyDSXWXPTmOxlKIRTjw_qeRLmMcGUD88nxe3ARYa4eqj_AJAqRHZxxN0lSyly16R70wVA9MczdlUcW_',
    featured: true
  }
]

export default function ProductGrid({ onEnquireClick }) {
  return (
    <div className="grid grid-cols-1 gap-8 pl-4 md:grid-cols-2 md:pl-20 lg:grid-cols-3">
      {PRODUCTS.map((product) => (
        <Motion.article
          key={product.title}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={[
            'border-bsi-outline/30 bg-bsi-surface-lowest group rounded-xl border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]',
            product.featured ? 'md:col-span-2 lg:col-span-2' : ''
          ].join(' ')}
        >
          <div className={product.featured ? 'flex flex-col gap-6 md:flex-row' : ''}>
            <div className={product.featured ? 'h-64 w-full overflow-hidden rounded-lg md:h-auto md:w-1/2' : 'mb-6 h-48 overflow-hidden rounded-lg'}>
              {/* TODO: replace with real client images */}
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>

            <div className={product.featured ? 'flex w-full flex-col md:w-1/2' : 'flex flex-col'}>
              <h3 className={product.featured ? 'font-headline text-bsi-primary mb-3 text-3xl font-bold' : 'font-headline text-bsi-primary mb-2 text-xl font-bold'}>
                {product.title}
              </h3>
              <p className={product.featured ? 'text-bsi-secondary mb-8 text-base leading-relaxed' : 'text-bsi-secondary mb-6 grow text-sm leading-relaxed'}>
                {product.description}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-bsi-secondary text-[10px] font-bold uppercase tracking-[0.2em]">{product.specLabel}</span>
                  <span className={product.featured ? 'text-bsi-primary text-xl font-bold' : 'text-bsi-primary text-sm font-semibold'}>
                    {product.spec}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onEnquireClick?.(product.title)}
                  className={product.featured ? 'bg-bsi-accent rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90' : 'bg-bsi-primary-container rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-bsi-primary'}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </Motion.article>
      ))}
    </div>
  )
}
