"use client";

import React, { useState, useMemo } from "react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { galleryData } from "@/lib/nationalcakeData";
import { Search, Filter, X, Tag, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import GalleryModal from "@/components/ui/gallery-modal";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
}

export default function GalleryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const itemsPerPage = 9;

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(galleryData.map(item => item.category)));
    return ["All", ...uniqueCategories];
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    galleryData.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  // Filter gallery data
  const filteredData = useMemo(() => {
    return galleryData.filter((item: GalleryItem) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => item.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Modal handlers
  const openModal = (imageIndex: number) => {
    const actualIndex = filteredData.findIndex(item => item.id === paginatedData[imageIndex].id);
    setCurrentImageIndex(actualIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-16 bg-green-50" id="gallery">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="section-title mb-4">
            Explore Our <span className="text-custom-primary">Gallery</span>
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Browse through our collection of images showcasing National Cake in action across different settings and communities.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          {/* Search and Filter Row */}
          <div className="flex flex-row gap-4 items-center justify-between mb-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 focus:border-custom-primary focus:ring-custom-primary"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              {(selectedCategory !== "All" || selectedTags.length > 0 || searchTerm) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-custom-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-custom-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-left">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} images
            {filteredData.length !== galleryData.length && ` (${galleryData.length} total)`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {paginatedData.map((item: GalleryItem, index) => {
              const imageCloud = getCloudinaryImage(item.image);
              return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                 // exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Image */}
                <div 
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  {imageCloud && (
                    <CldImage
                      src={imageCloud.publicId}
                      alt={item.title}
                      width={imageCloud.width || 400}
                      height={imageCloud.height || 300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Hover overlay with view text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                      View Image
                    </span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-custom-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current page
                const shouldShow = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                if (!shouldShow) {
                  // Show ellipsis for gaps
                  if (page === 2 && currentPage > 4) {
                    return <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>;
                  }
                  if (page === totalPages - 1 && currentPage < totalPages - 3) {
                    return <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>;
                  }
                  return null;
                }

                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 ${
                      currentPage === page 
                        ? "bg-custom-primary text-white" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={filteredData}
          currentIndex={currentImageIndex}
          onNavigate={navigateModal}
        />
      </div>
    </section>
  );
};
