"use client";

import React, { useState } from "react";
import { galleryData } from "@/lib/nationalcakeData";
import OptimizedImage from "@/components/OptimizedImage";
import { resolveImageUrl } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import GalleryModal from "@/components/ui/gallery-modal";

interface GalleryItem {
  id: number;
  title?: string;
  description?: string;
  image: string;
  tags: string[];
  category: string;
}

export default function GalleryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const reversedGalleryData = [...galleryData].reverse();

  // Modal handlers
  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50" id="gallery">
      <div className="mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            National Cake <span className="text-custom-primary">Gallery</span>
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            Witness the impact of National Cake across communities, schools, and families throughout Nigeria.
          </p>
        </div>

        {/* Gallery Grid - Modern Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
          {reversedGalleryData.map((item: GalleryItem, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                className="group relative bg-white  overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(index)}
              >
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title || "Gallery image"}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    cloudinary={{ width: 800, quality: "auto" }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 z-10" />
                </div>

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-white/90 backdrop-blur-sm  p-4 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-custom-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={reversedGalleryData.map((item) => ({
            ...item,
            image: resolveImageUrl(item.image, { width: 1200, quality: "auto" }),
          }))}
          currentIndex={currentImageIndex}
          onNavigate={navigateModal}
        />
      </div>
    </section>
  );
};
