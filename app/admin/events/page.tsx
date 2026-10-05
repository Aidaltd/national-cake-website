"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Calendar, MapPin, Users, GraduationCap, Trophy, ExternalLink, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { EventItem } from "@/lib/supabase/types";

const ICONS = ["GraduationCap", "Users", "MapPin", "Trophy"];

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "College Competition",
    icon: "GraduationCap",
    registration_link: "",
    button_text: "Join Wait List",
    status: "upcoming" as "upcoming" | "active" | "completed",
    display_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/events");
      const json = await res.json();
      if (json.success && json.data) {
        setEvents(json.data);
      }
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      tag: "Championship Tournament",
      icon: "GraduationCap",
      registration_link: "",
      button_text: "Join Wait List",
      status: "upcoming",
      display_order: events.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: EventItem) => {
    setEditingEvent(evt);
    setFormData({
      title: evt.title,
      description: evt.description,
      tag: evt.tag,
      icon: evt.icon,
      registration_link: evt.registration_link,
      button_text: evt.button_text,
      status: evt.status,
      display_order: evt.display_order,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setIsSaving(true);
      if (editingEvent) {
        const res = await fetch("/api/admin/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingEvent.id, ...formData }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Event updated");
          setEvents((prev) =>
            prev.map((e) => (e.id === editingEvent.id ? { ...e, ...formData } : e))
          );
          setIsModalOpen(false);
        } else {
          toast.error(json.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("Event created");
          setEvents((prev) => [...prev, json.data]);
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
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Event removed");
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        toast.error(json.error || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Competitions & Events</h1>
          <p className="text-sm text-slate-500">
            Manage upcoming tournaments, campus leagues, and registration waitlist links.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm">Loading competitions...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="py-16 bg-white rounded-xl border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No competitions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                    {evt.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Order: {evt.display_order}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{evt.description}</p>

                {evt.registration_link && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 truncate bg-slate-50 p-2 rounded border border-slate-100 mb-2">
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{evt.registration_link}</span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium capitalize">
                  Status: <strong>{evt.status}</strong>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(evt)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingEvent ? "Edit Competition" : "Add Competition / Event"}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Cake Inter-Campus Competition"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Registration Form Link (Google Form URL)
                </label>
                <input
                  type="url"
                  placeholder="https://forms.gle/..."
                  value={formData.registration_link}
                  onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <span>{editingEvent ? "Save Changes" : "Save Event"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
