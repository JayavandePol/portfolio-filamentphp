import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { CompaniesCarousel } from '../Components';
import { Hero, AboutPreview, FeaturedProjects, Testimonials } from '../Components/Home';

export default function Home({ projects, testimonials, companies, projectsCount = 6 }) {
    return (
        <AppLayout>
            <Head title="Home" />

            <Hero projectsCount={projectsCount} />

            <AboutPreview />

            <div className="relative z-20 border-y border-white/[0.05] bg-background/50 backdrop-blur-sm">
                <CompaniesCarousel companies={companies} />
            </div>

            <FeaturedProjects projects={projects} />

            <Testimonials testimonials={testimonials} />
        </AppLayout>
    );
}

