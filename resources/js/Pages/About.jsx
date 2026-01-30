import { Head } from '@inertiajs/react';
import '@fontsource/poppins/700.css';
import AppLayout from '../Layouts/AppLayout';
import { AboutHero, SkillsGrid, ExperienceTimeline } from '../Components/About';

export default function About({ skills = [], experiences = [] }) {
    return (
        <AppLayout>
            <Head title="About" />

            <div className="min-h-screen bg-background text-foreground">
                <AboutHero />

                <SkillsGrid skills={skills} />

                <ExperienceTimeline experiences={experiences} />
            </div>
        </AppLayout>
    );
}

