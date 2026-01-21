import { motion } from 'framer-motion';

export default function Grid({ children, cols = 3, gap = 6, className = '' }) {
    const colsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClass = `gap-${gap}`;

    return (
        <motion.div
            className={`grid ${colsClass[cols]} ${gapClass} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
