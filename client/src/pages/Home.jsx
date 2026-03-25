import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import FeaturedProducts from '../components/home/FeaturedProducts'
import LogoMarquee from '../components/home/LogoMarquee'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
    return (
        <PageTransition>
            <Helmet>
                <title>BSI Solutionz - Authorized Bajaj Indef Dealer | Cranes & Hoists</title>
                <meta
                    name="description"
                    content="BSI Solutionz is an authorized Bajaj Indef dealer providing electric chain hoists, wire rope hoists, EOT cranes and material handling solutions across India."
                />
                <meta
                    name="keywords"
                    content="BSI Solutionz, Bajaj Indef dealer, electric chain hoist, wire rope hoist, EOT crane, material handling"
                />
                <meta property="og:title" content="BSI Solutionz - Cranes & Hoists" />
                <meta
                    property="og:description"
                    content="Premium industrial lifting solutions. Authorized Bajaj Indef Dealer."
                />
                <meta property="og:image" content="/og-home-placeholder.jpg" />
            </Helmet>

            <HeroSection />
            <div className="home-mobile-stack-order">
                <div className="home-trust-strip-slot">
                    <TrustStrip />
                </div>
                <div className="home-featured-products-slot">
                    <FeaturedProducts />
                </div>
                <div className="home-logo-marquee-slot">
                    <LogoMarquee />
                </div>
            </div>
            <WhyChooseUs />
            <Testimonials />
        </PageTransition>
    )
}