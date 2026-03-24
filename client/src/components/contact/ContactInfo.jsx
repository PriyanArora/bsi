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
    <section className="mt-24 md:pl-24">
      <div className="border-bsi-outline/30 grid grid-cols-1 gap-12 border-t pt-16 md:grid-cols-3">
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
