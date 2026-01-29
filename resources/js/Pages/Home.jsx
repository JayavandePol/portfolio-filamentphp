import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Rocket } from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';
import ProjectCard from '../Components/ProjectCard';
import CompaniesCarousel from '../Components/CompaniesCarousel';
import BackgroundBeams from '../Components/BackgroundBeams';
import Button from '../Components/Button';
import { cn } from '../lib/utils';

export default function Home({ projects, testimonials, companies, projectsCount = 6 }) {
    return (
        <AppLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                <BackgroundBeams />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-8 hover:bg-white/[0.05] transition-colors cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
                            </span>
                            <span className="text-sm text-gray-300 font-medium tracking-wide">Available for new projects</span>
                        </motion.div>

                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
                            <span className="block text-white mb-2">Creativity meets</span>
                            <span className="block text-gradient-electric drop-shadow-2xl">
                                digital execution
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            Software Development Student with a passion for crafting exceptional digital experiences.
                            I transform complex ideas into elegant, scalable solutions while continuously learning and growing in the field.
                        </p>

                        <div className="flex gap-6 justify-center items-center mb-16">
                            <Button href="/projects" variant="primary" className="text-lg px-8 py-4 shadow-electric/20">
                                View My Work <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-8">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-1">3+</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-1">{projectsCount}+</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Happy Clients</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                </motion.div>
            </section>

            {/* Companies Carousel */}
            <div className="relative z-20 border-y border-white/[0.05] bg-background/50 backdrop-blur-sm">
                <CompaniesCarousel companies={companies} />
            </div>

            {/* About Me Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Welcome to My <span className="text-gradient-premium">Digital Space</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Where creativity meets functionality to build the extraordinary.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-2xl group"
                            >
                                <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors border border-electric/20">
                                    <Code2 className="w-7 h-7 text-electric" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Clean Code</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Architecting scalable solutions with modern standards and pristine logic.
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-2xl group"
                            >
                                <div className="w-14 h-14 bg-magenta/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-magenta/20 transition-colors border border-magenta/20">
                                    <Sparkles className="w-7 h-7 text-magenta" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Premium Design</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Crafting interfaces that feel alive, responsive, and impossibly smooth.
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-2xl group"
                            >
                                <div className="w-14 h-14 bg-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan/20 transition-colors border border-cyan/20">
                                    <Rocket className="w-7 h-7 text-cyan" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">High Performance</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Optimized for speed, SEO, and delivering visible results instantly.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl border border-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-electric/10 to-cyan/10 opacity-50" />
                            <div className="glass-premium p-10 md:p-14 relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        Let's Build Something Amazing
                                    </h3>
                                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                                        I'm a passionate software development student who thrives on turning complex challenges into elegant solutions.
                                        Currently pursuing my studies in software development, I'm eager to learn and grow while building impactful digital experiences.
                                    </p>
                                    <Button href="/about" variant="primary">
                                        More About Me
                                    </Button>
                                </div>
                                <div className="hidden lg:block relative">
                                    <div className="absolute inset-0 bg-electric blur-[80px] opacity-20" />
                                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center relative backdrop-blur-sm rotate-3 hover:rotate-6 transition-transform duration-500">
                                        <Code2 className="w-24 h-24 text-white/20" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {projects && projects.length > 0 && (
                <section className="py-32 relative overflow-hidden bg-black/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-16 px-2">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Featured Projects
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    A selection of recent work and experiments
                                </p>
                            </div>
                            <Button href="/projects" variant="ghost" className="hidden sm:inline-flex">
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {projects.slice(0, 3).map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="text-center sm:hidden">
                            <Button href="/projects" variant="secondary" className="w-full">
                                View All Projects
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-32 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-electric/5 blur-[120px] rounded-full" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Client Stories
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Don't just take my word for it
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass p-8 rounded-2xl hover:bg-white/[0.04] transition-colors flex flex-col h-full"
                                >
                                    <div className="flex items-center mb-6">
                                        {testimonial.avatar_url ? (
                                            <img
                                                src={testimonial.avatar_url}
                                                alt={testimonial.author_name}
                                                className="w-14 h-14 rounded-full mr-4 border-2 border-electric/30 p-0.5 object-cover"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full mr-4 border-2 border-electric/30 bg-muted flex items-center justify-center text-xl font-bold">
                                                {testimonial.author_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-white text-lg">{testimonial.author_name}</p>
                                            {testimonial.company && (
                                                <p className="text-electric text-sm">{testimonial.company}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Sparkles
                                                key={i}
                                                className={cn(
                                                    'w-4 h-4 mr-1',
                                                    i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed italic relative flex-grow">
                                        "{testimonial.content}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </AppLayout>
    );
}
