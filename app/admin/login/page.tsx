"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams ? searchParams.get("redirect") || "/admin" : "/admin";

  const [email, setEmail] = useState("nationalcake@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Invalid credentials. Please verify your email and password.");
        toast.error(json.error || "Authentication failed");
        return;
      }

      toast.success("Welcome back, Administrator!");
      router.push(redirectPath);
      router.refresh();
    } catch {
      setErrorMsg("Network error. Please try again.");
      toast.error("Failed to connect to authentication service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-slate-950 flex flex-col lg:flex-row text-white select-none overflow-y-auto lg:overflow-hidden">
      {/* Visual Image Side (Left on Desktop, Top Banner on Mobile) */}
      <div className="relative w-full lg:w-1/2 min-h-[260px] lg:h-full shrink-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/DSC129.jpg"
            alt="National Cake Civic Game"
            width={1600}
            height={1200}
            priority
            className="w-full h-full object-cover object-center"
          />
          {/* Deep Architectural Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        </div>

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-12 w-auto px-2 py-1 bg-black/60 border border-slate-700 backdrop-blur-sm flex items-center justify-center">
              <OptimizedImage
                src="logo-4"
                alt="National Cake Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Hero Information on Image (Hidden on very short mobile banners, visible on sm+) */}
        <div className="relative z-10 hidden sm:block space-y-3 max-w-lg mt-8 lg:mt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase tracking-widest font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Civic Intelligence & Nation-Building</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Administrative Management & Direct Content Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage live board game pricing, educational school sponsorships, media articles, and civic competition registries in real-time.
          </p>
        </div>
      </div>

      {/* Form Side (Right on Desktop) */}
      <div className="w-full lg:w-1/2 flex-1 lg:h-full overflow-y-auto flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-slate-950">
        <div className="w-full max-w-md space-y-7">
          {/* Form Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Authorization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign In to Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Administrative credentials are required to view and modify site records.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@nationalcake.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-emerald-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Security Note */}
          <div className="pt-6 border-t border-slate-800/90 flex items-center justify-between text-[11px] text-slate-500">
            <span>Protected by Supabase Auth</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
