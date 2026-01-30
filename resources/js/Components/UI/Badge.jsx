import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Badge({ children, variant = 'default', className = '' }) {
    const variants = {
        default: 'bg-secondary text-muted-foreground border-border/50',
        primary: 'bg-electric/10 text-electric border-electric/20',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <motion.span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
                variants[variant],
                className
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.span>
    );
}
