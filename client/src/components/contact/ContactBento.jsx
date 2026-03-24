export default function ContactBento() {
  return (
    <section className="grid grid-cols-1 gap-6 md:pl-24 lg:grid-cols-12">
      <article className="border-bsi-outline/20 bg-bsi-surface-lowest rounded-xl border p-8 shadow-[0_20px_40px_rgba(0,32,69,0.02)] md:p-12 lg:col-span-7">
        <p className="text-bsi-accent text-xs font-bold uppercase tracking-[0.16em]">Contact Guidance</p>
        <h3 className="font-headline text-bsi-primary mt-2 text-3xl font-bold">Speak with BSI specialists</h3>
        <p className="text-bsi-secondary mt-4 max-w-2xl leading-relaxed">
          For enquiries and consultations, use the floating Enquire button available across the site. Our team will
          review your requirement and connect with you quickly.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="bg-bsi-surface-low rounded-xl p-5">
            <p className="text-bsi-primary text-sm font-bold">Registered Office</p>
            <p className="text-bsi-secondary mt-2 text-sm leading-relaxed">
              123 Engineering Hub, Industrial Area, Phase II, Pune - 411001
            </p>
          </div>
          <div className="bg-bsi-surface-low rounded-xl p-5">
            <p className="text-bsi-primary text-sm font-bold">Office Hours</p>
            <p className="text-bsi-secondary mt-2 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p className="text-bsi-secondary text-sm">Sunday: Closed</p>
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-6 lg:col-span-5">
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
                  <p className="text-lg font-semibold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">alternate_email</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Email</p>
                  <p className="text-lg font-semibold">sales@bsisolutionz.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Address</p>
                  <p className="text-sm font-semibold leading-relaxed">123 Engineering Hub, Industrial Area, Phase II, Pune - 411001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="material-symbols-outlined text-bsi-accent">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Office Hours</p>
                  <p className="text-sm font-semibold">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm italic text-white/50">Our team typically responds within 4 business hours.</p>
          </div>
          <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </article>

        <article className="border-bsi-outline/20 bg-bsi-surface-low min-h-75 overflow-hidden rounded-xl border">
          <div className="bg-bsi-surface-lowest p-6">
            <h4 className="font-headline text-bsi-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-bsi-accent">location_on</span>
              Warehouse Location
            </h4>
            <p className="text-bsi-secondary mt-1 text-xs">Visit our main logistics hub for product demonstrations.</p>
          </div>

          <div className="relative h-60 bg-slate-200">
            {/* TODO: replace with real client images */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZz1anDcmm__HeRtNjtE6S1GBiem3o7wC_odigmzSu0qFOBXXmKr1mDT42WcSt1KztILyOsK_bCXyu7Jxbvo3D086goIu3s72UfGpoNmlIKn9euv89C2VuWRUwxnsS62C_4_Oufn4vBkO9wBU6KT7apY9HlU2RjyRaqdQm0phN4ygo8bUnK1RF-AESXRo47e9VmsiUmC8qZdY0TcT_YzKegGi0-CZbhryUSQVOO23tuW7x5Qs2vjk32LOlpdG_jFU8Prm2v4TBnZ1F"
              alt="Warehouse location map placeholder"
              loading="lazy"
              className="h-full w-full object-cover grayscale opacity-60"
            />
          </div>
        </article>
      </div>
    </section>
  )
}
