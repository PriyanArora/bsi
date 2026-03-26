export default function ContactBento() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-6 md:pl-8 lg:grid-cols-12 lg:pl-24">
      <article className="border-bsi-outline/20 bg-bsi-surface-lowest rounded-xl border p-6 shadow-[0_20px_40px_rgba(0,32,69,0.02)] md:p-8 lg:col-span-7">
        <p className="text-bsi-accent text-xs font-bold uppercase tracking-[0.16em]">Contact Guidance</p>
        <h3 className="font-headline text-bsi-primary mt-2 text-3xl font-bold">Speak with BSI specialists</h3>
        <p className="text-bsi-secondary mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
          For enquiries and consultations, use the floating Enquire button available across the site. Our team will
          review your requirement and connect with you quickly.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-bsi-surface-low rounded-xl p-5">
            <p className="text-bsi-primary text-sm font-bold">Registered Office</p>
            <p className="text-bsi-secondary mt-2 text-sm leading-relaxed">
              515, Vishal Chamber, Sector-18, Noida, Gautam Buddha Nagar, U.P-201301
            </p>
          </div>
          <div className="bg-bsi-surface-low rounded-xl p-5">
            <p className="text-bsi-primary text-sm font-bold">Office Hours</p>
            <p className="text-bsi-secondary mt-2 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-5">
        <article className="bg-bsi-primary-container relative overflow-hidden rounded-xl p-8 text-white">
          <div className="relative z-10">
            <h3 className="font-headline mb-8 text-2xl font-bold">Contact Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">phone_in_talk</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Phone</p>
                  <p className="text-lg font-semibold">+91 9717897960</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">alternate_email</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Email</p>
                  <p className="text-lg font-semibold">bsisolutionz@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Address</p>
                  <p className="text-sm font-semibold leading-relaxed">515, Vishal Chamber, Sector-18, Noida, Gautam Buddha Nagar, U.P-201301</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Office Hours</p>
                  <p className="text-sm font-semibold">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm italic text-white/50">Our team typically responds within 4 business hours.</p>
          </div>
          <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </article>

        <article className="border-bsi-outline/20 bg-bsi-surface-low overflow-hidden rounded-xl border">
          <div className="bg-bsi-surface-lowest p-6">
            <h4 className="font-headline text-bsi-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-bsi-accent">location_on</span>
              Find us
            </h4>
            <p className="text-bsi-secondary mt-1 text-xs">Embed your interactive Google Map here.</p>
          </div>

          <div className="relative flex h-52 items-center justify-center bg-slate-100 sm:h-60">
            <div className="rounded-lg border border-dashed border-[#B9C4D6] px-4 py-3 text-center text-sm text-[#4A5A73]">
              Google Map Embed Placeholder
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
