import { usePage } from '@inertiajs/react';
import FlashMessages from '../Components/FlashMessages';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AppLayout({ children }) {
    const { socialLinks = [] } = usePage().props;

    return (
        <>
            <FlashMessages />
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main className="pt-16">{children}</main>
                <Footer socialLinks={socialLinks} />
            </div>
        </>
    );
}
