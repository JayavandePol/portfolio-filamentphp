import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Construction } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';

export default function Contact({ socialLinks = [] }) {
    const getIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = LucideIcons[iconName];
        return Icon ? <Icon className="w-5 h-5" /> : null;
    };
    return (
        <AppLayout>
            <Head title="Contact" />

            <div className="min-h-screen py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-16 space-y-4 text-center">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Construction className="h-4 w-4 text-electric" />
                            <span className="text-sm text-muted-foreground">Coming Soon</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Get In Touch
                        </motion.h1>
                        <motion.p
                            className="text-lg text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            I'm currently building a custom ticketing system to manage inquiries better. In the meantime, feel free to reach out directly via email.
                        </motion.p>
                    </div>

                    {/* Temporary Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border/50 rounded-xl p-8 md:p-12 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-electric/10 border border-electric/20 rounded-full mb-6">
                            <Mail className="h-8 w-8 text-electric" />
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Send me an email
                        </h2>
                        
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            For project inquiries, collaborations, or just to say hello, drop me a line at:
                        </p>

                        <a
                            href="mailto:jayavandepol@hotmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20 text-lg group"
                        >
                            jayavandepol@hotmail.com
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>

                        <div className="mt-12 pt-8 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">
                                Average response time: <span className="text-foreground font-medium">24 hours</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Additional Info */}
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

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-16"
                        >
                            <h2 className="text-2xl font-bold text-center mb-8">
                                Connect on Social Media
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="group flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 hover:border-electric/50 hover:bg-card/80 transition-all duration-300"
                                    >
                                        <div className="text-muted-foreground group-hover:text-electric transition-colors">
                                            {getIcon(social.icon)}
                                        </div>
                                        <span className="font-medium text-foreground group-hover:text-electric transition-colors">
                                            {social.platform}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
