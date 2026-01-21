export default function Section({ children, className = '' }) {
    return (
        <section className={`py-12 sm:py-16 lg:py-20 ${className}`}>
            {children}
        </section>
    );
}
