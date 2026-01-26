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
    const baseClasses = 'inline-flex items-center px-4 py-2 border rounded-md font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric/60 focus:ring-offset-2 active:scale-95 relative overflow-hidden group';
    
    const variants = {
        primary: 'bg-gray-900 text-white border-transparent hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900',
        secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
        outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    // Ripple effect
    const handleRipple = (e) => {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.className = 'absolute bg-electric/30 rounded-full pointer-events-none animate-ripple';
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    };

    // External link (regular <a>)
    if (as === 'a' || (href && (href.startsWith('http') || href.startsWith('mailto')))) {
        return (
            <a href={href} className={classes} {...props} onClick={handleRipple}>
                {children}
            </a>
        );
    }

    // Internal Inertia link
    if (href) {
        return (
            <Link href={href} className={classes} {...props} onClick={handleRipple}>
                {children}
            </Link>
        );
    }

    // Button
    return (
        <button type={type} className={classes} {...props} onClick={handleRipple}>
            {children}
        </button>
    );
}
