/** @format */

import React, { useState, useEffect } from "react";
import Logo from "../assets/pv2.png";

const Badge = ({ children }) => (
	<span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white/60 tracking-wide">
		{children}
	</span>
);

const Card = ({ title, desc, icon }) => (
	<div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d1a] p-6 shadow-[0_2px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/25 hover:shadow-[0_8px_40px_rgba(109,40,217,0.15)]">
		<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		<div className="relative flex items-start gap-4">
			<div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg transition group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
				{icon}
			</div>
			<div>
				<h3 className="text-sm font-semibold text-white">{title}</h3>
				<p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{desc}</p>
			</div>
		</div>
	</div>
);

const Stat = ({ label, value }) => (
	<div className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d1a] p-5 shadow-[0_2px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/25">
		<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500/50 via-cyan-400/50 to-fuchsia-500/50" />
		<div className="text-2xl font-bold text-white tracking-tight">{value}</div>
		<div className="mt-1.5 text-xs text-white/40 font-medium uppercase tracking-wide">{label}</div>
	</div>
);

const words = ["collaborate", "innovate", "connect", "design"];

export default function Dashboard() {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const word = words[currentWordIndex];
		
		const timeout = setTimeout(() => {
			if (!isDeleting) {
				setCurrentText(word.substring(0, currentText.length + 1));
				if (currentText.length === word.length) {
					setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
				}
			} else {
				setCurrentText(word.substring(0, currentText.length - 1));
				if (currentText.length === 0) {
					setIsDeleting(false);
					setCurrentWordIndex((prev) => (prev + 1) % words.length);
				}
			}
		}, isDeleting ? 50 : 100);

		return () => clearTimeout(timeout);
	}, [currentText, isDeleting, currentWordIndex]);

	return (
		<div className="min-h-screen bg-[#06060f] text-white" style={{fontFamily:"'Inter',system-ui,sans-serif"}}>
			{/* ── Animated background ── */}
			<div className="pointer-events-none fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_10%,rgba(109,40,217,0.14),transparent),radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(6,182,212,0.10),transparent),radial-gradient(ellipse_70%_60%_at_50%_90%,rgba(217,70,239,0.08),transparent)] animate-gradient" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_65%)] animate-spotlight" />
				<div className="absolute inset-0 opacity-[0.045]" style={{backgroundImage:`linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)`,backgroundSize:"48px 48px"}} />
				{/* Scanning beam */}
				<div className="overflow-hidden absolute inset-0">
					<div className="db-scan absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
				</div>
				{/* Ambient blobs */}
				<div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-700/10 blur-[100px]" />
				<div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-600/8 blur-[100px]" />
			</div>

			{/* ── Navbar ── */}
			<header className="relative z-10 border-b border-white/[0.06] bg-[#06060f]/80 backdrop-blur-xl">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
					<div className="flex items-center gap-3">
						<div className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden">
							<img src={Logo} alt="ProjectVerse Logo" className="w-full h-full object-cover relative z-10 p-1" />
							<span className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-cyan-400/20 blur-md" />
						</div>
						<div>
							<div className="text-sm font-bold text-white tracking-tight">Project Verse</div>
							<div className="text-[10px] text-white/35 uppercase tracking-[0.2em]">AI · Social · Projects</div>
						</div>
					</div>

					<nav className="hidden items-center gap-1 text-sm text-white/50 md:flex">
						{["Features","Post Types","How it works","Tech"].map((item,i)=>(
							<a key={i} href={`#${["features","posts","how","stack"][i]}`}
								className="px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200">{item}</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<a href="/login" className="px-4 py-2 text-sm font-medium text-white/60 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white transition-all duration-200">Log in</a>
						<a href="/register" className="db-cta px-4 py-2 text-sm font-semibold text-white rounded-xl">Get started →</a>
					</div>
				</div>
			</header>

			{/* ── Hero ── */}
			<section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16">
				<div className="grid items-center gap-12 md:grid-cols-2">
					<div>
						{/* Label */}
						<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
							<span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
							<span className="text-[11px] font-medium text-violet-300 uppercase tracking-wider">AI-powered · Real-time · Open</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
							<span className="text-white">Build, share &amp;</span><br/>
							<span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent relative">
								{currentText}
								<span className="absolute -right-3 top-0 animate-pulse text-white">|</span>
							</span>
							<br/><span className="text-white">with AI.</span>
						</h1>

						<p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/45">
							Post updates, publish project demos, generate captions, chat in real-time, and get AI-powered writing assistance — all in one platform.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<a href="/register" className="db-cta px-6 py-3 text-sm font-semibold text-white rounded-xl">Start for free →</a>
							<a href="/login" className="px-6 py-3 text-sm font-medium text-white/60 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white transition-all duration-200">Sign in</a>
						</div>

						<div className="mt-8 grid grid-cols-3 gap-3">
							<Stat value="MFA" label="Email verification" />
							<Stat value="Live" label="Real-time chat" />
							<Stat value="AI" label="Content assist" />
						</div>

						<div className="mt-6 flex flex-wrap gap-2">
							{["JWT + MFA","WebSockets","Gemini AI","MongoDB"].map(t=>(
								<Badge key={t}>{t}</Badge>
							))}
						</div>
					</div>

					{/* ── Live Animated Dashboard Graphic ── */}
					<div className="relative animate-[fadeInUp_900ms_ease-out] perspective-1000 mt-10 md:mt-0">
						<div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#0d0d1a]/80 backdrop-blur-xl shadow-[0_35px_120px_rgba(15,23,42,0.4)] transform-gpu hover:rotate-y-[-2deg] hover:rotate-x-[2deg] transition-transform duration-700">
							
							{/* Animated gradient background blob */}
							<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-r from-violet-600/30 via-cyan-400/20 to-fuchsia-500/30 blur-[80px] animate-pulse" />
							<div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-600/20 via-violet-500/20 to-fuchsia-500/20 blur-[80px] animate-pulse" style={{animationDelay: '1s'}} />
							
							{/* Animated WebSockets SVG grid */}
							<svg className="absolute inset-0 w-full h-full db-neural" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M50 100 L200 150 L350 100 L200 50 Z" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" />
								<path d="M50 300 L200 250 L350 300 L200 350 Z" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" />
								<path d="M200 150 L200 250" stroke="rgba(244,114,182,0.2)" strokeWidth="1.5" />
								<circle r="4" fill="rgba(167,139,250,0.9)"><animateMotion dur="3s" repeatCount="indefinite" path="M50 100 L200 150 L200 250 L350 300" /></circle>
								<circle r="4" fill="rgba(34,211,238,0.9)"><animateMotion dur="4s" repeatCount="indefinite" path="M350 100 L200 150 L50 100" /></circle>
								<circle r="4" fill="rgba(244,114,182,0.9)"><animateMotion dur="2.5s" repeatCount="indefinite" path="M50 300 L200 250 L200 150 L350 100" /></circle>
								{[ [50,100], [200,150], [350,100], [200,50], [50,300], [200,250], [350,300], [200,350] ].map(([cx,cy],i)=>(
									<circle key={i} cx={cx} cy={cy} r="6" fill="rgba(30,27,75,0.9)" stroke="rgba(167,139,250,0.5)" strokeWidth="2" />
								))}
							</svg>

							<div className="relative p-8">
								<div className="flex items-center justify-between mb-8">
									<div className="flex items-center gap-2">
										<span className="relative flex h-3 w-3">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
										</span>
										<div className="text-sm font-semibold text-white">Live Workspace</div>
									</div>
									<div className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] text-white/60">Auto-sync ON</div>
								</div>

								{/* Simulated feed card */}
								<div className="relative z-10 space-y-4">
									<div className="animate-float-slow rounded-2xl border border-white/[0.08] bg-[#0a0a15]/90 p-5 shadow-2xl backdrop-blur-md">
										<div className="flex items-center gap-3 mb-4">
											<div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-[2px]">
												<div className="h-full w-full rounded-full bg-[#0a0a15]" />
											</div>
											<div>
												<div className="h-2 w-24 rounded bg-white/20 mb-2 animate-pulse" />
												<div className="h-1.5 w-16 rounded bg-white/10" />
											</div>
										</div>
										<div className="space-y-2 mb-4">
											<div className="h-2 w-full rounded bg-white/10" />
											<div className="h-2 w-4/5 rounded bg-white/10" />
										</div>
										
										{/* Interactive elements */}
										<div className="flex gap-2">
											<div className="h-6 w-16 rounded-full bg-violet-500/20 border border-violet-500/30" />
											<div className="h-6 w-16 rounded-full bg-white/5 border border-white/10" />
										</div>
									</div>

									{/* AI Assistant popover - animates in and out */}
									<div className="absolute -right-4 md:-right-10 top-16 w-56 animate-float-fast rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#06060f]/95 to-[#0d1b2a]/95 p-4 shadow-[0_10px_40px_rgba(34,211,238,0.2)] backdrop-blur-xl z-30">
										<div className="flex items-center gap-2 mb-2">
											<span className="text-lg">✨</span>
											<span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wide">AI Assistant</span>
										</div>
										<div className="text-[13px] text-white/80 leading-relaxed min-h-[40px]">
											<span className="type-writer overflow-hidden whitespace-nowrap block" style={{width: '0%', animationFillMode: 'forwards'}}>"I've generated a </span>
											<span className="type-writer overflow-hidden whitespace-nowrap block" style={{width: '0%', animationDelay: '1s', animationFillMode: 'forwards'}}>project summary...</span>
										</div>
										<div className="mt-3 flex gap-2">
											<button className="flex-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 py-1.5 text-[10px] font-medium text-cyan-200 hover:bg-cyan-500/30 transition">Apply</button>
											<button className="flex-1 rounded-lg bg-white/5 border border-white/10 py-1.5 text-[10px] font-medium text-white/60 hover:bg-white/10 transition">Dismiss</button>
										</div>
									</div>

									{/* Live collaboration cursor */}
									<div className="absolute left-1/3 bottom-12 z-20 animate-cursor-move">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
											<path d="M5.65376 21.3112L4.01186 2.68884C3.8966 1.38138 5.25754 0.449646 6.42598 1.03714L21.4646 8.59993C22.6468 9.19451 22.5695 10.9008 21.3275 11.373L14.7335 13.8814C14.2831 14.0526 13.9103 14.3986 13.705 14.84L10.932 20.8037C10.3704 22.0115 8.58309 21.8413 8.30756 20.551L7.54573 17.0655L5.65376 21.3112Z" fill="#F472B6" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
										</svg>
										<div className="ml-4 mt-1 rounded-full bg-pink-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-lg inline-block whitespace-nowrap">Alex</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
            </section>

			{/* ── Post Types ── */}
			<section id="posts" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
				<div className="mb-10">
					<p className="text-[11px] uppercase tracking-[0.22em] text-violet-400/70 mb-2 font-medium">Sharing</p>
					<h2 className="text-2xl font-bold text-white">Two ways to share</h2>
					<p className="mt-2 max-w-lg text-sm text-white/40 leading-relaxed">
						Normal posts for everyday sharing — and Project Posts for demos, builds, and progress updates.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					<Card title="Normal Post" desc="Share updates like a typical social platform: media, likes, comments, replies — fast and familiar." icon="📝" />
					<Card title="Project Post" desc="Structured posts for showcasing a project: goal, tech stack, links, screenshots, milestones — perfect for demos." icon="🚀" />
				</div>
			</section>

			{/* ── Features ── */}
			<section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
				<div className="mb-10">
					<p className="text-[11px] uppercase tracking-[0.22em] text-cyan-400/70 mb-2 font-medium">Intelligence</p>
					<h2 className="text-2xl font-bold text-white">AI features that actually help</h2>
					<p className="mt-2 max-w-lg text-sm text-white/40 leading-relaxed">Tools that reduce typing, improve quality, and keep the platform moving.</p>
				</div>
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					<Card title="Caption Generator" desc="Generate strong captions from your post content in one click." icon="✨" />
					<Card title="Comment Generator" desc="Get relevant comment suggestions to boost engagement." icon="💬" />
					<Card title="Smart Replies" desc="AI reply suggestions for faster conversations and threads." icon="⚡" />
					<Card title="Post Summaries" desc="Summarize long descriptions into clear highlights." icon="🧾" />
					<Card title="AI Help Desk" desc="Ask about features, issues, or usage — get instant guidance." icon="🛟" />
					<Card title="Real-time Chat" desc="Live messaging with WebSocket-based sync." icon="📡" />
				</div>
			</section>

			{/* ── How it works ── */}
			<section id="how" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
				<div className="mb-10">
					<p className="text-[11px] uppercase tracking-[0.22em] text-fuchsia-400/70 mb-2 font-medium">Process</p>
					<h2 className="text-2xl font-bold text-white">How it works</h2>
					<p className="mt-2 max-w-lg text-sm text-white/40 leading-relaxed">Secure auth + real-time communication + AI-assisted content.</p>
				</div>
				<div className="grid gap-3 md:grid-cols-4">
					<Card title="1. Register" desc="Create your account." icon="🧑‍💻" />
					<Card title="2. Verify Email" desc="MFA email verification for security." icon="🔒" />
					<Card title="3. Post & Interact" desc="Like, comment, reply, add friends." icon="🤝" />
					<Card title="4. Chat + AI" desc="Real-time chat + AI writing support." icon="🤖" />
				</div>
			</section>

			{/* ── Tech stack ── */}
			<section id="stack" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
				<div className="mb-8">
					<p className="text-[11px] uppercase tracking-[0.22em] text-white/30 mb-2 font-medium">Built with</p>
					<h2 className="text-2xl font-bold text-white">Tech stack</h2>
					<p className="mt-2 max-w-lg text-sm text-white/40 leading-relaxed">Modern full-stack setup built for scalability and real-time performance.</p>
				</div>
				<div className="flex flex-wrap gap-2">
					{["React","Redux","Node.js","Express","MongoDB","WebSockets","Gemini API","JWT","Nodemailer","REST APIs"].map(t=>(
						<Badge key={t}>{t}</Badge>
					))}
				</div>
			</section>

			{/* ── Footer ── */}
			<footer className="relative z-10 mt-8 border-t border-white/[0.06]">
				<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
					<div>
						<div className="text-sm font-bold text-white tracking-tight">Project Verse</div>
						<div className="mt-1 text-xs text-white/30">AI-powered real-time social platform for posts and project demos.</div>
						<div className="mt-3 text-[10px] text-white/20">© 2025 Project Verse. Built with ❤️ and AI.</div>
					</div>
					<div className="flex items-center gap-3">
						<a href="/login" className="px-4 py-2 text-sm font-medium text-white/50 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white transition-all duration-200">Log in</a>
						<a href="/register" className="db-cta px-4 py-2 text-sm font-semibold text-white rounded-xl">Get started →</a>
					</div>
				</div>
			</footer>

			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
				* { font-family: 'Inter', system-ui, sans-serif; }

				.db-cta {
					background: linear-gradient(135deg,#6d28d9,#7c3aed 50%,#06b6d4);
					box-shadow: 0 0 0 1px rgba(109,40,217,0.4), 0 4px 20px -4px rgba(109,40,217,0.5);
					transition: all 0.25s ease;
				}
				.db-cta:hover {
					transform: translateY(-1px);
					box-shadow: 0 0 0 1px rgba(124,58,237,0.5), 0 8px 28px -4px rgba(109,40,217,0.65);
				}

				@keyframes scanBeamDB {
					0%   { top: -2px; opacity: 0; }
					5%   { opacity: 1; }
					95%  { opacity: 0.7; }
					100% { top: 100%; opacity: 0; }
				}
				.db-scan { animation: scanBeamDB 9s linear infinite; }

				@keyframes gradientMove {
					0%,100% { transform: scale(1) translate(0,0); }
					50%  { transform: scale(1.15) translate(-2%,2%); }
				}
				@keyframes spotlightMove {
					0%,100% { transform: translate(-10%,-10%); }
					50%  { transform: translate(10%,10%); }
				}
				.animate-gradient { animation: gradientMove 20s ease-in-out infinite; }
				.animate-spotlight { animation: spotlightMove 24s ease-in-out infinite; }
				@keyframes fadeInUp {
					from { opacity:0; transform:translateY(14px); }
					to   { opacity:1; transform:translateY(0); }
				}
				@keyframes floatSlow {
					0%,100% { transform: translateY(0); }
					50% { transform: translateY(-8px); }
				}
				@keyframes floatFast {
					0%,100% { transform: translateY(0) scale(1); }
					50% { transform: translateY(-12px) scale(1.02); }
				}
				@keyframes typeWriter {
					from { width: 0%; }
					to { width: 100%; }
				}
				@keyframes cursorMove {
					0%   { transform: translate(0,0); }
					25%  { transform: translate(30px, -20px); }
					50%  { transform: translate(80px, 10px); }
					75%  { transform: translate(40px, 40px); }
					100% { transform: translate(0,0); }
				}
				@keyframes neuralDashPulse {
					0%,100% { opacity: 0.4; }
					50% { opacity: 0.8; }
				}

				.animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
				.animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
				.animate-cursor-move { animation: cursorMove 8s ease-in-out infinite; }
				.type-writer {
					animation: typeWriter 2s steps(40, end) infinite alternate;
				}
				.db-neural { animation: neuralDashPulse 5s ease-in-out infinite; }
			`}</style>
		</div>
	);
}
