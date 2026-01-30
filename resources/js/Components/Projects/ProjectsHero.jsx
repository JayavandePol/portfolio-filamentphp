import { motion } from 'framer-motion';

export default function ProjectsHero() {
    return (
        <div className="mb-12 md:mb-16">
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="bg-gradient-to-r from-foreground via-electric to-foreground bg-clip-text text-transparent">
                    Projects
                </span>
            </motion.h1>
            <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                Explore my recent work and side projects. From web applications to design experiments.
            </motion.p>
        </div>
    );
}
