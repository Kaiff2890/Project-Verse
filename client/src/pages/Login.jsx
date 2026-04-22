/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";
import { UserLogin } from "../redux/userSlice";
import { apiRequest } from "../utils";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/pv2.png";

const Login = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await apiRequest({
                method: "POST",
                url: "/auth/login",
                data,
            });
            if (res?.status === "failed") {
                setErrMsg(res);
            } else {
                setErrMsg("");
                const newData = { token: res?.token, ...res?.user };
                dispatch(UserLogin(newData));
                navigate("/");
            }
        } catch (error) {
            console.log("error in login page", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAdminLogin = () => {
        navigate("/admin-login");
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-6 animated-bg overflow-hidden transition-colors duration-700">
            {/* ── Base radial + grid overlay ── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.28),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(79,70,229,0.10),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(109,40,217,0.08),transparent_40%)] animate-gradient animate-backgroundDrift bg-transition" />
                <div className="absolute inset-0 opacity-[0.06] bg-transition" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] animate-spotlight bg-transition" />
            </div>

            {/* ── Ambient glow blobs ── */}
            <div className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-56 w-56 rounded-full bg-gradient-to-br from-slate-900/25 via-slate-700/20 to-fuchsia-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 top-24 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl animate-backgroundPulse" />
            <div className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl animate-backgroundPulseReverse" />
            <div className="pointer-events-none absolute left-1/2 bottom-0 h-48 w-80 -translate-x-1/2 rounded-full bg-violet-700/10 blur-[80px] lbg-pulse" />

            {/* ── Full-screen Circuit SVG ── */}
            <svg className="pointer-events-none absolute inset-0 w-full h-full lbg-circuit" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal rails */}
                <line x1="0" y1="120" x2="1200" y2="120" stroke="rgba(139,92,246,0.12)" strokeWidth="1"/>
                <line x1="0" y1="320" x2="1200" y2="320" stroke="rgba(34,211,238,0.10)" strokeWidth="1"/>
                <line x1="0" y1="520" x2="1200" y2="520" stroke="rgba(244,114,182,0.10)" strokeWidth="1"/>
                <line x1="0" y1="680" x2="1200" y2="680" stroke="rgba(139,92,246,0.08)" strokeWidth="1"/>
                {/* Vertical rails */}
                <line x1="140" y1="0" x2="140" y2="800" stroke="rgba(139,92,246,0.10)" strokeWidth="1"/>
                <line x1="420" y1="0" x2="420" y2="800" stroke="rgba(34,211,238,0.08)" strokeWidth="1"/>
                <line x1="760" y1="0" x2="760" y2="800" stroke="rgba(244,114,182,0.08)" strokeWidth="1"/>
                <line x1="1060" y1="0" x2="1060" y2="800" stroke="rgba(139,92,246,0.08)" strokeWidth="1"/>
                {/* Corner dots */}
                {[[140,120],[420,120],[760,120],[1060,120],[140,320],[420,320],[760,320],[1060,320],[140,520],[420,520],[760,520],[1060,520],[140,680],[420,680],[760,680],[1060,680]].map(([x,y],i)=>(
                    <circle key={i} cx={x} cy={y} r="3" fill="rgba(139,92,246,0.25)"/>
                ))}
                {/* Data pulses travelling along rails */}
                <circle r="4" fill="rgba(167,139,250,0.9)"><animateMotion dur="4s" repeatCount="indefinite" path="M0,120 L1200,120"/></circle>
                <circle r="3" fill="rgba(34,211,238,0.8)"><animateMotion dur="5.5s" repeatCount="indefinite" path="M1200,320 L0,320"/></circle>
                <circle r="4" fill="rgba(244,114,182,0.8)"><animateMotion dur="6s" repeatCount="indefinite" path="M0,520 L1200,520"/></circle>
                <circle r="3" fill="rgba(167,139,250,0.7)"><animateMotion dur="3.8s" repeatCount="indefinite" path="M140,0 L140,800"/></circle>
                <circle r="3" fill="rgba(34,211,238,0.7)"><animateMotion dur="5s" repeatCount="indefinite" path="M760,800 L760,0"/></circle>
                <circle r="4" fill="rgba(244,114,182,0.7)"><animateMotion dur="7s" repeatCount="indefinite" path="M1060,0 L1060,800"/></circle>
            </svg>

            {/* ── Scanning beam ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="lbg-scan absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            </div>

            {/* ── Orbiting neon rings ── */}
            <div className="pointer-events-none absolute" style={{ top:"8%", left:"5%" }}>
                <div className="lbg-orbit1 h-28 w-28 rounded-full border border-violet-500/20" />
                <div className="lbg-orbit2 absolute inset-3 rounded-full border border-cyan-400/15" />
            </div>
            <div className="pointer-events-none absolute" style={{ bottom:"10%", right:"4%" }}>
                <div className="lbg-orbit2 h-36 w-36 rounded-full border border-fuchsia-500/15" />
                <div className="lbg-orbit1 absolute inset-4 rounded-full border border-violet-400/10" />
            </div>
            <div className="pointer-events-none absolute" style={{ top:"42%", right:"8%" }}>
                <div className="lbg-orbit3 h-20 w-20 rounded-full border border-cyan-300/20" />
            </div>

            {/* ── Rising data-stream columns ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-end justify-around px-16">
                {[0.4,0.7,1,0.55,0.85,0.45,0.9,0.6].map((h,i)=>(
                    <div key={i} className="lbg-stream w-px" style={{
                        background: `linear-gradient(to top, ${ i%3===0 ? 'rgba(167,139,250,0.5)' : i%3===1 ? 'rgba(34,211,238,0.4)' : 'rgba(244,114,182,0.4)'}, transparent)`,
                        animationDelay:`${i*0.35}s`,
                    }}/>
                ))}
            </div>

            {/* ── Extra floating particles ── */}
            <div className="pointer-events-none absolute inset-0">
                {[
                    {top:"6%",left:"22%",c:"rgba(167,139,250,0.6)",d:"0s",s:"5px"},
                    {top:"14%",left:"68%",c:"rgba(34,211,238,0.5)",d:"1s",s:"4px"},
                    {top:"35%",left:"4%",c:"rgba(244,114,182,0.5)",d:"0.5s",s:"5px"},
                    {top:"50%",left:"94%",c:"rgba(167,139,250,0.4)",d:"1.8s",s:"4px"},
                    {top:"75%",left:"15%",c:"rgba(34,211,238,0.5)",d:"0.9s",s:"6px"},
                    {top:"88%",left:"72%",c:"rgba(244,114,182,0.4)",d:"2.2s",s:"4px"},
                    {top:"60%",left:"50%",c:"rgba(167,139,250,0.3)",d:"1.4s",s:"3px"},
                    {top:"22%",left:"88%",c:"rgba(34,211,238,0.4)",d:"0.2s",s:"5px"},
                ].map((p,i)=>(
                    <div key={i} className="absolute rounded-full login-particle" style={{
                        top:p.top, left:p.left, width:p.s, height:p.s,
                        background:p.c, boxShadow:`0 0 10px ${p.c}`, animationDelay:p.d
                    }}/>
                ))}
            </div>

            <div className="relative w-full max-w-6xl">
                <div className="relative w-full grid lg:grid-cols-2 rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#0a0a12]/80 backdrop-blur-2xl shadow-[0_32px_120px_rgba(0,0,0,0.7)] animate-cardEntrance">
                    {/* Top rainbow accent line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 opacity-80" />
                    {/* Inner glows */}
                    <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-violet-600/8 blur-[80px]" />
                    <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-500/6 blur-[80px]" />
                    <div className="p-10 sm:p-12 lg:p-14 relative flex flex-col justify-center">
                        {/* Brand */}
                        <div className="flex items-center gap-3 mb-10 animate-[fadeInUp_600ms_ease-out]">
                            <div className="relative p-2 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                                <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <div className="text-base font-bold text-white tracking-tight">Project-Verse</div>
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">AI · Projects · Community</div>
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="animate-[fadeInUp_750ms_ease-out] mb-8">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-violet-400/80 mb-3 font-medium">Welcome back</p>
                            <h1 className="text-white text-3xl sm:text-[2.4rem] font-extrabold tracking-tight leading-[1.15] mb-3">
                                Sign in to your<br/>
                                <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">workspace</span>
                            </h1>
                            <p className="text-sm text-white/45 leading-relaxed max-w-sm">
                                Access your projects, collaborate with your team, and let AI do the heavy lifting.
                            </p>
                        </div>

                        {/* Trust chips */}
                        <div className="flex flex-wrap gap-2 mb-8 animate-[fadeInUp_850ms_ease-out]">
                            {[["🟣","99.9% uptime"],["🔒","SOC-2 secure"],["⚡","Instant access"]].map(([icon,label],i)=>(
                                <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-[11px] font-medium text-white/55">
                                    <span>{icon}</span>{label}
                                </span>
                            ))}
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-4 animate-[fadeInUp_950ms_ease-out]" onSubmit={handleSubmit(onSubmit)}>
                            {errMsg && (
                                <div className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
                                    <span>⚠</span>
                                    {typeof errMsg === "string" ? errMsg : errMsg?.message || "Login failed. Please try again."}
                                </div>
                            )}

                            <TextInput
                                name="email"
                                placeholder="you@example.com"
                                label="Email address"
                                type="email"
                                register={register("email", { required: "Email is required" })}
                                styles="w-full rounded-xl !py-3.5 !px-4 bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                labelStyle="ml-1 text-white/50 text-xs font-medium uppercase tracking-wide"
                                error={errors.email ? errors.email.message : ""}
                            />

                            <TextInput
                                name="password"
                                label="Password"
                                placeholder="••••••••••••"
                                type="password"
                                register={register("password", { required: "Password is required" })}
                                styles="w-full rounded-xl !py-3.5 !px-4 bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                labelStyle="ml-1 text-white/50 text-xs font-medium uppercase tracking-wide"
                                error={errors.password ? errors.password.message : ""}
                            />

                            <div className="flex items-center justify-between">
                                <label className="inline-flex items-center gap-2 text-xs text-white/40 cursor-pointer select-none">
                                    <input type="checkbox" {...register("remember")} className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500" />
                                    Remember me
                                </label>
                                <Link to="/reset-password" className="text-xs text-violet-400 hover:text-violet-300 transition">Forgot password?</Link>
                            </div>

                            {isSubmitting ? <Loading /> : (
                                <button type="submit" className="login-btn relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white mt-1">
                                    <span className="relative z-10">Continue →</span>
                                </button>
                            )}
                        </form>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/8" />
                            <span className="text-xs text-white/25">New to Project-Verse?</span>
                            <div className="flex-1 h-px bg-white/8" />
                        </div>
                        <Link to="/register" className="mt-3 block w-full text-center rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200">
                            Create a free account
                        </Link>

                        {/* ── Admin Login ── */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/5" />
                            <span className="text-[10px] text-white/20 uppercase tracking-widest">Admin</span>
                            <div className="flex-1 h-px bg-white/5" />
                        </div>
                        <button
                            onClick={handleAdminLogin}
                            className="mt-3 relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold
                                text-white border border-amber-500/25 admin-btn transition-all duration-200
                                hover:border-amber-400/50">
                            <span className="flex items-center justify-center gap-2">
                                <span>🔐</span> Continue as Admin
                            </span>
                        </button>
                    </div>

                    {/* RIGHT PANEL — AI / Neural Network Illustration */}
                    <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#0d1127] to-[#130d28]">

                        {/* Dot grid */}
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.5) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

                        {/* Ambient blobs */}
                        <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-violet-600/20 blur-[80px]" />
                        <div className="pointer-events-none absolute bottom-0 -left-10 h-56 w-56 rounded-full bg-cyan-500/15 blur-[70px]" />
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[90px]" />

                        {/* Floating particles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[
                                { top:"12%", left:"18%", size:"5px", delay:"0s",   color:"rgba(167,139,250,0.7)" },
                                { top:"28%", left:"78%", size:"4px", delay:"1.2s", color:"rgba(34,211,238,0.6)"  },
                                { top:"55%", left:"10%", size:"6px", delay:"0.6s", color:"rgba(244,114,182,0.6)" },
                                { top:"70%", left:"85%", size:"4px", delay:"2s",   color:"rgba(167,139,250,0.5)" },
                                { top:"85%", left:"40%", size:"5px", delay:"1.5s", color:"rgba(34,211,238,0.5)"  },
                                { top:"20%", left:"55%", size:"3px", delay:"0.9s", color:"rgba(244,114,182,0.5)" },
                                { top:"42%", left:"92%", size:"4px", delay:"1.8s", color:"rgba(167,139,250,0.4)" },
                                { top:"65%", left:"32%", size:"3px", delay:"0.3s", color:"rgba(34,211,238,0.4)"  },
                            ].map((p, i) => (
                                <div key={i} className="absolute rounded-full login-particle" style={{
                                    top: p.top, left: p.left,
                                    width: p.size, height: p.size,
                                    background: p.color,
                                    boxShadow: `0 0 8px ${p.color}`,
                                    animationDelay: p.delay,
                                }} />
                            ))}
                        </div>

                        {/* Neural Network SVG */}
                        <svg className="absolute inset-0 w-full h-full login-neural" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Edges */}
                            {[
                                ["80","120","200","80"],["80","120","200","200"],["80","120","200","320"],
                                ["80","250","200","80"],["80","250","200","200"],["80","250","200","320"],
                                ["80","380","200","200"],["80","380","200","320"],
                                ["200","80","320","150"],["200","80","320","280"],
                                ["200","200","320","150"],["200","200","320","280"],["200","200","320","380"],
                                ["200","320","320","280"],["200","320","320","380"],
                            ].map(([x1,y1,x2,y2], i) => (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke="url(#edgeGrad)" strokeWidth="0.8" strokeOpacity="0.35" />
                            ))}
                            {/* Animated pulses along edges */}
                            {[
                                { path:"M80,120 L200,200", dur:"2.4s" },
                                { path:"M80,250 L200,80",  dur:"3.1s" },
                                { path:"M200,200 L320,150",dur:"2.8s" },
                                { path:"M200,320 L320,380",dur:"3.5s" },
                                { path:"M80,380 L200,320", dur:"2.1s" },
                            ].map((p, i) => (
                                <circle key={i} r="3" fill="rgba(167,139,250,0.9)">
                                    <animateMotion dur={p.dur} repeatCount="indefinite" path={p.path} />
                                </circle>
                            ))}
                            {/* Nodes — layer 1 */}
                            {[["80","120"],["80","250"],["80","380"]].map(([cx,cy],i)=>(
                                <g key={i}>
                                    <circle cx={cx} cy={cy} r="10" fill="rgba(30,27,75,0.9)" stroke="rgba(139,92,246,0.7)" strokeWidth="1.5"/>
                                    <circle cx={cx} cy={cy} r="4" fill="rgba(167,139,250,0.9)"/>
                                </g>
                            ))}
                            {/* Nodes — layer 2 */}
                            {[["200","80"],["200","200"],["200","320"]].map(([cx,cy],i)=>(
                                <g key={i}>
                                    <circle cx={cx} cy={cy} r="12" fill="rgba(15,10,50,0.9)" stroke="rgba(34,211,238,0.65)" strokeWidth="1.5"/>
                                    <circle cx={cx} cy={cy} r="5" fill="rgba(34,211,238,0.9)"/>
                                    <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="4">
                                        <animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
                                    </circle>
                                </g>
                            ))}
                            {/* Nodes — layer 3 */}
                            {[["320","150"],["320","280"],["320","380"]].map(([cx,cy],i)=>(
                                <g key={i}>
                                    <circle cx={cx} cy={cy} r="10" fill="rgba(30,10,60,0.9)" stroke="rgba(244,114,182,0.7)" strokeWidth="1.5"/>
                                    <circle cx={cx} cy={cy} r="4" fill="rgba(244,114,182,0.9)"/>
                                </g>
                            ))}
                            <defs>
                                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(139,92,246,0.6)"/>
                                    <stop offset="100%" stopColor="rgba(34,211,238,0.6)"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Holographic dashboard cards */}
                        <div className="relative z-10 flex flex-col items-center gap-4 w-full px-8">

                            {/* Title */}
                            <div className="text-center mb-2">
                                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/60 mb-1">AI Intelligence Layer</p>
                                <h3 className="text-white text-xl font-bold">Project-Verse Brain</h3>
                                <p className="text-white/50 text-xs mt-1">Powered by machine learning</p>
                            </div>

                            {/* Mini stat cards */}
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                {[
                                    { label:"Active Projects", val:"2,840", color:"from-violet-500/20 to-violet-900/10", border:"border-violet-500/20", dot:"bg-violet-400" },
                                    { label:"AI Suggestions", val:"12.4k", color:"from-cyan-500/20 to-cyan-900/10", border:"border-cyan-500/20", dot:"bg-cyan-400" },
                                    { label:"Collaborators", val:"9,310", color:"from-fuchsia-500/20 to-fuchsia-900/10", border:"border-fuchsia-500/20", dot:"bg-fuchsia-400" },
                                    { label:"Tasks Done", val:"98.2%", color:"from-emerald-500/20 to-emerald-900/10", border:"border-emerald-500/20", dot:"bg-emerald-400" },
                                ].map((c,i) => (
                                    <div key={i} className={`rounded-2xl border ${c.border} bg-gradient-to-br ${c.color} p-3 backdrop-blur-sm login-card`} style={{ animationDelay: `${i * 0.15}s` }}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                                            <span className="text-[10px] text-white/50">{c.label}</span>
                                        </div>
                                        <p className="text-white font-bold text-base">{c.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress bar card */}
                            <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 login-card" style={{ animationDelay:"0.6s" }}>
                                <div className="flex justify-between text-xs text-white/50 mb-2">
                                    <span>Model Accuracy</span><span className="text-violet-300 font-semibold">96.4%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 login-bar" />
                                </div>
                                <div className="flex justify-between text-[10px] text-white/30 mt-2">
                                    <span>Neural inference</span><span>↑ 2.1% this week</span>
                                </div>
                            </div>

                            {/* Live feed row */}
                            <div className="w-full max-w-xs flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 login-card" style={{ animationDelay:"0.75s" }}>
                                <span className="relative flex h-2.5 w-2.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <p className="text-xs text-white/60 leading-snug">AI agent just optimised <span className="text-white font-medium">Project #4821</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                * { font-family: 'Inter', system-ui, sans-serif; }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Premium login button */
                .login-btn {
                    background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #06b6d4 100%);
                    box-shadow: 0 0 0 1px rgba(109,40,217,0.4), 0 8px 32px -8px rgba(109,40,217,0.6);
                    transition: all 0.25s ease;
                }
                .login-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 0 0 1px rgba(124,58,237,0.5), 0 16px 40px -8px rgba(109,40,217,0.7);
                }
                .login-btn:active { transform: translateY(0); }
                .login-btn::after {
                    content:'';
                    position:absolute; inset:0;
                    background: linear-gradient(180deg,rgba(255,255,255,0.1),transparent);
                    border-radius: inherit;
                }

                /* Admin login button */
                .admin-btn {
                    background: linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.10) 100%);
                    box-shadow: 0 0 0 1px rgba(245,158,11,0.15), 0 6px 24px -6px rgba(245,158,11,0.25);
                }
                .admin-btn:hover {
                    background: linear-gradient(135deg, rgba(245,158,11,0.20) 0%, rgba(239,68,68,0.16) 100%);
                    box-shadow: 0 0 0 1px rgba(245,158,11,0.30), 0 12px 32px -6px rgba(245,158,11,0.35);
                    transform: translateY(-1px);
                }
                .admin-btn:active { transform: translateY(0); }
                @keyframes gradientMove {
                    0%   { transform: scale(1) translate(0,0); }
                    50%  { transform: scale(1.12) translate(-1.5%, 1.5%); }
                    100% { transform: scale(1) translate(0,0); }
                }
                @keyframes spotlightMove {
                    0%   { transform: translate(-10%, -10%); }
                    50%  { transform: translate(10%, 10%); }
                    100% { transform: translate(-10%, -10%); }
                }
                .animate-gradient { animation: gradientMove 18s ease-in-out infinite; }
                .animate-spotlight { animation: spotlightMove 22s ease-in-out infinite; }
                @keyframes backgroundDrift {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(1.5%, -1.5%) scale(1.02); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-backgroundDrift { animation: backgroundDrift 22s ease-in-out infinite; }
                .bg-transition { transition: opacity 1.2s ease-in-out, transform 1.2s ease-in-out, background 1.2s ease-in-out; }
                @keyframes cardEntrance {
                    0% { opacity: 0; transform: translateY(24px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-cardEntrance { animation: cardEntrance 0.85s cubic-bezier(0.22,1,0.36,1) both; }
                @keyframes glowPulse {
                    0%,100% { opacity: 0.95; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.01); }
                }
                .animate-glowPulse { animation: glowPulse 6.5s ease-in-out infinite; }
                @keyframes backgroundPulse {
                    0%,100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.08); opacity: 0.7; }
                }
                .animate-backgroundPulse { animation: backgroundPulse 14s ease-in-out infinite; }
                @keyframes backgroundPulseReverse {
                    0%,100% { transform: scale(1); opacity: 0.85; }
                    50% { transform: scale(0.96); opacity: 0.65; }
                }
                .animate-backgroundPulseReverse { animation: backgroundPulseReverse 16s ease-in-out infinite; }
                @keyframes animatedGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-bg {
                    background: linear-gradient(135deg, #020617, #0f172a, #111827, #1d2330);
                    background-size: 400% 400%;
                    animation: animatedGradient 18s ease infinite;
                }
                @keyframes floaty {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-10px); }
                }
                .animate-float { animation: floaty 5s ease-in-out infinite; }
                @keyframes pillA {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes pillB {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(7px); }
                }
                @keyframes pillC {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-pill1 { animation: pillA 4.6s ease-in-out infinite; }
                .animate-pill2 { animation: pillB 5.2s ease-in-out infinite; }
                .animate-pill3 { animation: pillC 4.9s ease-in-out infinite; }

                /* AI Panel — particles */
                @keyframes particleFloat {
                    0%,100% { transform: translateY(0) scale(1); opacity: 0.8; }
                    50%     { transform: translateY(-14px) scale(1.15); opacity: 1; }
                }
                .login-particle { animation: particleFloat 4s ease-in-out infinite; }

                /* AI Panel — neural svg */
                @keyframes neuralFade {
                    0%,100% { opacity: 0.55; }
                    50%     { opacity: 0.85; }
                }
                .login-neural { animation: neuralFade 6s ease-in-out infinite; }

                /* AI Panel — dashboard cards */
                @keyframes cardPop {
                    from { opacity: 0; transform: translateY(10px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .login-card { animation: cardPop 0.6s cubic-bezier(0.22,1,0.36,1) both; }

                /* AI Panel — progress bar fill */
                @keyframes barFill {
                    from { width: 0%; }
                    to   { width: 96.4%; }
                }
                .login-bar { animation: barFill 1.8s cubic-bezier(0.4,0,0.2,1) 0.8s both; }

                /* ── Background: circuit SVG breathe ── */
                @keyframes circuitBreathe {
                    0%,100% { opacity: 0.7; }
                    50%     { opacity: 1; }
                }
                .lbg-circuit { animation: circuitBreathe 8s ease-in-out infinite; }

                /* ── Background: scanning beam ── */
                @keyframes scanBeam {
                    0%   { top: -4px; opacity: 0; }
                    5%   { opacity: 1; }
                    95%  { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .lbg-scan { animation: scanBeam 7s linear infinite; }

                /* ── Background: orbiting rings ── */
                @keyframes orbit1 {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes orbit2 {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes orbit3 {
                    from { transform: rotate(0deg) scale(1); }
                    50%  { transform: rotate(180deg) scale(1.12); }
                    to   { transform: rotate(360deg) scale(1); }
                }
                .lbg-orbit1 { animation: orbit1 12s linear infinite; }
                .lbg-orbit2 { animation: orbit2 18s linear infinite; }
                .lbg-orbit3 { animation: orbit3 9s ease-in-out infinite; }

                /* ── Background: rising data streams ── */
                @keyframes streamRise {
                    0%   { height: 0;    opacity: 0; }
                    20%  { opacity: 0.7; }
                    80%  { opacity: 0.5; }
                    100% { height: 35vh; opacity: 0; }
                }
                .lbg-stream { animation: streamRise 3.5s ease-in-out infinite; }

                /* ── Background: bottom blob pulse ── */
                @keyframes lbgPulse {
                    0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
                    50%     { opacity: 1;   transform: translateX(-50%) scale(1.1); }
                }
                .lbg-pulse { animation: lbgPulse 9s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default Login;
