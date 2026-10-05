"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, HelpCircle, ChevronDown, ChevronUp, Loader2, X, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { FaqItem } from "@/lib/supabase/types";

type FaqCategory = "general" | "agent" | "order";

export default function FaqsAdminPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("general");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    listItemsString: "",
    display_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);

  const loadFaqs = async (cat: FaqCategory) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/faqs?category=${cat}`);
      const json = await res.json();
      if (json.success && json.data) {
        setFaqs(json.data);
      }
    } catch {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs(activeCategory);
  }, [activeCategory]);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      listItemsString: "",
      display_order: faqs.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      listItemsString: faq.list_items ? faq.list_items.join("\n") : "",
      display_order: faq.display_order || 1,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in question and answer");
      return;
    }

    try {
      setIsSaving(true);
      const list_items = formData.listItemsString
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        category: activeCategory,
        question: formData.question,
        answer: formData.answer,
        list_items,
        display_order: formData.display_order,
      };

      if (editingFaq) {
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingFaq.id, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("FAQ updated");
          setFaqs((prev) =>
            prev.map((f) => (f.id === editingFaq.id ? { ...f, ...payload } : f))
          );
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("FAQ added");
          setFaqs((prev) => [...prev, json.data]);
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Creation failed");
        }
      }
    } catch {
      toast.error("An error occurred while saving FAQ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("FAQ removed");
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">FAQ Management</h1>
          <p className="text-sm text-slate-500">
            Manage questions and answers displayed across the Home, Agent, and Pre-Order pages.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setActiveCategory("general")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "general"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          General FAQs (Home)
        </button>
        <button
          onClick={() => setActiveCategory("agent")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "agent"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Become an Agent FAQs
        </button>
        <button
          onClick={() => setActiveCategory("order")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "order"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Pre-Order FAQs
        </button>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm">Loading FAQs...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="py-16 bg-white rounded-xl border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No FAQs found in this section.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                <div
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm md:text-base leading-snug">
                        {faq.question}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs text-slate-500 truncate max-w-xl mt-1">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 space-y-3">
                    <p className="leading-relaxed">{faq.answer}</p>
                    {faq.list_items && faq.list_items.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-2">
                        {faq.list_items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingFaq ? "Edit FAQ" : "Add New FAQ"} ({activeCategory.toUpperCase()})
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
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why is it called 'National Cake'?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide the explanation or answer text..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Optional Bullet Points (One item per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="1 game board&#10;4 spin pads&#10;8 race counters"
                  value={formData.listItemsString}
                  onChange={(e) =>
                    setFormData({ ...formData, listItemsString: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  <span>{editingFaq ? "Save Changes" : "Save FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
