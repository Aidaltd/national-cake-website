"use client";

import { useEffect, useState, useTransition } from "react";
import { resolveImageUrl } from "@/lib/cloudinary";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Check,
  X,
  UploadCloud,
  Eye,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { GalleryItem } from "@/lib/supabase/types";

const CATEGORIES = ["All", "Education", "Community", "Gameplay", "Game Setup", "Events"];

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    category: "Community",
    tags: "",
    title: "",
    description: "",
    display_order: 1,
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
        setFormData((prev) => ({ ...prev, image: json.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(json.error || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload image file");
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch gallery items
  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const json = await res.json();
      if (json.success && json.data) {
        setItems(json.data);
      }
    } catch {
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch =
      item.image.toLowerCase().includes(query) ||
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      image: "",
      category: "Community",
      tags: "Community, Learning",
      title: "",
      description: "",
      display_order: items.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      image: item.image,
      category: item.category,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      title: item.title || "",
      description: item.description || "",
      display_order: item.display_order || 1,
      is_active: item.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      toast.error("Please enter an image path or Cloudinary ID");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingItem) {
        // Update
        const res = await fetch("/api/admin/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Gallery item updated");
          setItems((prev) =>
            prev.map((i) => (i.id === editingItem.id ? { ...i, ...payload } : i))
          );
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Gallery item added");
          setItems((prev) => [json.data, ...prev]);
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Creation failed");
        }
      }
    } catch {
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Item removed");
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery Management</h1>
          <p className="text-sm text-slate-500">
            Add, categorize, and organize photos displayed on the live /gallery page.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none text-sm font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-none border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by tag, path, or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-none border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-none text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm">Loading gallery collection...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 bg-white rounded-none border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No photos match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-xs hover:border-slate-400 transition-all group flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={resolveImageUrl(item.image, { width: 400, quality: "auto" })}
                  alt={item.title || "Gallery photo"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-slate-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-none border border-slate-700">
                  {item.category}
                </span>
                <span className="absolute top-2 right-2 bg-white text-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded-none border border-slate-300">
                  #{item.id}
                </span>
              </div>

              {/* Card Meta & Tags */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-500 truncate mb-2" title={item.image}>
                    {item.image}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-none border border-slate-200 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{item.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Order: {item.display_order || "-"}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-none transition-colors"
                      title="Edit photo"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-none transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-none max-w-lg w-full max-h-[90vh] overflow-y-auto no-scrollbar p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 border border-slate-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingItem ? "Edit Gallery Photo" : "Add New Gallery Photo"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Direct File Upload to Supabase Storage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload Image File (Supabase Storage)
                </label>
                <div className="border border-dashed border-slate-300 rounded-none p-4 text-center hover:border-emerald-500 bg-slate-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                    ) : (
                      <UploadCloud className="w-6 h-6 text-slate-400" />
                    )}
                    <p className="text-xs font-semibold text-slate-700">
                      {isUploading ? "Uploading to storage..." : "Click or drag to upload an image from your computer"}
                    </p>
                    <p className="text-[10px] text-slate-400">PNG, JPG, WEBP, AVIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold uppercase text-slate-400">or enter image path / url</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Image Source / Cloudinary Public ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /DSC110.jpg or PROJECT_GIANT_1_hbej7q"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Enter local public path (e.g. <code>/DSC100.jpg</code>) or a Cloudinary public ID.
                </p>
              </div>

              {/* Live Preview if image provided */}
              {formData.image && (
                <div className="p-2 border border-slate-200 rounded-none bg-slate-50 flex items-center gap-3">
                  <div className="w-16 h-12 bg-slate-200 rounded-none overflow-hidden shrink-0">
                    <img
                      src={resolveImageUrl(formData.image, { width: 100 })}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 truncate">
                    Preview generated via Cloudinary pipeline
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Students, Civic Education, History"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-none transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? "Save Changes" : "Add to Gallery"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
