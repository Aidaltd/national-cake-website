"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, DollarSign, Building, Phone, Mail, Share2, Info, Database } from "lucide-react";
import { toast } from "sonner";
import { SiteSettings } from "@/lib/supabase/types";

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    product_price: 55000,
    donation_price: 50000,
    contact_email: "info@nationalcake.ng",
    donation_email: "donation@nationalcake.ng",
    phone_primary: "+2348168378999",
    phone_secondary: "+2348036126128",
    twitter_url: "https://x.com/AlphaKultureNG",
    facebook_url: "https://web.facebook.com/alphakulture.ng",
    instagram_url: "https://www.instagram.com/alphakulture.ng",
    linkedin_url: "https://www.linkedin.com/company/alphakulture",
    bank_name: "UBA",
    account_number: "1021788685",
    account_name: "EL-SPICE MEDIA LIMITED",
    paystack_product_url: "https://paystack.com/buy/national-cake",
    paystack_donation_url: "https://paystack.com/buy/project-giant",
    banner_active: false,
    banner_text: "",
    banner_link: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (json.success && json.data) {
          setSettings(json.data);
        }
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message || "Settings updated successfully!");
      } else {
        toast.error(json.error || "Failed to update settings");
      }
    } catch {
      toast.error("An error occurred while saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
        <p className="text-sm">Loading configuration settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Site Settings & Pricing</h1>
          <p className="text-sm text-slate-500">
            Control live prices, official bank accounts, contact channels, and global banner alerts.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors shrink-0"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Pricing Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-slate-900">Product & Donation Pricing (₦ NGN)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Standard Retail Box Price (₦)
            </label>
            <input
              type="number"
              value={settings.product_price}
              onChange={(e) => setSettings({ ...settings, product_price: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Displayed on /order</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Project GIANT School Donation Box Price (₦)
            </label>
            <input
              type="number"
              value={settings.donation_price}
              onChange={(e) => setSettings({ ...settings, donation_price: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Displayed on /donate-to-schools</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paystack Order Link
            </label>
            <input
              type="url"
              value={settings.paystack_product_url}
              onChange={(e) => setSettings({ ...settings, paystack_product_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paystack School Donation Link
            </label>
            <input
              type="url"
              value={settings.paystack_donation_url}
              onChange={(e) => setSettings({ ...settings, paystack_donation_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Official Bank Account Information */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Building className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-slate-900">Official Donation Bank Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Bank Name
            </label>
            <input
              type="text"
              value={settings.bank_name}
              onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={settings.account_number}
              onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Account Name
            </label>
            <input
              type="text"
              value={settings.account_name}
              onChange={(e) => setSettings({ ...settings, account_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Phone className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-slate-900">Contact Channels & Social Media</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Primary Phone Number
            </label>
            <input
              type="text"
              value={settings.phone_primary}
              onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Secondary Phone Number
            </label>
            <input
              type="text"
              value={settings.phone_secondary}
              onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Donations Email
            </label>
            <input
              type="email"
              value={settings.donation_email}
              onChange={(e) => setSettings({ ...settings, donation_email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">X (Twitter)</label>
            <input
              type="url"
              value={settings.twitter_url}
              onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Facebook</label>
            <input
              type="url"
              value={settings.facebook_url}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Instagram</label>
            <input
              type="url"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">LinkedIn</label>
            <input
              type="url"
              value={settings.linkedin_url}
              onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Supabase Connection Setup Box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base text-white">How to connect Supabase</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          1. Create a free project at <a href="https://supabase.com" target="_blank" className="text-emerald-400 underline">supabase.com</a>.<br />
          2. Open the <strong>SQL Editor</strong> in your Supabase dashboard and run the code from <code>supabase/schema.sql</code> and <code>supabase/seed.sql</code>.<br />
          3. Copy your <strong>Project URL</strong> and <strong>anon public key</strong> into your <code>.env.local</code> file.<br />
          4. All edits made in this admin panel will immediately persist to your live cloud database!
        </p>
      </div>
    </form>
  );
}
