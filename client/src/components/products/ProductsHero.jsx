export default function ProductsHero() {
  return (
    <header className="mb-16 pl-4 lg:mb-20 lg:pl-20">
      <div className="border-bsi-outline/40 bg-bsi-surface-low mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-bsi-primary">
        <span className="bg-bsi-accent h-2 w-2 rounded-full" />
        Authorized Bajaj Indef Dealer
      </div>

      <h1 className="font-headline text-bsi-primary mb-8 max-w-4xl text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">
        Precision Engineered <br />
        <span className="text-bsi-secondary">Lifting Solutions.</span>
      </h1>

      <p className="text-bsi-secondary max-w-2xl text-lg leading-relaxed">
        Elevating industrial productivity with high-performance hoists and cranes. Built for durability, safety, and
        architectural precision in heavy-duty environments.
      </p>
    </header>
  )
}
