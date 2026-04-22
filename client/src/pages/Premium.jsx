/** @format */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RiSparkling2Fill } from "react-icons/ri";
import { BsCheck2Circle, BsCreditCard2Front } from "react-icons/bs";
import { SiPaytm, SiPhonepe, SiGooglepay } from "react-icons/si";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import {
	MdSecurity,
	MdVerified,
	MdOutlineAccountBalance,
} from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";

// ✅ Redux
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../redux/userSlice"; // ✅ adjust if path/name differs

// ✅ API helper
import { apiRequest } from "../utils"; // ✅ adjust if path differs

const Premium = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user); // expects state.user.user

	const [plan, setPlan] = useState("monthly"); // monthly | yearly
	const [payMethod, setPayMethod] = useState("upi"); // upi | card | netbanking | wallet
	const [showCheckout, setShowCheckout] = useState(false);

	// ✅ track UPI input
	const [upiId, setUpiId] = useState("");

	const pricing = useMemo(() => {
		const monthly = {
			price: 199,
			strike: 299,
			label: "Monthly",
			sub: "Billed monthly",
		};
		const yearly = {
			price: 1499,
			strike: 2388,
			label: "Yearly",
			sub: "Save ~37% vs monthly",
		};
		return plan === "monthly" ? monthly : yearly;
	}, [plan]);

	const methods = [
		{
			key: "upi",
			title: "UPI",
			desc: "Google Pay / PhonePe / Paytm / UPI ID",
			icon: <RiSparkling2Fill className="text-blue" />,
			chips: [
				{ label: "Google Pay", icon: <SiGooglepay /> },
				{ label: "PhonePe", icon: <SiPhonepe /> },
				{ label: "Paytm", icon: <SiPaytm /> },
			],
		},
		{
			key: "card",
			title: "Cards",
			desc: "Debit / Credit / International",
			icon: <BsCreditCard2Front className="text-blue" />,
			chips: [
				{ label: "Visa", icon: <FaCcVisa /> },
				{ label: "Mastercard", icon: <FaCcMastercard /> },
			],
		},
		{
			key: "netbanking",
			title: "Netbanking",
			desc: "All major banks supported",
			icon: <MdOutlineAccountBalance className="text-blue" />,
			chips: [
				{
					label: "SBI / HDFC / ICICI / Axis",
					icon: <MdOutlineAccountBalance />,
				},
			],
		},
		{
			key: "wallet",
			title: "Wallets",
			desc: "Paytm Wallet & more",
			icon: <IoWalletOutline className="text-blue" />,
			chips: [{ label: "Wallet", icon: <IoWalletOutline /> }],
		},
	];

	const benefits = [
		{
			title: "Boost your profile visibility",
			points: [
				"Appear higher in search & suggestions",
				"Priority badge on your profile",
				"More reach on posts (recommended feed)",
			],
		},
		{
			title: "Hire developers faster",
			points: [
				"Access Top Projects section to shortlist talent",
				"Premium filters: skills, location, rate, availability",
				"Message first (no waiting / request needed)",
			],
		},
		{
			title: "Direct contact access",
			points: [
				"View direct contact CTA on verified dev profiles",
				"Unlock portfolio & direct links visibility",
				"Priority support for disputes/reporting",
			],
		},
	];

	// ✅ FINAL: Pay + activate premium through backend
	const handlePayDemo = async () => {
		try {
			if (!user?.token) {
				alert("Please login first.");
				return;
			}

			if (payMethod !== "upi") {
				alert("Demo: Only UPI unlock is implemented. Select UPI.");
				return;
			}

			const val = (upiId || "").trim().toLowerCase();
			if (val !== "projectverse@premium") {
				alert("Invalid UPI ID (demo). Use: projectverse@premium");
				return;
			}

			// ✅ YOUR EXACT API REQUEST
			const res = await apiRequest({
				method: "PUT",
				url: "/users/update-user",
				data: {
					isPremium: true,
				},
				token: user?.token,
			});

			// ✅ handle different API response shapes safely
			const success = res?.success ?? res?.data?.success;
			const updatedUser = res?.data?.data ?? res?.data ?? res?.user ?? res;

			if (!success && !updatedUser) {
				alert("Failed to activate premium.");
				return;
			}

			// ✅ Ensure isPremium true locally even if backend doesn't include it in response
			const finalUser = { ...(updatedUser || user), isPremium: true };

			// ✅ Redux update (UI updates instantly)
			dispatch(UpdateProfile(finalUser));

			// ✅ localStorage update (persists after refresh)
			localStorage.setItem("user", JSON.stringify(finalUser));

			alert("✅ Premium activated!");
			setShowCheckout(false);
			setUpiId("");
		} catch (error) {
			console.log("Premium activation error:", error);
			alert(error?.response?.data?.message || "Something went wrong.");
		}
	};

	return (
		<div className="w-full min-h-screen bg-bgColor relative overflow-hidden">
			{/* Background */}
			<div className="premium-bg pointer-events-none absolute inset-0 opacity-[0.14]" />

			{/* Header */}
			<div className="w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-6">
				<div className="flex items-center justify-between gap-3">
					<div className="flex flex-col">
						<p className="text-ascent-2 text-sm">Upgrade</p>
						<h1 className="text-ascent-1 text-2xl md:text-3xl font-bold tracking-tight">
							Buy Premium
							<span className="ml-2 inline-flex items-center gap-1 text-xs md:text-sm px-3 py-1 rounded-full border border-[#66666630] bg-primary/60 backdrop-blur premium-pill">
								<RiSparkling2Fill className="text-blue" />
								Best value
							</span>
						</h1>
						<p className="text-ascent-2 mt-2 max-w-2xl">
							Premium unlocks discovery + hiring power: get seen first, access
							top projects, and contact developers directly.
						</p>
					</div>

					<Link
						to="/"
						className="text-ascent-2 hover:text-ascent-1 transition border border-[#66666630] px-4 py-2 rounded-xl bg-primary/60 backdrop-blur">
						Back
					</Link>
				</div>
			</div>

			{/* Content */}
			<div className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Left */}
					<div className="lg:col-span-7 flex flex-col gap-6 premium-in">
						{/* Benefits */}
						<div className="bg-primary/80 backdrop-blur border border-[#66666625] rounded-3xl p-5 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.10)] premium-card">
							<div className="flex items-center justify-between">
								<h2 className="text-ascent-1 text-xl font-semibold">
									What you unlock
								</h2>
								<span className="text-xs text-ascent-2 flex items-center gap-2">
									<MdVerified className="text-blue" /> Premium features
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
								{benefits.map((b, idx) => (
									<div
										key={idx}
										className="rounded-2xl border border-[#66666620] bg-bgColor/40 p-4 hover:translate-y-[-2px] transition premium-mini">
										<p className="text-ascent-1 font-semibold">{b.title}</p>
										<div className="mt-3 flex flex-col gap-2">
											{b.points.map((p, i) => (
												<div
													key={i}
													className="flex items-start gap-2 text-ascent-2 text-sm">
													<BsCheck2Circle className="mt-0.5 text-blue shrink-0" />
													<span>{p}</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* How it works */}
						<div className="bg-primary/80 backdrop-blur border border-[#66666625] rounded-3xl p-5 md:p-6 premium-card">
							<div className="flex items-center justify-between">
								<h2 className="text-ascent-1 text-xl font-semibold">
									How Premium works
								</h2>
								<span className="text-xs text-ascent-2 flex items-center gap-2">
									<MdSecurity className="text-blue" /> Safe payments
								</span>
							</div>

							<ol className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
								{[
									{
										t: "Choose a plan",
										d: "Monthly or Yearly. Yearly gives maximum value.",
									},
									{
										t: "Pay using your preferred method",
										d: "UPI, Card, Netbanking, Wallet.",
									},
									{
										t: "Instant unlock",
										d: "Premium activates after payment verification.",
									},
								].map((s, i) => (
									<li
										key={i}
										className="rounded-2xl border border-[#66666620] bg-bgColor/40 p-4">
										<div className="flex items-center gap-2">
											<span className="h-7 w-7 rounded-full bg-blue text-white grid place-items-center text-sm font-semibold premium-step">
												{i + 1}
											</span>
											<p className="text-ascent-1 font-semibold">{s.t}</p>
										</div>
										<p className="text-ascent-2 text-sm mt-2">{s.d}</p>
									</li>
								))}
							</ol>

							<div className="mt-5 text-ascent-2 text-sm border border-[#66666620] bg-bgColor/30 rounded-2xl p-4">
								<span className="text-ascent-1 font-semibold">Note:</span> This
								page uses a demo activation rule. For production, verify payment
								in backend before setting Premium.
							</div>
						</div>
					</div>

					{/* Right */}
					<div className="lg:col-span-5 flex flex-col gap-6 premium-inDelay">
						{/* Plan */}
						<div className="bg-primary/85 backdrop-blur border border-[#66666625] rounded-3xl p-5 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.12)] premium-card">
							<div className="flex items-start justify-between gap-3">
								<div>
									<h2 className="text-ascent-1 text-xl font-semibold">
										Choose your plan
									</h2>
									<p className="text-ascent-2 text-sm mt-1">
										Upgrade to unlock visibility + direct contact.
									</p>
								</div>

								<span className="text-xs text-ascent-2 border border-[#66666620] rounded-full px-3 py-1 bg-bgColor/30">
									Flexible
								</span>
							</div>

							<div className="mt-5 grid grid-cols-2 gap-3">
								<button
									type="button"
									onClick={() => setPlan("monthly")}
									className={[
										"rounded-2xl border p-4 text-left transition premium-toggle",
										plan === "monthly" ?
											"border-[#065ad855] bg-[#065ad80f] shadow-[0_10px_30px_rgba(6,90,216,0.12)]"
										:	"border-[#66666625] bg-bgColor/30 hover:bg-bgColor/40",
									].join(" ")}>
									<p className="text-ascent-1 font-semibold">Monthly</p>
									<p className="text-ascent-2 text-sm mt-1">₹199 / month</p>
								</button>

								<button
									type="button"
									onClick={() => setPlan("yearly")}
									className={[
										"rounded-2xl border p-4 text-left transition premium-toggle",
										plan === "yearly" ?
											"border-[#065ad855] bg-[#065ad80f] shadow-[0_10px_30px_rgba(6,90,216,0.12)]"
										:	"border-[#66666625] bg-bgColor/30 hover:bg-bgColor/40",
									].join(" ")}>
									<p className="text-ascent-1 font-semibold">Yearly</p>
									<p className="text-ascent-2 text-sm mt-1">₹1499 / year</p>
								</button>
							</div>

							<div className="mt-5 rounded-2xl border border-[#66666620] bg-bgColor/30 p-4">
								<p className="text-ascent-2 text-sm">{pricing.sub}</p>
								<div className="flex items-end justify-between mt-2">
									<div>
										<p className="text-ascent-1 text-3xl font-extrabold tracking-tight">
											₹{pricing.price}
										</p>
										<p className="text-ascent-2 text-sm">
											<span className="line-through opacity-70">
												₹{pricing.strike}
											</span>{" "}
											<span className="ml-2 text-blue font-semibold">
												Limited offer
											</span>
										</p>
									</div>
									<span className="text-xs text-ascent-2 border border-[#66666620] rounded-full px-3 py-1 bg-primary/60">
										{pricing.label}
									</span>
								</div>
							</div>

							<button
								type="button"
								onClick={() => setShowCheckout(true)}
								className="mt-5 w-full py-3 rounded-2xl text-white font-semibold premium-payBtn">
								Continue to payment
							</button>

							<p className="text-xs text-ascent-2 mt-3 text-center">
								By continuing, you agree to Premium terms and billing.
							</p>
						</div>

						{/* Payment options preview */}
						<div className="bg-primary/85 backdrop-blur border border-[#66666625] rounded-3xl p-5 md:p-6 premium-card">
							<h3 className="text-ascent-1 font-semibold">Payment options</h3>
							<p className="text-ascent-2 text-sm mt-1">
								Choose inside checkout.
							</p>

							<div className="mt-4 grid grid-cols-2 gap-3">
								{methods.map((m) => (
									<div
										key={m.key}
										className="rounded-2xl border border-[#66666620] bg-bgColor/30 p-4 hover:translate-y-[-2px] transition">
										<div className="flex items-center gap-2">
											<span className="h-9 w-9 rounded-xl bg-primary grid place-items-center border border-[#66666620]">
												{m.icon}
											</span>
											<div className="min-w-0">
												<p className="text-ascent-1 font-semibold">{m.title}</p>
												<p className="text-ascent-2 text-xs truncate">
													{m.desc}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="mt-5 text-xs text-ascent-2 flex items-center gap-2">
								<MdSecurity className="text-blue" /> Payments are verified
								before activating Premium.
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Checkout Modal */}
			{showCheckout && (
				<div className="fixed inset-0 z-50">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
						onClick={() => setShowCheckout(false)}
					/>
					<div className="absolute inset-0 flex items-center justify-center p-4">
						<div className="w-full max-w-2xl bg-primary rounded-3xl border border-[#66666625] shadow-[0_25px_90px_rgba(0,0,0,0.35)] overflow-hidden checkout-pop">
							<div className="p-5 md:p-6 border-b border-[#66666625] flex items-center justify-between">
								<div>
									<p className="text-ascent-2 text-sm">Checkout</p>
									<p className="text-ascent-1 text-xl font-bold">
										Premium — ₹{pricing.price}{" "}
										<span className="text-ascent-2 text-sm font-medium">
											({pricing.label})
										</span>
									</p>
								</div>
								<button
									type="button"
									onClick={() => setShowCheckout(false)}
									className="px-4 py-2 rounded-xl border border-[#66666625] hover:bg-bgColor/30 transition text-ascent-2 hover:text-ascent-1">
									Close
								</button>
							</div>

							<div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
								{/* Methods */}
								<div className="md:col-span-5">
									<p className="text-ascent-1 font-semibold">
										Select payment method
									</p>
									<div className="mt-3 flex flex-col gap-3">
										{methods.map((m) => (
											<button
												key={m.key}
												type="button"
												onClick={() => setPayMethod(m.key)}
												className={[
													"w-full text-left rounded-2xl border p-4 transition",
													payMethod === m.key ?
														"border-[#065ad855] bg-[#065ad80f] shadow-[0_10px_30px_rgba(6,90,216,0.10)]"
													:	"border-[#66666620] bg-bgColor/25 hover:bg-bgColor/35",
												].join(" ")}>
												<div className="flex items-center gap-3">
													<span className="h-10 w-10 rounded-xl bg-primary grid place-items-center border border-[#66666620]">
														{m.icon}
													</span>
													<div className="min-w-0">
														<p className="text-ascent-1 font-semibold">
															{m.title}
														</p>
														<p className="text-ascent-2 text-xs truncate">
															{m.desc}
														</p>
													</div>
												</div>

												<div className="mt-3 flex flex-wrap gap-2">
													{m.chips.map((c, i) => (
														<span
															key={i}
															className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-[#66666620] bg-primary/60 text-ascent-2">
															{c.icon} {c.label}
														</span>
													))}
												</div>
											</button>
										))}
									</div>
								</div>

								{/* Form */}
								<div className="md:col-span-7">
									<p className="text-ascent-1 font-semibold">Enter details</p>
									<p className="text-ascent-2 text-sm mt-1">
										Demo unlock rule: enter <b>projectverse@premium</b> as UPI
										ID.
									</p>

									<div className="mt-4 rounded-2xl border border-[#66666620] bg-bgColor/25 p-4">
										{payMethod === "upi" && (
											<>
												<label className="text-ascent-2 text-sm">UPI ID</label>
												<input
													value={upiId}
													onChange={(e) => setUpiId(e.target.value)}
													className="mt-2 w-full rounded-xl border border-[#66666625] bg-primary/70 px-4 py-3 outline-none text-ascent-1 placeholder:text-ascent-2/70 focus:ring-2 focus:ring-[#065ad833]"
													placeholder="example@upi"
												/>
												<p className="text-xs text-ascent-2 mt-2">
													Demo: use <b>projectverse@premium</b> to activate
													Premium.
												</p>
											</>
										)}

										{payMethod !== "upi" && (
											<p className="text-xs text-ascent-2">
												Demo: only UPI unlock is implemented.
											</p>
										)}
									</div>

									<button
										type="button"
										onClick={handlePayDemo}
										className="mt-4 w-full py-3 rounded-2xl text-white font-semibold premium-payBtn">
										Pay ₹{pricing.price} (Demo)
									</button>

									<div className="mt-3 flex items-center justify-between text-xs text-ascent-2">
										<span className="inline-flex items-center gap-2">
											<MdSecurity className="text-blue" /> Encrypted checkout
										</span>
										<span className="inline-flex items-center gap-2">
											<MdVerified className="text-blue" /> Verified activation
										</span>
									</div>
								</div>
							</div>

							<div className="px-5 md:px-6 py-4 border-t border-[#66666625] bg-bgColor/20 text-ascent-2 text-xs">
								Tip: In production, activate Premium on the backend after
								payment verification.
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Page styles */}
			<style>{`
        .premium-bg{
          background:
            radial-gradient(900px 520px at 10% 8%, rgba(6,90,216,0.20), transparent 62%),
            radial-gradient(800px 520px at 92% 18%, rgba(15,82,182,0.12), transparent 64%),
            radial-gradient(900px 650px at 50% 92%, rgba(6,90,216,0.10), transparent 62%);
          animation: premiumBg 16s ease-in-out infinite;
        }
        @keyframes premiumBg{
          0%{ transform: scale(1); filter: hue-rotate(0deg); }
          50%{ transform: scale(1.02); filter: hue-rotate(10deg); }
          100%{ transform: scale(1); filter: hue-rotate(0deg); }
        }

        .premium-in{ animation: inUp .55s ease-out both; }
        .premium-inDelay{ animation: inUp .55s ease-out both; animation-delay: .08s; }
        @keyframes inUp{
          from{ opacity: 0; transform: translateY(12px); }
          to{ opacity: 1; transform: translateY(0); }
        }

        .premium-card{ transition: transform .22s ease, box-shadow .22s ease; }
        .premium-card:hover{ transform: translateY(-2px); box-shadow: 0 18px 62px rgba(0,0,0,0.12); }

        .premium-mini{ transition: transform .22s ease, box-shadow .22s ease; }
        .premium-mini:hover{ box-shadow: 0 14px 42px rgba(0,0,0,0.10); }

        .premium-pill{
          animation: pillGlow 2.8s ease-in-out infinite;
        }
        @keyframes pillGlow{
          0%,100%{ box-shadow: 0 0 0 rgba(6,90,216,0); }
          50%{ box-shadow: 0 16px 44px rgba(6,90,216,0.14); }
        }

        .premium-step{
          box-shadow: 0 12px 30px rgba(6,90,216,0.25);
        }

        .premium-toggle{
          transform: translateZ(0);
        }

        .premium-payBtn{
          background: linear-gradient(90deg, #065ad8, #0f52b6);
          box-shadow: 0 18px 50px rgba(6,90,216,0.22);
          transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
          position: relative;
          overflow: hidden;
        }
        .premium-payBtn:hover{
          transform: translateY(-1px);
          box-shadow: 0 22px 70px rgba(6,90,216,0.28);
          filter: saturate(1.05);
        }
        .premium-payBtn:active{
          transform: translateY(0px) scale(0.99);
        }
        .premium-payBtn::after{
          content:"";
          position:absolute; inset:-2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          transform: translateX(-130%);
          transition: transform .55s ease;
        }
        .premium-payBtn:hover::after{ transform: translateX(130%); }

        .checkout-pop{
          animation: pop .28s ease-out both;
        }
        @keyframes pop{
          from{ opacity:0; transform: translateY(10px) scale(.98); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }
      `}</style>
		</div>
	);
};

export default Premium;
