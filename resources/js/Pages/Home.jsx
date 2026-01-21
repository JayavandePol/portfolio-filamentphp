import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Rocket } from 'lucide-react';
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

                        {/* Responsive main hero link: text link on large screens, button on small screens */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Text link for large screens */}
                            <Link
                                href="/projects"
                                className="hidden sm:inline-flex items-center gap-2 text-electric hover:underline font-medium group"
                            >
                                View My Work
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            {/* Button for small screens */}
                            <Link
                                href="/projects"
                                className="inline-flex sm:hidden items-center gap-2 px-8 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20"
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

            {/* Companies Carousel */}
            <CompaniesCarousel companies={companies} />

            {/* About Me Section */}
            <section className="py-24 bg-gradient-to-b from-background to-card/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Welcome to My Digital Space
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Where creativity meets functionality
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-card border border-border/50 rounded-xl p-6 hover:border-electric/50 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                                    <Code2 className="w-6 h-6 text-electric" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Clean Code</h3>
                                <p className="text-sm text-muted-foreground">
                                    Writing maintainable, scalable solutions with modern best practices
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border/50 rounded-xl p-6 hover:border-electric/50 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                                    <Sparkles className="w-6 h-6 text-electric" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Design Focus</h3>
                                <p className="text-sm text-muted-foreground">
                                    Creating beautiful interfaces that users love to interact with
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-card border border-border/50 rounded-xl p-6 hover:border-electric/50 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                                    <Rocket className="w-6 h-6 text-electric" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                                <p className="text-sm text-muted-foreground">
                                    Efficient development without compromising on quality
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-card border border-border/50 rounded-2xl p-8 md:p-10"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        Let's Build Something Amazing Together
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        I'm a passionate full-stack developer specializing in Laravel and React. 
                                        With a keen eye for design and a commitment to clean code, I transform ideas 
                                        into engaging digital experiences. Whether you need a stunning portfolio, 
                                        a robust web application, or something in between, I'm here to help bring 
                                        your vision to life.
                                    </p>
                                    <Link
                                        href="/about"
                                        className="group inline-flex items-center gap-2 px-6 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20"
                                    >
                                        More About Me
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                                <div className="hidden lg:block">
                                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-electric/20 to-electric/5 border border-electric/20 flex items-center justify-center">
                                        <Code2 className="w-24 h-24 text-electric/40" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                            className="mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-0">
                                    What Clients Say
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto sm:mx-0">
                                    Feedback from amazing people I've worked with
                                </p>
                            </div>
                            {/* Desktop: purple link, Mobile: purple button */}
                            <div className="mt-6 sm:mt-0">
                                <Link
                                    href="/testimonials"
                                    className="hidden sm:inline-flex items-center gap-2 text-electric hover:underline font-medium group"
                                >
                                    View all
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/testimonials"
                                    className="inline-flex sm:hidden items-center gap-2 px-6 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20 mt-2"
                                >
                                    View all
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
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

        </AppLayout>
    );
}
