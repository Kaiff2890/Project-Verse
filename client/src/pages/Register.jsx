/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";
import { apiRequest } from "../utils";
import Logo from "../assets/pv2.png";

const Register = () => {
	const [errMsg, setErrMsg] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const res = await apiRequest({
				method: "POST",
				url: "/auth/register",
				data: data,
			});

			if (res?.status === "failed") {
				setErrMsg(res);
			} else {
				setErrMsg(res);
				setInterval(() => {
					window.location.replace("/login");
				}, 5000);
			}
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
			console.log("error in register page", error);
		}
	};

	return (
		<div className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#070A12] overflow-hidden">
			{/* Premium background */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(217,70,239,0.12),transparent_45%)] animate-gradient" />
				<div
					className="absolute inset-0 opacity-[0.08]"
					style={{
						backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
						backgroundSize: "60px 60px",
					}}
				/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] animate-spotlight" />
			</div>

			<div className="relative w-full max-w-5xl">
				<div className="w-full grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
					{/* LEFT (Form) */}
					<div className="p-8 sm:p-10 lg:p-12">
						{/* Brand */}
						<div className="flex items-center gap-3 mb-8 animate-[fadeInUp_700ms_ease-out]">
							<div className="relative p-2 md:p-2.5 rounded-xl overflow-hidden topbar-logo">
								<img
									src={Logo}
									alt="Logo"
									className="relative z-10 w-8 h-8 object-contain"
								/>
								<span className="absolute inset-0 topbar-logoGlow" />
							</div>

							<div className="leading-tight">
								<div className="text-lg font-semibold text-white">
									Project-Verse
								</div>
								<div className="text-xs text-white/60">
									Join • Share • Connect
								</div>
							</div>
						</div>

						{/* Heading */}
						<div className="animate-[fadeInUp_850ms_ease-out]">
							<p className="text-white text-2xl font-bold tracking-tight">
								Create your account
							</p>
							<span className="text-sm mt-2 block text-white/70">
								Start posting, connecting, and chatting in real time.
							</span>
						</div>

						{/* Form */}
						<form
							className="mt-8 flex flex-col gap-5 animate-[fadeInUp_1000ms_ease-out]"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
								<TextInput
									name="firstName"
									label="First Name"
									placeholder="First Name"
									type="text"
									styles="w-full rounded-2xl !py-3.5 !px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
									labelStyle="ml-2 text-white/80"
									register={register("firstName", {
										required: "First Name is required!",
									})}
									error={errors.firstName ? errors.firstName?.message : ""}
								/>

								<TextInput
									label="Last Name"
									placeholder="Last Name"
									type="lastName"
									styles="w-full rounded-2xl !py-3.5 !px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
									labelStyle="ml-2 text-white/80"
									register={register("lastName", {
										required: "Last Name do no match",
									})}
									error={errors.lastName ? errors.lastName?.message : ""}
								/>
							</div>

							<TextInput
								name="email"
								placeholder="email@example.com"
								label="Email Address"
								type="email"
								register={register("email", {
									required: "Email Address is required",
								})}
								styles="w-full rounded-2xl !py-3.5 !px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
								labelStyle="ml-2 text-white/80"
								error={errors.email ? errors.email.message : ""}
							/>

							<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
								<TextInput
									name="password"
									label="Password"
									placeholder="Password"
									type="password"
									styles="w-full rounded-2xl !py-3.5 !px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
									labelStyle="ml-2 text-white/80"
									register={register("password", {
										required: "Password is required!",
									})}
									error={errors.password ? errors.password?.message : ""}
								/>

								<TextInput
									label="Confirm Password"
									placeholder="Password"
									type="password"
									styles="w-full rounded-2xl !py-3.5 !px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
									labelStyle="ml-2 text-white/80"
									register={register("cPassword", {
										validate: (value) => {
											const { password } = getValues();
											if (password != value) {
												return "Passwords do no match";
											}
										},
									})}
									error={
										errors.cPassword && errors.cPassword.type === "validate" ?
											errors.cPassword?.message
										:	""
									}
								/>
							</div>

							{errMsg?.message && (
								<span
									className={`text-sm ${
										errMsg?.status == "failed" ?
											"text-red-300"
										:	"text-emerald-300"
									}`}>
									{errMsg?.message}
								</span>
							)}

							{isSubmitting ?
								<Loading />
							:	<CustomButton
									type="submit"
									containerStyles="relative inline-flex justify-center items-center rounded-2xl px-6 py-3.5 text-base font-semibold text-white
                  bg-gradient-to-r from-indigo-500 via-cyan-500 to-fuchsia-500
                  hover:from-indigo-400 hover:via-cyan-400 hover:to-fuchsia-400
                  shadow-[0_0_25px_rgba(99,102,241,0.40)]
                  hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
                  hover:scale-[1.02] transition-all duration-300"
									title="Create Account"
								/>
							}
						</form>

						{/* Bottom */}
						<p className="mt-7 text-white/70 text-sm text-center animate-[fadeInUp_1150ms_ease-out]">
							Already has an account?
							<Link
								to="/login"
								className="text-white font-semibold ml-2 underline underline-offset-4 hover:text-white/90 transition">
								Login
							</Link>
						</p>
					</div>

					{/* RIGHT (Illustration) */}
					<div className="hidden lg:flex relative items-center justify-center p-12 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-fuchsia-500/15">
						<div
							className="absolute inset-0 opacity-[0.06]"
							style={{
								backgroundImage:
									"radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
								backgroundSize: "22px 22px",
							}}
						/>

						<div className="relative w-full flex flex-col items-center justify-center">
							<div className="relative flex items-center justify-center">
								<img
									src={BgImage}
									alt="Bg Image"
									className="w-52 2xl:w-64 h-52 2xl:h-64 rounded-full object-cover ring-4 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] animate-float"
								/>

								<div className="absolute right-[-10px] top-8 py-2.5 px-5 rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-md flex items-center gap-2 animate-pill1">
									<BsShare size={14} />
									<span className="text-xs font-semibold">Share</span>
								</div>

								<div className="absolute left-[-14px] top-6 py-2.5 px-5 rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-md flex items-center gap-2 animate-pill2">
									<ImConnection />
									<span className="text-xs font-semibold">Connect</span>
								</div>

								<div className="absolute left-0 bottom-6 py-2.5 px-5 rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-md flex items-center gap-2 animate-pill3">
									<AiOutlineInteraction />
									<span className="text-xs font-semibold">Interact</span>
								</div>
							</div>

							<div className="mt-14 text-center max-w-sm">
								<p className="text-white text-lg font-semibold">
									Join, connect & share instantly
								</p>
								<span className="text-sm text-white/70">
									Create an account and start sharing your moments.
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Local keyframes (UI only) */}
			<style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientMove {
          0%   { transform: scale(1) translate(0,0); }
          50%  { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1) translate(0,0); }
        }
        @keyframes spotlightMove {
          0%   { transform: translate(-10%, -10%); }
          50%  { transform: translate(10%, 10%); }
          100% { transform: translate(-10%, -10%); }
        }
        .animate-gradient { animation: gradientMove 18s ease-in-out infinite; }
        .animate-spotlight { animation: spotlightMove 22s ease-in-out infinite; }

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
      `}</style>
		</div>
	);
};

export default Register;
