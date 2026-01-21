import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import ProjectCard from '../Components/ProjectCard';
import { cn } from '../lib/utils';

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

    const activeCategory = categories.find(cat => cat.slug === selectedCategory);
    return (
        <AppLayout>
            <Head title="Projects" />

            <div className="min-h-screen py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 md:mb-16">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-gradient-to-r from-foreground via-electric to-foreground bg-clip-text text-transparent">
                                Projects
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-base md:text-lg text-muted-foreground max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Explore my recent work and side projects. From web applications to design experiments.
                        </motion.p>
                    </div>

                    {/* Search & Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 md:mb-12"
                    >
                        <div className="bg-card border border-border/50 rounded-2xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-background border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric/50 transition-colors"
                                    />
                                </div>

                                {/* Filter Button */}
                                {categories && categories.length > 0 && (
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className={cn(
                                            "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200",
                                            isFilterOpen || selectedCategory
                                                ? "bg-electric text-background"
                                                : "bg-background border border-border/50 text-foreground hover:border-electric/50"
                                        )}
                                    >
                                        <Filter className="w-5 h-5" />
                                        <span className="hidden sm:inline">Filter</span>
                                        {selectedCategory && (
                                            <span className="bg-background/20 px-2 py-1 rounded text-xs">
                                                1
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Active Filter Badge */}
                            {selectedCategory && activeCategory && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 flex flex-wrap items-center gap-2"
                                >
                                    <span className="text-sm text-muted-foreground">Filtered by:</span>
                                    <button
                                        onClick={clearFilter}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-electric/10 text-electric border border-electric/20 rounded-lg hover:bg-electric/20 transition-colors text-sm font-medium"
                                    >
                                        <span 
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: activeCategory.color }}
                                        />
                                        {activeCategory.name}
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {/* Category Pills */}
                            <AnimatePresence>
                                {isFilterOpen && categories && categories.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 pt-4 border-t border-border/50"
                                    >
                                        <p className="text-sm text-muted-foreground mb-3">Select a category:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onClick={() => handleCategoryFilter(category.slug)}
                                                    className={cn(
                                                        "group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                                                        selectedCategory === category.slug
                                                            ? "bg-electric text-background border-electric shadow-lg shadow-electric/20"
                                                            : "bg-background border-border/50 text-foreground hover:border-electric/50 hover:scale-105"
                                                    )}
                                                >
                                                    <span 
                                                        className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

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
