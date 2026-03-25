import { BriefcaseBusiness, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: LockKeyhole, label: 'Authorized Bajaj Indef Dealer' },
  { icon: BriefcaseBusiness, label: '10+ Years Experience' },
  { icon: MapPin, label: 'Pan-India Service' },
  { icon: ShieldCheck, label: 'ISO Certified' },
]

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#EAECF0] py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-6 md:gap-10 md:px-8">
        {TRUST_ITEMS.map((item) => {
          const ItemIcon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-2.5 text-[0.9rem] font-medium text-[#0D1F3C]">
              <ItemIcon size={18} color="#FFD100" aria-hidden="true" />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
