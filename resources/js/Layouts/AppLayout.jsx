import { usePage } from '@inertiajs/react';
import { FlashMessages, Navbar, Footer } from '../Components';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function AppLayout({ children }) {
    const { socialLinks = [] } = usePage().props;
    // Floating action button for scroll-to-top
    const [showScroll, setShowScroll] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowScroll(window.scrollY > 200);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <FlashMessages />
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main className="pt-16">{children}</main>
                <Footer socialLinks={socialLinks} />
            </div>
            {/* Floating Scroll-to-Top Button */}
            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-electric text-white shadow-2xl hover:bg-electric/90 transition-all duration-200 animate-bounce focus:outline-none focus:ring-2 focus:ring-electric/60"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </>
    );
}
