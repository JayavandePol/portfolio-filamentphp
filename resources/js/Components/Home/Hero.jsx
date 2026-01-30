import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, BackgroundBeams } from '../UI';

export default function Hero({ projectsCount = 6 }) {
    return (
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
    );
}
