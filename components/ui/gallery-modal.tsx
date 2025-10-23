"use client";

import React, { useEffect, useCallback } from "react";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';
import { getBlurDataURL } from '@/lib/cloudinary-utils';
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: GalleryModalProps) {
  const currentImage = images[currentIndex];
  const currentImageCloud = currentImage ? getCloudinaryImage(currentImage.image) : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
          break;
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goToPrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goToNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 0.8, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl max-h-[100vh] w-full mx-4 bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                    {currentIndex + 1} of {images.length}
                  </span>
                  <span className="bg-custom-primary px-2 py-1 rounded-full text-xs font-medium">
                    {currentImage.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => {
                      // Share functionality can be implemented here
                      if (navigator.share) {
                        navigator.share({
                          title: currentImage.title,
                          text: currentImage.description,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={onClose}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative flex items-center justify-center min-h-[60vh] bg-gray-100">
              <div className="relative w-full  h-[60vh] max-h-[70vh]">
                {currentImageCloud && (
                  <CldImage
                    src={currentImageCloud.publicId}
                    alt={currentImage.title}
                    width={1200}
                    height={800}
                    className="object-cover w-full h-full"
                    priority
                    quality="auto:good"
                    format="auto"
                    crop="limit"
                    gravity="auto"
                    dpr="auto"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(currentImageCloud.publicId)}
                  />
                )}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 p-0"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 p-0"
                    onClick={goToNext}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Image Info */}
            <div className="p-6 py-5 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentImage.title}
              </h2>
              <p className="text-gray-600 mb-4">{currentImage.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex gap-2 overflow-x-auto scrollbar-1 scrollbar-thumb-custom-primary scrollbar-track-custom-primary">
                  {images.map((image, index) => {
                    const thumbnailCloud = getCloudinaryImage(image.image);
                    return (
                    <button
                      key={image.id}
                      onClick={() => onNavigate(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? "border-custom-primary ring-2 ring-custom-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {thumbnailCloud && (
                        <CldImage
                          src={thumbnailCloud.publicId}
                          alt={image.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </button>
                  )})}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
