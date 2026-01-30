import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="pt-32 pb-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-electric via-purple-400 to-electric bg-clip-text text-transparent font-['Poppins']">
                        About Me
                    </h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                            I'm a passionate software development student who thrives on turning complex challenges into elegant solutions.
                            Currently pursuing my studies in software development, I'm eager to learn and grow while building impactful digital experiences.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Started as a curious student fascinated by technology, I quickly fell in love with the power of code to solve real-world problems.
                            Currently pursuing my software development studies, I'm constantly learning new technologies and building projects that challenge me to grow.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            I believe in continuous learning and staying ahead of technology trends. Whether it's exploring the latest frameworks,
                            understanding new programming paradigms, or diving deep into best practices, I'm always eager to expand my knowledge and skills.
                        </p>

                        <h3 className="text-2xl font-bold text-white mb-4">What drives me:</h3>
                        <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
                            <li>Learning new technologies and programming languages</li>
                            <li>Building projects that solve real-world problems</li>
                            <li>Collaborating with others and sharing knowledge</li>
                            <li>Contributing to open-source projects and the developer community</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
