import React from "react";
import { TopBar } from "../components";
import { motion } from "framer-motion";
import { MdEmail, MdPhone } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

const Business = () => {
	const plans = [
		{
			name: "Basic Seller",
			price: "Free",
			description: "Start selling your side projects instantly.",
			features: [
				"List up to 3 projects",
				"Community support",
				"Standard platform visibility",
				"15% platform fee on sales"
			]
		},
		{
			name: "Pro Developer",
			price: "$29/mo",
			description: "For professionals building high-quality software.",
			features: [
				"Unlimited project listings",
				"Priority ranking in search",
				"Verified Seller badge",
				"Only 5% platform fee on sales"
			]
		},
		{
			name: "Agency",
			price: "$99/mo",
			description: "For teams and agencies selling enterprise solutions.",
			features: [
				"Everything in Pro",
				"Dedicated account manager",
				"White-label options",
				"0% platform fee on sales"
			]
		}
	];

	return (
		<>
			<div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 home-bg min-h-screen relative overflow-x-hidden">
				{/* ── Futuristic Background Layer ── */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden z-0 fixed">
					<div className="absolute inset-0 home-deepspace" />
					<motion.div
						animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
						transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
						className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-[110px]"
						style={{ background: "radial-gradient(circle, rgba(109,40,217,0.55), transparent 70%)" }}
					/>
					<motion.div
						animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
						transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
						className="absolute top-1/2 right-0 w-[650px] h-[650px] rounded-full blur-[130px]"
						style={{ background: "radial-gradient(circle, rgba(6,182,212,0.45), transparent 70%)" }}
					/>
					<div className="absolute inset-0 home-grid" />
				</div>

				<div className="pointer-events-none absolute inset-0 home-grid-mask fixed" />

				<TopBar />

				<div className="w-full max-w-6xl mx-auto pt-10 pb-20 relative z-10 px-4 md:px-0">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
							Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Project-Verse</span>
						</h1>
						<p className="text-lg text-ascent-2 max-w-2xl mx-auto">
							Join our ecosystem of professional developers. Sell your premium codebases, templates, and SaaS projects directly to buyers.
						</p>
					</motion.div>

					{/* Plans Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
						{plans.map((plan, index) => (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								className="home-glassPanel p-8 rounded-3xl home-cardLift border border-[#ffffff15] relative overflow-hidden"
							>
								{index === 1 && (
									<div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400" />
								)}
								<h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
								<div className="text-3xl font-extrabold text-blue-400 mb-4">{plan.price}</div>
								<p className="text-ascent-2 text-sm mb-6 h-10">{plan.description}</p>
								
								<div className="space-y-4 mb-8">
									{plan.features.map((feature, i) => (
										<div key={i} className="flex items-start gap-3">
											<BsCheckCircleFill className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
											<span className="text-ascent-1 text-sm">{feature}</span>
										</div>
									))}
								</div>

								<button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${index === 1 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-[#ffffff08] text-white hover:bg-[#ffffff15] border border-[#ffffff10]'}`}>
									Get Started
								</button>
							</motion.div>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Terms and Conditions */}
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="home-glassPanel p-8 rounded-3xl border border-[#ffffff15]"
						>
							<h3 className="text-2xl font-bold text-white mb-6">Terms & Conditions</h3>
							<div className="space-y-4 text-sm text-ascent-2 max-h-64 overflow-y-auto pr-2 no-scrollbar">
								<p>1. <strong className="text-ascent-1">Quality Assurance:</strong> All projects submitted for sale must pass our automated code quality and security reviews before being listed.</p>
								<p>2. <strong className="text-ascent-1">Intellectual Property:</strong> You must own the full rights to any codebase you list on the platform. Stolen or plagiarized code will result in an immediate lifetime ban.</p>
								<p>3. <strong className="text-ascent-1">Payouts:</strong> Revenue from sales is disbursed on the 1st and 15th of every month. Minimum payout threshold is $50.</p>
								<p>4. <strong className="text-ascent-1">Support:</strong> Sellers must provide basic installation support for their buyers for at least 30 days post-purchase.</p>
								<p>5. <strong className="text-ascent-1">Refunds:</strong> We operate a 7-day money-back guarantee if the code is proven to be completely broken or drastically misrepresented.</p>
							</div>
						</motion.div>

						{/* Contact Info */}
						<motion.div
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="home-glassPanel p-8 rounded-3xl border border-[#ffffff15] flex flex-col justify-center"
						>
							<h3 className="text-2xl font-bold text-white mb-6">Business Enquiries</h3>
							<p className="text-ascent-2 mb-8">
								Have a custom enterprise solution or need help setting up your seller account? Reach out to our business team directly.
							</p>

							<div className="space-y-6">
								<a href="mailto:azimdoni@gmail.com" className="flex items-center gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-[#ffffff05] transition-all border border-transparent hover:border-[#ffffff10]">
									<div className="w-12 h-12 rounded-full bg-[#8b5cf620] flex items-center justify-center group-hover:scale-110 transition-transform">
										<MdEmail className="text-violet-400" size={24} />
									</div>
									<div>
										<p className="text-sm text-ascent-2 uppercase tracking-wider mb-1">Email Us</p>
										<p className="text-lg font-medium text-white">azimdoni@gmail.com</p>
									</div>
								</a>

								<a href="tel:8151910971" className="flex items-center gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-[#ffffff05] transition-all border border-transparent hover:border-[#ffffff10]">
									<div className="w-12 h-12 rounded-full bg-[#06b6d420] flex items-center justify-center group-hover:scale-110 transition-transform">
										<MdPhone className="text-cyan-400" size={24} />
									</div>
									<div>
										<p className="text-sm text-ascent-2 uppercase tracking-wider mb-1">Call Us</p>
										<p className="text-lg font-medium text-white">8151910971</p>
									</div>
								</a>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Business;
