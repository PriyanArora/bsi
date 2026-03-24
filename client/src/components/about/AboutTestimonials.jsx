const ABOUT_TESTIMONIALS = [
  {
    quote:
      'BSI Solutionz delivered a crane modernization plan that improved throughput and reduced downtime across our plant.',
    person: 'Plant Operations Lead',
  },
  {
    quote:
      'Their team combines technical depth with practical deployment support. We rely on them for every expansion phase.',
    person: 'Logistics Program Manager',
  },
]

export default function AboutTestimonials() {
  return (
    <section className="mt-16 rounded-2xl bg-bsi-primary p-8 text-white md:p-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h3 className="font-headline text-2xl font-bold md:text-3xl">Client Voice</h3>
        <span className="text-bsi-accent text-xs font-bold uppercase tracking-[0.2em]">Proof of trust</span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {ABOUT_TESTIMONIALS.map((item) => (
          <article key={item.person} className="rounded-xl border border-white/15 bg-white/5 p-5">
            {/* TODO: replace with real client content */}
            <p className="text-sm leading-relaxed text-slate-200">&quot;{item.quote}&quot;</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">{item.person}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
