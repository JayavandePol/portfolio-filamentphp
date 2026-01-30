import { motion } from 'framer-motion';
import { Code2, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../UI';

export default function AboutPreview() {
    return (
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
    );
}
