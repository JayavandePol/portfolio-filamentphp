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
    const baseClasses = 'inline-flex items-center px-4 py-2 border rounded-md font-semibold text-sm transition-colors duration-150';
    
    const variants = {
        primary: 'bg-gray-900 text-white border-transparent hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900',
        secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
        outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    // External link (regular <a>)
    if (as === 'a' || (href && (href.startsWith('http') || href.startsWith('mailto')))) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    // Internal Inertia link
    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    // Button
    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}
