import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/pv2.png";

export default function EntryPage() {
	const navigate = useNavigate();
	const fullTitle1 = "Enter the world of ";
	const fullTitle2 = "Project Verse";
	const fullSubtitle = "where projects become verse to the developers";
	
	const [typedTitle1, setTypedTitle1] = useState("");
	const [typedTitle2, setTypedTitle2] = useState("");
	const [typedSubtitle, setTypedSubtitle] = useState("");
	
	useEffect(() => {
		let t1 = 0, t2 = 0, s = 0;
		const timer = setInterval(() => {
			if (t1 < fullTitle1.length) {
				setTypedTitle1(fullTitle1.substring(0, t1 + 1));
				t1++;
			} else if (t2 < fullTitle2.length) {
				setTypedTitle2(fullTitle2.substring(0, t2 + 1));
				t2++;
			} else if (s < fullSubtitle.length) {
				setTypedSubtitle(fullSubtitle.substring(0, s + 1));
				s++;
			} else {
				clearInterval(timer);
			}
		}, 50); // overall typing speed

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center relative overflow-hidden" style={{fontFamily:"'Inter',system-ui,sans-serif"}}>
			{/* ── Cinematic AI Background ── */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Core Glow */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '4s'}} />
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}} />
				
				{/* Starfield / Grid */}
				<div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,backgroundSize:"40px 40px", transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2)'}} />
				
				{/* Particles */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(20)].map((_, i) => (
						<div key={i} className="absolute bg-white rounded-full animate-float-up" 
							style={{
								width: Math.random() * 3 + 1 + 'px', 
								height: Math.random() * 3 + 1 + 'px',
								left: Math.random() * 100 + '%',
								top: Math.random() * 100 + 100 + '%',
								opacity: Math.random() * 0.5 + 0.1,
								animationDuration: Math.random() * 10 + 10 + 's',
								animationDelay: Math.random() * 5 + 's'
							}} 
						/>
					))}
				</div>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-[fadeInUp_1s_ease-out]">
				{/* Logo */}
				<div className="w-20 h-20 mb-8 relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
					<img src={Logo} alt="ProjectVerse" className="w-full h-full object-contain relative z-10" />
					<div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20" />
				</div>

				<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 min-h-[5rem]">
					{typedTitle1} <br/>
					<span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
						{typedTitle2}
					</span>
					{/* Cursor for the title stops blinking once subtitle starts typing */}
					{typedSubtitle.length === 0 && (
						<span className="animate-pulse inline-block w-[3px] h-[0.9em] bg-white align-middle ml-2"></span>
					)}
				</h1>

				<p className="text-lg md:text-2xl text-white/60 font-light tracking-wide mb-12 max-w-2xl min-h-[3rem]">
					{typedSubtitle}
					{typedSubtitle.length > 0 && (
						<span className="animate-pulse inline-block w-[2px] h-[1em] bg-white/60 align-middle ml-1"></span>
					)}
				</p>

				<button 
					onClick={() => navigate('/dashboard')}
					className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 outline-none"
				>
					<span className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
					<span className="absolute inset-0 w-full h-full rounded-2xl bg-[#0a0a1a] border border-white/20 group-hover:bg-transparent transition-colors duration-300"></span>
					<span className="relative flex items-center gap-2">
						Open Dashboard
						<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
				</button>
			</div>

			<style>{`
				@keyframes float-up {
					0% { transform: translateY(0); opacity: 0; }
					10% { opacity: 1; }
					90% { opacity: 1; }
					100% { transform: translateY(-100vh); opacity: 0; }
				}
				.animate-float-up {
					animation: float-up linear infinite;
				}
				@keyframes fadeInUp {
					from { opacity: 0; transform: translateY(20px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</div>
	);
}
