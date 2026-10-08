"use client";

import { useEffect, useState } from "react";
import { resolveImageUrl } from "@/lib/cloudinary";
import {
  X,
  Search,
  UploadCloud,
  Check,
  Loader2,
  Image as ImageIcon,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { GalleryItem } from "@/lib/supabase/types";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  currentImage?: string;
  title?: string;
}

const CATEGORIES = ["All", "Education", "Community", "Gameplay", "Game Setup", "Events"];

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentImage = "",
  title = "Select Image from Gallery",
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrl, setSelectedUrl] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState(false);

  // Load gallery items on open
  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(currentImage);
      loadGallery();
    }
  }, [isOpen, currentImage]);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const json = await res.json();
      if (json.success && json.data) {
        setItems(json.data);
      }
    } catch {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setSelectedUrl(json.url);
        toast.success("Image uploaded successfully!");
        // Switch back to gallery and refresh gallery items
        setActiveTab("gallery");
        loadGallery();
      } else {
        toast.error(json.error || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedUrl) {
      toast.error("Please select or upload an image first");
      return;
    }
    onSelect(selectedUrl);
    onClose();
  };

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch =
      item.image.toLowerCase().includes(query) ||
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="bg-white max-w-4xl w-full h-[88vh] max-h-[750px] shadow-2xl flex flex-col border border-slate-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-base sm:text-lg text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 px-5 shrink-0 bg-slate-50 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === "gallery"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Choose from Gallery ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === "upload"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload New Image
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "gallery" ? (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Search and Filters */}
            <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-2.5 items-center justify-between shrink-0 bg-white">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by tag, path, title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedCategory === cat
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={loadGallery}
                  title="Refresh items"
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-none ml-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0 bg-slate-50">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-7 h-7 animate-spin text-emerald-600 mb-2" />
                  <p className="text-xs">Loading media collection...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="py-20 text-center text-slate-400 bg-white border border-slate-200 p-8">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No images found matching criteria.</p>
                  <p className="text-xs text-slate-400 mt-1">Try another search or upload a new image above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedUrl === item.image;
                    const previewSrc = resolveImageUrl(item.image, { width: 300, quality: "auto" });

                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedUrl(item.image)}
                        className={`group relative bg-white border cursor-pointer transition-all overflow-hidden flex flex-col ${
                          isSelected
                            ? "border-emerald-600 ring-2 ring-emerald-500 shadow-md"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <div className="aspect-video bg-slate-100 overflow-hidden relative">
                          <img
                            src={previewSrc}
                            alt={item.title || "Gallery thumbnail"}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                            onError={(e) => {
                              (e.target as HTMLElement).style.opacity = "0.5";
                            }}
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-1 shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                          <div className="absolute bottom-1 left-1 bg-black/65 text-[10px] text-white px-1.5 py-0.5 font-medium backdrop-blur-xs">
                            {item.category}
                          </div>
                        </div>

                        <div className="p-2 text-left">
                          <p className="text-xs font-semibold text-slate-800 truncate" title={item.title || item.image}>
                            {item.title || item.image.split("/").pop()}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {item.image}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Direct File Upload Tab */
          <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-50">
            <div className="max-w-md w-full bg-white border border-dashed border-slate-300 p-8 text-center relative hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-3">
                {isUploading ? (
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                ) : (
                  <UploadCloud className="w-10 h-10 text-emerald-600" />
                )}
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {isUploading ? "Uploading to storage..." : "Click or drag to upload an image"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload directly to Supabase Media Storage. PNG, JPG, WEBP up to 10MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-hidden">
            {selectedUrl ? (
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 border border-slate-300 overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={resolveImageUrl(selectedUrl, { width: 80 })}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    Selected Image
                  </p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[280px]" title={selectedUrl}>
                    {selectedUrl}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No image selected</p>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedUrl}
              className="px-5 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Use Selected Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
