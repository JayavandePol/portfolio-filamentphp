import { motion } from 'framer-motion';

export default function PageTitle({ children, className = '', animate = true }) {
    if (!animate) {
        return <h1 className={`text-3xl font-bold text-gray-900 ${className}`}>{children}</h1>;
    }

    return (
        <motion.h1
            className={`text-3xl font-bold text-gray-900 ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.h1>
    );
}
