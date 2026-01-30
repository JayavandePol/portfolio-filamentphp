import { ArrowRight } from 'lucide-react';
import { Button } from '../UI';
import { ProjectCard } from '../Shared';

export default function FeaturedProjects({ projects }) {
    if (!projects || projects.length === 0) return null;

    return (
        <section className="py-32 relative overflow-hidden bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-16 px-2">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A selection of recent work and experiments
                        </p>
                    </div>
                    <Button href="/projects" variant="ghost" className="hidden sm:inline-flex">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.slice(0, 3).map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                <div className="text-center sm:hidden">
                    <Button href="/projects" variant="secondary" className="w-full">
                        View All Projects
                    </Button>
                </div>
            </div>
        </section>
    );
}
