const TESTIMONIALS = [
  {
    quote:
      'The EOT crane installation by BSI Solutionz was seamless. Their engineering team understood our headroom constraints perfectly.',
    name: 'Arun Varma',
    role: 'Plant Manager, TechMech Industries'
  },
  {
    quote:
      'Upgrading our hoists to Bajaj Indef through BSI has reduced our maintenance downtime by nearly 40%.',
    name: 'Sanjay Mehta',
    role: 'Operations Head, SteelCraft Ltd.'
  },
  {
    quote:
      'Professional approach, technical depth, and excellent post-sales support. BSI is our go-to for material handling.',
    name: 'Rahul Deshmukh',
    role: 'Procurement Manager, Global Logistics'
  }
]

export default function Testimonials() {
  return (
    <section className="bg-bsi-primary relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#dd8d00_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="font-headline mb-12 text-3xl font-bold">Trusted by Heavy Industry Leaders</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <p className="text-sm leading-relaxed italic text-slate-200">&quot;{item.quote}&quot;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-bsi-accent h-10 w-10 rounded-full" />
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
