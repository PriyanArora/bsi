import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import ContactHero from '../components/contact/ContactHero'
import ContactBento from '../components/contact/ContactBento'
import ContactInfo from '../components/contact/ContactInfo'

export default function Contact() {
    return (
        <PageTransition>
            <Helmet>
                <title>Contact BSI Solutionz - Technical Sales & Support</title>
                <meta
                    name="description"
                    content="Contact BSI Solutionz for technical sales, after-sales support, warehouse visits, and industrial lifting consultation."
                />
                <meta
                    name="keywords"
                    content="contact BSI Solutionz, technical sales, after-sales support, industrial lifting consultation"
                />
                <meta property="og:title" content="Contact BSI Solutionz" />
                <meta
                    property="og:description"
                    content="Reach our team for product consultation, support requests, and partnership opportunities."
                />
                <meta property="og:image" content="/og-contact-placeholder.jpg" />
            </Helmet>

            <main className="relative min-h-screen px-6 pb-24 pt-32 md:px-0">
                <div className="relative z-10 mx-auto max-w-6xl">
                    <ContactHero />
                    <ContactBento />
                    <ContactInfo />
                </div>
            </main>
        </PageTransition>
    )
}