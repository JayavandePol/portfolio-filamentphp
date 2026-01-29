import { Link } from '@inertiajs/react';

export default function Button({ 
    children, 
    href, 
    type = 'button', 
    variant = 'primary',
    className = '',
    as,
    ...props 
}) {
    const baseClasses = 'relative inline-flex items-center justify-center px-6 py-3 font-semibold text-sm transition-all duration-300 rounded-lg group overflow-hidden focus:outline-none focus:ring-2 focus:ring-electric/50 focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none tracking-wide font-heading';
    
    const variants = {
        primary: 'bg-electric text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.5)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:bg-electric/90 border border-transparent',
        secondary: 'bg-secondary text-foreground border border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white',
        outline: 'bg-transparent text-foreground border border-border hover:border-electric/50 hover:bg-electric/5 hover:text-white',
        ghost: 'bg-transparent text-muted-foreground hover:text-white hover:bg-white/5',
        glow: 'bg-black text-white border border-white/10 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:border-electric/50'
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    // Shine effect element
    const Shine = () => (
        <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
    );

    const InnerContent = () => (
        <>
            <Shine />
            <span className="relative z-20 flex items-center gap-2">{children}</span>
        </>
    );

    // External link
    if (as === 'a' || (href && (href.startsWith('http') || href.startsWith('mailto')))) {
        return (
            <a href={href} className={classes} {...props}>
                <InnerContent />
            </a>
        );
    }

    // Internal Inertia link
    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                <InnerContent />
            </Link>
        );
    }

    // Regular Button
    return (
        <button type={type} className={classes} {...props}>
            <InnerContent />
        </button>
    );
}
