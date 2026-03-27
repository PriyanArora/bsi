import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import AboutHero from '../components/about/AboutHero'
import AboutBento from '../components/about/AboutBento'
import AboutTestimonials from '../components/about/AboutTestimonials'

export default function About({ onEnquireClick }) {
    return (
        <PageTransition>
            <Helmet>
                <title>About BSI Solutionz - Mission, Experience, and Support</title>
                <meta
                    name="description"
                    content="Learn about BSI Solutionz, an authorized Bajaj Indef dealer with 20+ years of experience delivering industrial lifting and material handling solutions."
                />
                <meta
                    name="keywords"
                    content="about BSI Solutionz, authorized dealer, industrial engineering, lifting solutions, material handling partner"
                />
                <meta property="og:title" content="About BSI Solutionz" />
                <meta
                    property="og:description"
                    content="Discover our mission, decades of engineering experience, and pan-India support network."
                />
                <meta property="og:image" content="/shared/brand-logo.png" />
            </Helmet>

            <main className="relative overflow-hidden pb-24 pt-[calc(var(--bsi-navbar-height)+2rem)]">
                <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 lg:max-w-368 xl:max-w-392">
                    <AboutHero />
                    <AboutBento onEnquireClick={onEnquireClick} />
                    <AboutTestimonials />
                </div>
            </main>
        </PageTransition>
    )
}