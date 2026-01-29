import { motion } from 'framer-motion';

export default function CompaniesCarousel({ companies = [] }) {
    if (!companies || companies.length === 0) {
        return null;
    }

    // Ensure we have enough items for a smooth loop
    const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

    return (
        <section className="py-24 w-full relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent pointer-events-none" />

            <div className="container-custom mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Collaborating with forward-thinking companies to build the future.
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full overflow-hidden group">
                {/* Premium Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-16 items-center w-max"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        ease: "linear",
                        duration: 40, // Slower, silky smooth speed
                        repeat: Infinity
                    }}
                    style={{
                        willChange: "transform" // Hardware acceleration hint
                    }}
                    hover={{
                        animationPlayState: "paused" // This doesn't work directly with motion, handled below
                    }}
                >
                    {/* We render duplication twice to ensure the loop is perfect (0 to -50%) */}
                    {[...duplicatedCompanies, ...duplicatedCompanies].map((company, index) => (
                        <div
                            key={`${company.id}-${index}`}
                            className="flex-shrink-0 h-16 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 hover:scale-110 transform cursor-pointer"
                        >
                            {company.logo_url && (
                                company.url ? (
                                    <a
                                        href={company.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block h-full"
                                    >
                                        <img
                                            src={company.logo_url}
                                            alt={company.name}
                                            className="h-full w-auto object-contain"
                                            draggable="false"
                                        />
                                    </a>
                                ) : (
                                    <img
                                        src={company.logo_url}
                                        alt={company.name}
                                        className="h-full w-auto object-contain"
                                        draggable="false"
                                    />
                                )
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
