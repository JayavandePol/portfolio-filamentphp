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
                // Base Layout
                'relative p-6 rounded-2xl overflow-hidden group',
                // Styles
                'bg-card/40 backdrop-blur-md border border-white/[0.08]',
                // Hover Effects
                'hover:border-electric/30 transition-all duration-500',
                // Spotlight Logic (handled via CSS class now)
                'spotlight',
                className
            )}
            variants={animate ? cardVariants : undefined}
            initial={animate ? 'hidden' : undefined}
            animate={animate ? 'visible' : undefined}
        >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </CardComponent>
    );
}
