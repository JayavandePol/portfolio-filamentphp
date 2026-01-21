import { motion } from 'framer-motion';

export default function CompaniesCarousel({ companies = [] }) {
    if (!companies || companies.length === 0) {
        return null;
    }

    console.log('Companies data:', companies);

    // Duplicate companies multiple times for seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

    return (
        <section className="py-20 bg-card/30 overflow-hidden w-full">
            <div className="container-custom mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Trusted by these companies
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        I've had the privilege of working with amazing companies and brands
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-card/30 via-card/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-card/30 via-card/20 to-transparent z-10 pointer-events-none" />

                <div className="marquee-container overflow-hidden">
                    <div className="marquee-content flex gap-12 md:gap-16 items-center">
                        {duplicatedCompanies.map((company, index) => (
                            <div
                                key={`${company.id}-${index}`}
                                className="flex-shrink-0 h-16 md:h-20 flex items-center"
                            >
                                {company.logo_url && (
                                    company.url ? (
                                        <a
                                            href={company.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block h-full"
                                        >
                                            <img
                                                src={company.logo_url}
                                                alt={company.name}
                                                className="h-full w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                                draggable="false"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={company.logo_url}
                                            alt={company.name}
                                            className="h-full w-auto object-contain opacity-50 grayscale"
                                            draggable="false"
                                        />
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .marquee-content {
                    animation: marquee ${companies.length * 5}s linear infinite;
                    width: max-content;
                }

                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .marquee-content:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
