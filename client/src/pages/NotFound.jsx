import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
    return (
        <PageTransition>
            <Helmet>
                <title>404 - Page Not Found | BSI Solutionz</title>
                <meta name="description" content="The page you requested could not be found." />
                <meta property="og:title" content="404 - Page Not Found" />
                <meta property="og:description" content="The page you requested could not be found." />
            </Helmet>

            <section className="bg-bsi-surface flex min-h-[70vh] items-center justify-center px-6 pb-16 pt-[calc(var(--bsi-navbar-height)+2rem)] text-center">
                <div className="max-w-xl">
                    <p className="font-headline text-bsi-accent text-8xl font-extrabold tracking-tight">404</p>
                    <h1 className="font-headline text-bsi-primary mt-4 text-3xl font-bold">Page not found</h1>
                    <p className="text-bsi-secondary mt-4 text-base leading-relaxed">
                        The page you are looking for does not exist or may have been moved.
                    </p>
                    <Link
                        to="/"
                        className="bg-bsi-primary mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-bsi-primary-container"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </PageTransition>
    )
}