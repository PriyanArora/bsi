import indefLogo from '../../../indef-logo.png'

const TRUST_ITEM = { imageSrc: indefLogo, label: 'Authorized Bajaj Indef Dealer' }

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#EAECF0] py-7 sm:py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 sm:gap-6 md:gap-9 md:px-8">
        <div className="flex items-center gap-3 text-base font-semibold text-[#0D1F3C] sm:text-[1.05rem]">
          <img src={TRUST_ITEM.imageSrc} alt="" aria-hidden="true" className="h-[40px] w-[40px] object-contain" />
          <span>{TRUST_ITEM.label}</span>
        </div>
      </div>
    </section>
  )
}
