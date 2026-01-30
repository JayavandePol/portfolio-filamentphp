import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ProjectCard } from '../Components';
import { ProjectsHero, ProjectFilters } from '../Components/Projects';

export default function Projects({ projects, categories, selectedCategory }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleCategoryFilter = (categorySlug) => {
        if (categorySlug === selectedCategory) {
            router.get('/projects', {}, { preserveState: true, preserveScroll: true });
        } else {
            router.get('/projects', { category: categorySlug }, { preserveState: true, preserveScroll: true });
        }
        setIsFilterOpen(false);
    };

    const clearFilter = () => {
        router.get('/projects', {}, { preserveState: true, preserveScroll: true });
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Projects" />

            <div className="min-h-screen py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <ProjectsHero />

                    <ProjectFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        handleCategoryFilter={handleCategoryFilter}
                        clearFilter={clearFilter}
                    />

                    {/* Projects Grid */}
                    {filteredProjects && filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-24"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-muted-foreground text-lg">
                                {searchQuery ? 'No projects match your search.' : 'No projects available at the moment.'}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

