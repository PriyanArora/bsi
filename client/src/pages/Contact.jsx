import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import ContactHero from '../components/contact/ContactHero'
import ContactBento from '../components/contact/ContactBento'

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
                <meta property="og:image" content="/shared/brand-logo.png" />
            </Helmet>

            <main className="relative min-h-screen overflow-hidden pb-24 pt-[calc(var(--bsi-navbar-height)+2rem)]">
                <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 lg:max-w-368 xl:max-w-392">
                    <ContactHero />
                    <ContactBento />
                </div>
            </main>
        </PageTransition>
    )
}