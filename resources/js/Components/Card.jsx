import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Card({ children, className = '', animate = true, delay = 0 }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                delay: delay,
            }
        }
    };

    const CardComponent = animate ? motion.div : 'div';

    return (
        <CardComponent
            className={cn(
                // Glassmorphism + shadow + hover
                'bg-card/70 backdrop-blur-md border border-border/50 overflow-hidden rounded-xl shadow-xl hover:shadow-2xl hover:border-electric/60 transition-all duration-300',
                'hover:scale-[1.025] active:scale-[0.98]',
                className
            )}
            variants={animate ? cardVariants : undefined}
            initial={animate ? 'hidden' : undefined}
            animate={animate ? 'visible' : undefined}
        >
            {children}
        </CardComponent>
    );
}
