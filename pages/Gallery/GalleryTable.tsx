"use client";

import React, { useState } from "react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';
import { galleryData } from "@/lib/nationalcakeData";
import { motion } from "framer-motion";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      <div className="container mx-auto px-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {galleryData.map((item: GalleryItem, index) => {
            const imageCloud = getCloudinaryImage(item.image);
            return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                {imageCloud && (
                  <CldImage
                    src={imageCloud.publicId}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    quality="auto:low"
                    format="auto"
                    crop="fill"
                    gravity="auto"
                    dpr="auto"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(imageCloud.publicId)}
                  />
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-custom-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content Overlay - Positioned at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-200 mb-3 line-clamp-2 drop-shadow-md">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium border border-white/30">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-custom-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={galleryData}
          currentIndex={currentImageIndex}
          onNavigate={navigateModal}
        />
      </div>
    </section>
  );
};
