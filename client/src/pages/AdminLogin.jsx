/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/pv2.png";

// Authorised admin usernames + shared password
const ADMIN_USERS = ["almizan", "azim", "kaif"];
const ADMIN_PASSWORD = "123123";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const name = username.trim().toLowerCase();
    if (!name || !password) {
      setError("Please enter your admin name and password.");
      return;
    }

    setLoading(true);
    // Simulate a brief auth delay for UX
    setTimeout(() => {
      if (ADMIN_USERS.includes(name) && password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminName", username.trim());
        navigate("/admin");
      } else {
        setError("Invalid admin credentials. Access denied.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #06060f, #0d0620, #060d1a)" }}>

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.12), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)" }} />
      </div>

      {/* ── Grid ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(245,158,11,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.4) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />

      {/* ── Scanning beam ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="adml-scan absolute left-0 right-0 h-[1.5px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)" }} />
      </div>

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-md adml-card rounded-3xl p-8 shadow-2xl" style={{ animation: "admlPop .6s cubic-bezier(.22,1,.36,1) both" }}>

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] rounded-t-3xl"
          style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #ef4444, transparent)" }} />

        {/* Shield Icon + brand */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-amber-500/25 adml-icon-bg">
              🔐
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
              <img src={Logo} alt="PV" className="w-3 h-3 object-contain" />
            </div>
          </div>
          <div className="text-center mt-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500/70 mb-0.5">Project-Verse</p>
            <h1 className="text-white font-extrabold text-2xl tracking-tight">Admin Access</h1>
            <p className="text-white/35 text-xs mt-1">Restricted — Authorised personnel only</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300 adml-shake">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/35 ml-1">Admin Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/60 text-base">👤</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. almizan"
                autoComplete="off"
                className="w-full adml-input rounded-xl py-3.5 pl-11 pr-4 text-sm text-white
                  placeholder:text-white/20 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/35 ml-1">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/60 text-base">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full adml-input rounded-xl py-3.5 pl-11 pr-12 text-sm text-white
                  placeholder:text-white/20 outline-none transition-all duration-200"
              />
              <button type="button" onClick={() => setShowPass((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs transition">
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white
              adml-btn mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-amber-300/30 border-t-amber-300 animate-spin" />
                Verifying credentials…
              </span>
            ) : (
              <span>Enter Admin Panel →</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button onClick={() => navigate("/login")}
            className="text-xs text-white/25 hover:text-white/50 transition flex items-center gap-1">
            ← Back to Login
          </button>
        </div>

        {/* Authorised users hint */}
        <div className="mt-5 rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3">
          <p className="text-[10px] text-amber-400/50 text-center uppercase tracking-widest mb-1">Authorised Admins</p>
          <div className="flex justify-center gap-3">
            {["Almizan", "Azim", "Kaif"].map((n) => (
              <span key={n} className="text-xs text-amber-400/70 border border-amber-500/15
                rounded-full px-3 py-0.5 bg-amber-500/8">{n}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }

        .adml-card {
          background: rgba(10, 8, 24, 0.85);
          border: 1px solid rgba(245, 158, 11, 0.15);
          backdrop-filter: blur(24px);
        }
        .adml-icon-bg {
          background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.10));
        }
        .adml-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .adml-input:focus {
          border-color: rgba(245,158,11,0.45);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.10);
        }
        .adml-btn {
          background: linear-gradient(135deg, #d97706 0%, #b45309 50%, #991b1b 100%);
          box-shadow: 0 0 0 1px rgba(245,158,11,0.3), 0 8px 28px -6px rgba(245,158,11,0.4);
        }
        .adml-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 0 1px rgba(245,158,11,0.45), 0 14px 36px -6px rgba(245,158,11,0.55);
        }
        .adml-btn:active:not(:disabled) { transform: translateY(0); }

        @keyframes admlPop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes admlScan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .adml-scan { animation: admlScan 6s linear infinite; }

        @keyframes admlShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          40%     { transform: translateX(5px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(3px); }
        }
        .adml-shake { animation: admlShake 0.4s ease; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
