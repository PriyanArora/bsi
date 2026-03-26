import indianOilLogo from '../../assets/logos/IndianOilLogo.png'
import vardhmanLogo from '../../assets/logos/VardhmanLogo.png'
import unileverLogo from '../../assets/logos/UnileverLogo.png'
import toshibaLogo from '../../assets/logos/ToshibaLogo.png'
import thyssenkruppLogo from '../../assets/logos/ThyssenkruppLogo.png'
import nestleLogo from '../../assets/logos/NestleLogo.png'
import escortsKubotaLogo from '../../assets/logos/EscortsKubotaLogo.png'
import danoneLogo from '../../assets/logos/DanoneLogo.png'

const INDUSTRY_LOGOS = [
  { src: indianOilLogo, label: 'Indian Oil' },
  { src: vardhmanLogo, label: 'Vardhman' },
  { src: unileverLogo, label: 'Unilever' },
  { src: toshibaLogo, label: 'Toshiba' },
  { src: thyssenkruppLogo, label: 'Thyssenkrupp' },
  { src: nestleLogo, label: 'Nestle' },
  { src: escortsKubotaLogo, label: 'Escorts Kubota' },
  { src: danoneLogo, label: 'Danone' }
]

function LogoRow() {
  return INDUSTRY_LOGOS.map((item) => (
    <div key={item.label} className="flex h-16 w-36 items-center justify-center sm:h-[4.5rem] sm:w-40 lg:h-20 lg:w-44">
      <img
        src={item.src}
        alt={`${item.label} logo`}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    </div>
  ))
}

export default function LogoMarquee() {
  return (
    <section className="section-pad border-bsi-outline/30 bg-[#F4F6F9] overflow-hidden border-y">
      <div className="mx-auto mt-0 mb-9 max-w-7xl px-6 md:px-9">
        <h3 className="text-bsi-secondary text-center text-xs font-semibold uppercase tracking-[0.25em] md:text-left">
          Trusted by Industries Across the Region
        </h3>
      </div>

      <div className="flex overflow-hidden">
        <div className="animate-bsi-marquee flex min-w-max gap-8 whitespace-nowrap px-6 sm:gap-10 sm:px-8 lg:gap-14">
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-14">
            <LogoRow />
          </div>
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-14">
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  )
}
