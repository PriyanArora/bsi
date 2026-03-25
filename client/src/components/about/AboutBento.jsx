export default function AboutBento({ onEnquireClick }) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12 lg:auto-rows-[240px]">
      <article className="border-bsi-outline/30 bg-bsi-surface-lowest relative overflow-hidden rounded-xl border p-6 sm:p-8 md:col-span-4 lg:col-span-8 lg:row-span-2 lg:p-10">
        <h2 className="font-headline text-bsi-primary mb-6 text-2xl font-bold sm:text-3xl">Our Mission</h2>
        <p className="text-bsi-secondary max-w-xl text-lg leading-relaxed sm:text-xl">
          To empower industrial growth through engineered reliability. We bridge the gap between heavy-duty requirements
          and seamless execution, ensuring every facility operates at peak safety and efficiency.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <div className="bg-bsi-accent h-1 w-12" />
          <span className="text-bsi-primary text-sm font-bold uppercase tracking-[0.2em]">
            Core Values: Integrity, Precision, Safety
          </span>
        </div>
      </article>

      <article className="bg-bsi-primary-container relative rounded-xl p-6 text-center text-white md:col-span-2 lg:col-span-4 lg:p-8">
        <span className="material-symbols-outlined text-bsi-accent mb-3 text-5xl">verified</span>
        <h3 className="font-headline text-xl font-bold">Authorized Dealer</h3>
        <p className="text-bsi-on-primary-container mt-2">Bajaj Indef Material Handling</p>
      </article>

      <article className="border-bsi-outline/30 bg-bsi-surface-lowest rounded-xl border p-6 md:col-span-2 lg:col-span-4 lg:p-8">
        <div className="font-headline text-bsi-accent mb-2 text-5xl font-extrabold">20+</div>
        <div className="text-bsi-primary text-lg font-bold">Years of Experience</div>
        <p className="text-bsi-secondary mt-2 text-sm">Pioneering material handling solutions since 2004.</p>
      </article>

      <article className="border-bsi-outline/30 bg-bsi-surface-lowest rounded-xl border p-6 sm:p-8 md:col-span-6 lg:col-span-12 lg:row-span-2 lg:p-10">
        <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-headline text-bsi-primary mb-6 text-3xl font-bold">Industries We Serve</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-bsi-accent bg-bsi-surface-low rounded-lg p-2">warehouse</span>
                <div>
                  <h4 className="text-bsi-primary font-bold">Warehousing</h4>
                  <p className="text-bsi-secondary text-sm">Optimizing storage verticality and retrieval speed with precision hoists.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-bsi-accent bg-bsi-surface-low rounded-lg p-2">construction</span>
                <div>
                  <h4 className="text-bsi-primary font-bold">Construction</h4>
                  <p className="text-bsi-secondary text-sm">Heavy-duty cranes and lifting equipment for complex structural assembly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-bsi-accent bg-bsi-surface-low rounded-lg p-2">factory</span>
                <div>
                  <h4 className="text-bsi-primary font-bold">Manufacturing</h4>
                  <p className="text-bsi-secondary text-sm">Custom-engineered assembly line integration for high-volume factories.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-xl shadow-2xl sm:h-80">
            {/* TODO: replace with real client images */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzUYhPxUGcFtvKC18mIlKaFkCYJEFhhi-Zagv6t4D6yD6fnDOI9WhrXUSi7RmXGklzZuYIzIBRnAaWk8fwRWIOZRL23uat-vxZ0swSZjCZSQO6qNsAkm1FzVHy3ywhJR-adJuJXnbQ3hyG-TgDzQQKk8RbOp-DxnKmjakIl7EYKR4W9FNtWBM7wCQnv27xOv1eH2cFTMmfVadlLYp3ZYhGhdp_x-GhARq-BjafV7ZiRjZzYoOOaDgrIWE5XpWkuzaTZCAtKnXkYrej"
              alt="Modern industrial warehouse"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bsi-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Project Spotlight</p>
              <p className="font-headline text-lg font-semibold">Logistics Hub Integration</p>
            </div>
          </div>
        </div>
      </article>

      <article className="border-bsi-outline/30 bg-bsi-surface-lowest flex items-center justify-between rounded-xl border p-6 md:col-span-3 lg:col-span-6 lg:p-8">
        <div>
          <h4 className="font-headline text-bsi-primary text-xl font-bold">Pan-India Support</h4>
          <p className="text-bsi-secondary mt-1 text-sm">A robust network of technicians and service hubs.</p>
        </div>
        <span className="material-symbols-outlined text-bsi-primary text-4xl opacity-20">hub</span>
      </article>

      <button
        type="button"
        onClick={() => onEnquireClick?.()}
        className="bg-bsi-accent group flex cursor-pointer items-center justify-between rounded-xl p-6 text-left text-white md:col-span-3 lg:col-span-6 lg:p-8"
      >
        <div>
          <h4 className="font-headline text-xl font-bold">Ready for an Audit?</h4>
          <p className="mt-1 text-sm">Let our engineers evaluate your current lifting setup.</p>
        </div>
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
      </button>
    </section>
  )
}
