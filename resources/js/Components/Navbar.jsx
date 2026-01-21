import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Status', href: 'https://status.jayavandepol.nl' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled 
                    ? 'glass border-b border-border/50' 
                    : 'bg-transparent border-b border-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-electric group-hover:to-foreground transition-all duration-300">
                            Jaya van de Pol
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {navigation.map((item) => {
                            const isActive = window.location.pathname === item.href;
                            const isExternal = item.href.startsWith('http');
                            
                            if (isExternal) {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </a>
                                );
                            }
                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                                        isActive 
                                            ? 'text-foreground' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-secondary/50 rounded-md -z-10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        
                        {/* Dashboard button for logged-in users */}
                        {auth?.user && (
                            <a
                                href="/admin"
                                className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-electric/10 text-electric rounded-md text-sm font-medium hover:bg-electric/20 transition-colors border border-electric/20"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </a>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground transition-colors p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-border/50"
                    >
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => {
                                const isActive = window.location.pathname === item.href;
                                const isExternal = item.href.startsWith('http');
                                
                                if (isExternal) {
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-2 text-base font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    );
                                }
                                
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'block px-4 py-2 text-base font-medium rounded-md transition-colors',
                                            isActive 
                                                ? 'bg-secondary text-foreground' 
                                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            
                            {/* Dashboard button for logged-in users (mobile) */}
                            {auth?.user && (
                                <a
                                    href="/admin"
                                    className="flex items-center gap-2 px-4 py-2 bg-electric/10 text-electric rounded-md text-base font-medium hover:bg-electric/20 transition-colors border border-electric/20"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
