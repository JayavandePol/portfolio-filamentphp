import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';
import ProjectCard from '../Components/ProjectCard';
import CompaniesCarousel from '../Components/CompaniesCarousel';
import { cn } from '../lib/utils';

export default function Home({ projects, testimonials, companies }) {
    return (
        <AppLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
                            </span>
                            <span className="text-sm text-muted-foreground">Available for new projects</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
                            <span className="block text-foreground">Hi, I'm</span>
                            <span className="block bg-gradient-to-r from-foreground via-electric to-foreground bg-clip-text text-transparent">
                                Jaya van de Pol
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
                            Web Developer & Designer crafting beautiful, functional experiences that make a difference.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 px-8 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20"
                            >
                                View My Work
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/testimonials"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all duration-200 border border-border/50"
                            >
                                Testimonials
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {projects && projects.length > 0 && (
                <section className="py-24 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                    Featured Projects
                                </h2>
                                <Link
                                    href="/projects"
                                    className="hidden sm:inline-flex items-center gap-2 text-electric hover:underline font-medium group"
                                >
                                    View all
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                            <p className="text-muted-foreground max-w-2xl">
                                Some of my recent work and side projects
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {projects.slice(0, 3).map((project, index) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="text-center sm:hidden">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all duration-200 border border-border/50"
                            >
                                View All Projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Preview */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-24 bg-background border-t border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                What Clients Say
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Feedback from amazing people I've worked with
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                            {testimonials.slice(0, 2).map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border border-border/50 rounded-xl p-6 hover:border-border transition-colors"
                                >
                                    <div className="flex items-center mb-4">
                                        {testimonial.avatar_url && (
                                            <img 
                                                src={testimonial.avatar_url}
                                                alt={testimonial.author_name}
                                                className="w-12 h-12 rounded-full mr-4 border-2 border-border/50"
                                            />
                                        )}
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.author_name}</p>
                                            {testimonial.company && (
                                                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={cn(
                                                    'w-4 h-4',
                                                    i < testimonial.rating ? 'text-electric' : 'text-muted/30'
                                                )}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link
                                href="/testimonials"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all duration-200 border border-border/50"
                            >
                                View All Testimonials
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Companies Carousel */}
            <CompaniesCarousel companies={companies} />
        </AppLayout>
    );
}
