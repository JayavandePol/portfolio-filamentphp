import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ProjectFilters({
    searchQuery,
    setSearchQuery,
    isFilterOpen,
    setIsFilterOpen,
    categories,
    selectedCategory,
    handleCategoryFilter,
    clearFilter
}) {
    const activeCategory = categories.find(cat => cat.slug === selectedCategory);

    return (
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
    );
}
