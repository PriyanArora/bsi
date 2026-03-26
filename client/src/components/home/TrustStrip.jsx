import indefLogo from '../../assets/logos/indef-logo.png'

const TRUST_ITEM = { imageSrc: indefLogo, label: 'Authorized Bajaj Indef Dealer' }

export default function TrustStrip() {
  return (
    <section className="w-full border-y border-[#C5D3E4] bg-[linear-gradient(115deg,#E4E1DA_0%,#E1DED8_46%,#DDDAD3_100%)] py-7 sm:py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 sm:gap-6 md:gap-9 md:px-8">
        <div className="flex items-center gap-3 text-base font-semibold text-[#0D1F3C] sm:text-[1.05rem]">
          <img src={TRUST_ITEM.imageSrc} alt="" aria-hidden="true" className="trust-indef-logo object-contain" />
          <span>{TRUST_ITEM.label}</span>
        </div>
      </div>
    </section>
  )
}
