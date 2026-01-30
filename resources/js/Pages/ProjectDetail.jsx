import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';
import { Badge, RichText } from '../Components';

export default function ProjectDetail({ project }) {
    const getStatusVariant = (status) => {
        const variants = {
            'published': 'success',
            'draft': 'default',
            'archived': 'warning',
            'completed': 'success',
        };
        return variants[status] || 'default';
    };

    return (
        <AppLayout>
            <Head title={project.title} />

            {/* Hero Section */}
            {project.hero_image_url && (
                <div className="relative h-96 overflow-hidden bg-secondary">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="h-full"
                    >
                        <img
                            src={project.hero_image_url}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </motion.div>
                </div>
            )}

            {/* Project Content */}
            <div className="min-h-screen py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Breadcrumb */}
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Projects
                        </Link>

                        {/* Header */}
                        <div className="mb-8 space-y-4">
                            <div className="flex items-start gap-4 flex-wrap">
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex-1">
                                    {project.title}
                                </h1>
                                {project.status && (
                                    <Badge variant={getStatusVariant(project.status)}>
                                        {project.status}
                                    </Badge>
                                )}
                            </div>

                            {project.published_at && (
                                <p className="text-muted-foreground">
                                    Published on {new Date(project.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>

                        {/* Summary */}
                        {project.summary && (
                            <div className="mb-8 p-6 bg-card border border-border/50 rounded-xl">
                                <p className="text-lg text-foreground leading-relaxed">
                                    {project.summary}
                                </p>
                            </div>
                        )}

                        {/* Full Description */}
                        {project.description && (
                            <div className="mb-12">
                                <RichText html={project.description} className="prose-lg" />
                            </div>
                        )}

                        {/* Project URL */}
                        {project.url && (
                            <div className="mt-12 pt-8 border-t border-border/50">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20"
                                >
                                    Visit Project
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}
