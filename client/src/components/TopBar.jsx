/** @format */

import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";
import { RiRobot2Line } from "react-icons/ri";
import Logo from "../assets/pv2.png";

const TopBar = () => {
	const navigate = useNavigate();
	const { theme } = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const handleTheme = () => {
		const themeValue = theme === "light" ? "dark" : "light";
		dispatch(SetTheme(themeValue));
	};

	const handleSearch = async (data) => {
		await fetchPosts(user?.token, dispatch, "", data);
	};

	const logout = () => {
		navigate("/login");
		dispatch(Logout());
	};

	const isPremium = user?.isPremium;

	return (
		<div className="topbar w-full sticky top-0 z-50">
			<div className="topbar-inner w-full flex items-center justify-between py-3 md:py-4 px-4 md:px-6 bg-primary/85 border-b border-[#66666625] shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md animate-topbarIn">
				{/* Brand */}
				<Link
					to="/"
					className="flex gap-3 items-center group">
					<div className="relative p-2 md:p-2.5 rounded-xl overflow-hidden topbar-logo">
						<img
							src={Logo}
							alt="Logo"
							className="relative z-10 w-8 h-8 object-contain"
						/>
						<span className="absolute inset-0 topbar-logoGlow" />
					</div>

					<span className="text-xl md:text-2xl text-[#065ad8] font-semibold tracking-tight group-hover:opacity-90 transition">
						Project-Verse
					</span>
				</Link>

				{/* Search */}
				<form
					className="hidden md:flex items-center justify-center topbar-searchWrap"
					onSubmit={handleSubmit(handleSearch)}>
					<TextInput
						placeholder="Search..."
						styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3 border border-[#66666630] focus-within:border-[#065ad855] transition"
						register={register("search")}
					/>
					<CustomButton
						title="Search"
						type="submit"
						containerStyles="bg-[#0444a4] text-white px-7 py-2.5 mt-2 rounded-r-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 topbar-btnShine"
					/>
				</form>

				{/* Download Projects Button */}
				<CustomButton
					title="Download Projects"
					type="button"
					onClick={() => navigate("/project-upload")}
					containerStyles="hidden md:flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.03] active:scale-[0.99] transition-all duration-300 ml-4 border border-indigo-400/30 topbar-btnShine"
				/>

				{/* Actions */}
				<div className="flex gap-2 md:gap-3 items-center text-ascent-1">
					{/* Theme */}
					<button
						onClick={handleTheme}
						className="topbar-iconBtn p-2 rounded-xl border border-[#66666630] hover:bg-[#0444a408] hover:border-[#66666655] transition"
						aria-label="Toggle theme"
						title="Toggle theme">
						{theme ?
							<BsMoon className="text-lg md:text-xl" />
						:	<BsSunFill className="text-lg md:text-xl" />}
					</button>

					{/* ✅ Help / Chatbot icon-only */}
					<button
						onClick={() => navigate("/helpdesk")}
						className="topbar-iconBtn topbar-helpBtn p-2 rounded-xl border border-[#66666630] hover:bg-[#0444a408] hover:border-[#66666655] transition"
						aria-label="Open help chatbot"
						title="Help / Chatbot">
						<RiRobot2Line className="text-lg md:text-xl" />
					</button>

					{/* Premium toggle */}
					{isPremium ?
						<CustomButton
							title="Projects"
							type="button"
							onClick={() => navigate("/projects")}
							containerStyles="text-sm px-4 md:px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#065ad8] to-[#0f52b6] shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 topbar-premiumBtn"
						/>
					:	<CustomButton
							title="Buy Premium"
							type="button"
							onClick={() => navigate("/premium")}
							containerStyles="text-sm px-4 md:px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#065ad8] to-[#0f52b6] shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 topbar-premiumBtn"
						/>
					}

					{/* Contact Us / Sell */}
					<CustomButton
						onClick={() => navigate("/business")}
						title="Contact Us"
						containerStyles="text-sm text-cyan-400 px-4 md:px-6 py-2 border border-cyan-500/30 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/60 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
					/>

					{/* Logout */}
					<CustomButton
						onClick={logout}
						title="Log Out"
						containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-2 border border-[#66666655] rounded-full hover:bg-[#00000008] hover:border-[#66666690] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
					/>
				</div>
			</div>

			{/* UI-only animations */}
			<style>{`
        .animate-topbarIn{ animation: topbarIn .45s ease-out both; }

        .topbar-logo{
          background: rgba(6,90,216,0.12);
          border: 1px solid rgba(6,90,216,0.22);
          transition: transform .25s ease, box-shadow .25s ease, opacity .25s ease;
        }
        .topbar-logoGlow{
          background: radial-gradient(circle at 30% 30%, rgba(6,90,216,0.55), transparent 55%),
                      radial-gradient(circle at 80% 70%, rgba(15,82,182,0.35), transparent 55%);
          filter: blur(10px);
          opacity: .9;
          animation: logoGlow 3.5s ease-in-out infinite;
        }
        .topbar-logo:hover{
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 14px 40px rgba(6,90,216,0.18);
        }

        .topbar-iconBtn{
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          outline: none;
        }
        .topbar-iconBtn:hover{
          transform: translateY(-1px);
          box-shadow: 0 10px 26px rgba(0,0,0,.08);
        }
        .topbar-iconBtn:active{
          transform: translateY(0px) scale(.98);
          box-shadow: 0 6px 16px rgba(0,0,0,.06);
        }
        .topbar-iconBtn:focus-visible{
          box-shadow: 0 0 0 4px rgba(6,90,216,.18), 0 10px 26px rgba(0,0,0,.08);
          border-color: rgba(6,90,216,.55);
        }

        /* Help button subtle glow */
        .topbar-helpBtn{
          position: relative;
          overflow: hidden;
        }
        .topbar-helpBtn::after{
          content:"";
          position:absolute; inset:-60%;
          background: radial-gradient(circle, rgba(6,90,216,.18), transparent 55%);
          opacity:.55;
          transform: translateX(-20%);
          transition: opacity .2s ease;
          pointer-events:none;
        }
        .topbar-helpBtn:hover::after{ opacity:.85; }

        .topbar-btnShine{ position: relative; overflow: hidden; }
        .topbar-btnShine::after{
          content:"";
          position:absolute; inset:-2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          transform: translateX(-120%);
          transition: transform .55s ease;
        }
        .topbar-btnShine:hover::after{ transform: translateX(120%); }

        .topbar-premiumBtn{ position: relative; overflow: hidden; }
        .topbar-premiumBtn::before{
          content:"";
          position:absolute; inset:-40%;
          background: radial-gradient(circle, rgba(255,255,255,.28), transparent 55%);
          transform: translateX(-25%) translateY(-10%);
          opacity:.6;
          transition: opacity .25s ease;
          pointer-events:none;
        }
        .topbar-premiumBtn:hover::before{ opacity:.9; }

        @keyframes topbarIn{
          from{ opacity:0; transform: translateY(-6px); }
          to{ opacity:1; transform: translateY(0); }
        }
        @keyframes logoGlow{
          0%,100%{ transform: scale(1); opacity:.85; }
          50%{ transform: scale(1.06); opacity:1; }
        }

        @media (prefers-reduced-motion: reduce){
          .animate-topbarIn, .topbar-logoGlow{ animation: none !important; }
          .topbar-iconBtn{ transition: none !important; }
        }
      `}</style>
		</div>
	);
};

export default TopBar;
