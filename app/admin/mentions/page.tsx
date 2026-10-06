"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Newspaper, ExternalLink, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { MentionItem } from "@/lib/supabase/types";
import { resolveImageUrl } from "@/lib/cloudinary";

export default function MentionsAdminPage() {
  const [items, setItems] = useState<MentionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MentionItem | null>(null);
  const [formData, setFormData] = useState({
    outlet_name: "",
    article_url: "",
    logo_url: "",
    display_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/mentions");
      const json = await res.json();
      if (json.success && json.data) {
        setItems(json.data);
      }
    } catch {
      toast.error("Failed to load mentions");
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
      outlet_name: "",
      article_url: "",
      logo_url: "",
      display_order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MentionItem) => {
    setEditingItem(item);
    setFormData({
      outlet_name: item.outlet_name,
      article_url: item.article_url,
      logo_url: item.logo_url,
      display_order: item.display_order,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.outlet_name.trim() || !formData.article_url.trim() || !formData.logo_url.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSaving(true);
      if (editingItem) {
        const res = await fetch("/api/admin/mentions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...formData }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Mention updated");
          setItems((prev) =>
            prev.map((m) => (m.id === editingItem.id ? { ...m, ...formData } : m))
          );
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/admin/mentions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Mention added");
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
    if (!confirm("Are you sure you want to delete this press mention?")) return;

    try {
      const res = await fetch(`/api/admin/mentions?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Mention removed");
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete mention");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Press & Media Mentions</h1>
          <p className="text-sm text-slate-500">
            Manage media logos and links to news coverage (Punch, ThisDay, Nigerian Times, etc.).
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none text-sm font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Mention</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm">Loading media mentions...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 bg-white rounded-none border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No media mentions added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-none border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-16 flex items-center justify-center p-2 bg-slate-50 rounded-none border border-slate-100 mb-4">
                  <img
                    src={resolveImageUrl(item.logo_url, { width: 200 })}
                    alt={item.outlet_name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.outlet_name}</h3>
                <a
                  href={item.article_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 truncate"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.article_url}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Order: {item.display_order}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-none transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-none transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingItem ? "Edit Media Mention" : "Add Media Mention"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Media Outlet Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Punch News"
                  value={formData.outlet_name}
                  onChange={(e) => setFormData({ ...formData, outlet_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Article Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.article_url}
                  onChange={(e) => setFormData({ ...formData, article_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Logo Image (Cloudinary public ID or path) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. punch or thisday or /NGA-Logo.png"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-none border border-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
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
                  <span>{editingItem ? "Save Changes" : "Save Mention"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
