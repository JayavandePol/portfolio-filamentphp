// Framer Motion animation variants for consistent animations across the app

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const scaleOnHover = {
    rest: { scale: 1 },
    hover: { 
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
};

export const slideUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
};

export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' },
};
