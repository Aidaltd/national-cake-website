"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Award, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { AuthorityPresentationItem } from "@/lib/supabase/types";
import { resolveImageUrl } from "@/lib/cloudinary";

export default function AuthorityAdminPage() {
  const [items, setItems] = useState<AuthorityPresentationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AuthorityPresentationItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    dignitary_name: "",
    image: "",
    display_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/authority");
      const json = await res.json();
      if (json.success && json.data) {
        setItems(json.data);
      }
    } catch {
      toast.error("Failed to load authority presentations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      dignitary_name: "",
      image: "",
      display_order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AuthorityPresentationItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      dignitary_name: item.dignitary_name,
      image: item.image,
      display_order: item.display_order,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      toast.error("Title and image are required");
      return;
    }

    try {
      setIsSaving(true);
      if (editingItem) {
        const res = await fetch("/api/admin/authority", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...formData }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Authority slide updated");
          setItems((prev) =>
            prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
          );
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/admin/authority", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Authority presentation added");
          setItems((prev) => [...prev, json.data]);
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
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const res = await fetch(`/api/admin/authority?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Slide removed");
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete slide");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">VIP / Authority Presentations</h1>
          <p className="text-sm text-slate-500">
            Manage presentations to dignitaries (Fashola, Ali Baba, Aisha Augie, etc.) shown on the Home carousel.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add VIP Presentation</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm">Loading presentations...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 bg-white rounded-xl border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No presentations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-100 overflow-hidden relative">
                <img
                  src={resolveImageUrl(item.image, { width: 400 })}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.dignitary_name}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Order: {item.display_order}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingItem ? "Edit VIP Slide" : "Add VIP Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Presentation Caption / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. H.E Babatunde Raji Fashola CON, SAN"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dignitary Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Fashola"
                  value={formData.dignitary_name}
                  onChange={(e) => setFormData({ ...formData, dignitary_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Image Path / Cloudinary Public ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? "Save Changes" : "Save Presentation"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
