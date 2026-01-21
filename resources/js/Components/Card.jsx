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
                'bg-card border border-border/50 overflow-hidden rounded-xl hover:border-border transition-colors',
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
