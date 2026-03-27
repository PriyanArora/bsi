const INFO_ITEMS = [
  {
    title: 'Technical Sales',
    description:
      'Specific requirements for Bajaj Indef products? Our engineers are available for specialized consultations.'
  },
  {
    title: 'After-Sales Support',
    description: 'Maintenance, spares, and warranty inquiries are handled by our dedicated servicing division.'
  },
  {
    title: 'Global Partnerships',
    description: 'Interested in becoming a supply partner? Connect with our procurement team directly.'
  }
]

export default function ContactInfo() {
  return (
    <section className="mt-16 mx-2 md:mt-20 md:mx-8 lg:mt-24 lg:mx-16">
      <div className="border-bsi-outline/30 grid grid-cols-1 gap-10 border-t pt-12 md:grid-cols-3 md:gap-12 md:pt-16">
        {INFO_ITEMS.map((item) => (
          <article key={item.title}>
            <h4 className="text-bsi-primary mb-2 font-bold">{item.title}</h4>
            <p className="text-bsi-secondary text-sm leading-relaxed">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
