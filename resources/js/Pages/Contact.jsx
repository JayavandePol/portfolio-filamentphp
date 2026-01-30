import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '../Layouts/AppLayout';
import { ContactHero, ContactOptions, SocialConnect } from '../Components/Contact';

export default function Contact({ socialLinks = [] }) {
    return (
        <AppLayout>
            <Head title="Contact" />

            <div className="min-h-screen py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ContactHero />

                    <ContactOptions />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-muted-foreground text-sm">
                            Want to check out my work first?{' '}
                            <Link href="/projects" className="text-electric hover:underline">
                                View Projects
                            </Link>
                        </p>
                    </motion.div>

                    <SocialConnect socialLinks={socialLinks} />
                </div>
            </div>
        </AppLayout>
    );
}

