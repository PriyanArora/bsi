const INDUSTRY_LOGOS = [
  { icon: 'precision_manufacturing', label: 'Manufacturing' },
  { icon: 'local_shipping', label: 'Logistics' },
  { icon: 'warehouse', label: 'Warehouse Solutions' },
  { icon: 'apartment', label: 'Construction Corp' },
  { icon: 'factory', label: 'Steel Works' }
]

function LogoRow() {
  return INDUSTRY_LOGOS.map((item) => (
    <div
      key={item.label}
      className="text-bsi-secondary/70 flex items-center gap-2 text-xl font-bold opacity-70 grayscale"
    >
      <span className="material-symbols-outlined text-3xl">{item.icon}</span>
      {item.label}
    </div>
  ))
}

export default function LogoMarquee() {
  return (
    <section className="section-pad border-bsi-outline/30 bg-[#F4F6F9] overflow-hidden border-y">
      <div className="mx-auto mb-8 max-w-7xl px-6 md:px-8">
        <h3 className="text-bsi-secondary text-center text-xs font-semibold uppercase tracking-[0.25em] md:text-left">
          Trusted by Industries Across the Region
        </h3>
      </div>

      <div className="flex overflow-hidden">
        <div className="animate-bsi-marquee flex min-w-max gap-10 whitespace-nowrap px-6 sm:gap-14 sm:px-8 lg:gap-20">
          <div className="flex items-center gap-10 sm:gap-14 lg:gap-20">
            <LogoRow />
          </div>
          <div className="flex items-center gap-10 sm:gap-14 lg:gap-20">
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  )
}
