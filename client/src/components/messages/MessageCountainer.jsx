/** @format */

import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import previous from "../../assets/previous.png";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../../assets";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../utils";

const MessageCountainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [userInfo, setUserInfo] = useState(null);
	const { id } = useParams();
	const authUser = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			if (authUser?.token && id) {
				const res = await getUserInfo(authUser.token, id);
				setUserInfo(res);
			}
		};
		fetchUser();
	}, [authUser?.token, id]);

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className="w-full h-full flex flex-col rounded-2xl border border-[#66666630] bg-primary/60 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.10)] overflow-hidden animate-chatShellIn chatShell-lift">
			<>
				{/* Header */}
				<div className="px-4 sm:px-5 py-3 flex justify-between items-center border-b border-[#66666625] bg-primary/70 backdrop-blur sticky top-0 z-10">
					<div className="flex items-center gap-3 min-w-0">
						<Link to={"/profile/" + (userInfo?._id || id)} className="shrink-0">
							<img
								src={userInfo?.profileUrl ?? NoProfile}
								alt={userInfo?.firstName}
								className="w-9 h-9 object-cover rounded-full ring-2 ring-[#66666625] shadow-sm"
							/>
						</Link>

						<div className="min-w-0">
							<div className="flex items-center gap-2 min-w-0">
								<span className="text-xs text-ascent-2">To:</span>
								<span className="text-ascent-1 font-bold truncate">
									{userInfo?.fullName ||
										userInfo?.firstName + " " + userInfo?.lastName}
								</span>
								<span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#66666660]" />
								{userInfo?.location && (
									<span className="hidden sm:inline-block text-xs text-ascent-2 truncate">
										{userInfo.location}
									</span>
								)}
							</div>

							{/* tiny status line (UI only) */}
							<div className="mt-0.5 flex items-center gap-2">
								<span className="inline-flex items-center gap-1 text-[11px] text-ascent-2">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.35)]"></span>
									Active
								</span>
							</div>
						</div>
					</div>

					<button
						onClick={() => setSelectedConversation(null)}
						className="h-10 w-10 rounded-full grid place-items-center border border-[#66666630] bg-bgColor/40 hover:bg-bgColor/60 hover:border-[#66666670] hover:scale-[1.04] active:scale-95 transition-all duration-200 backBtn"
						aria-label="Back"
					>
						<img src={previous} alt="" className="h-5 opacity-90" />
					</button>
				</div>

				{/* Messages */}
				<Messages />

				{/* Input */}
				<MessageInput />
			</>

			{/* UI-only CSS */}
			<style>{`
        .animate-chatShellIn{ animation: chatShellIn .45s ease-out both; }
        @keyframes chatShellIn{
          from{ opacity:0; transform: translateY(10px) scale(.99); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }

        .chatShell-lift{ transition: transform .25s ease, box-shadow .25s ease; }
        .chatShell-lift:hover{
          transform: translateY(-2px);
          box-shadow: 0 22px 70px rgba(0,0,0,0.14);
        }

        .backBtn{ position: relative; overflow:hidden; }
        .backBtn::after{
          content:"";
          position:absolute; inset:-2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
          transform: translateX(-120%);
          transition: transform .6s ease;
        }
        .backBtn:hover::after{ transform: translateX(120%); }

        @media (prefers-reduced-motion: reduce){
          .animate-chatShellIn{ animation:none; }
          .backBtn::after{ display:none; }
        }
      `}</style>
		</div>
	);
};

export default MessageCountainer;

const NoChatSelected = () => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-6 py-10 text-center flex flex-col items-center gap-3 rounded-2xl border border-[#66666625] bg-primary/50 backdrop-blur shadow-sm animate-softPop">
				<p className="text-ascent-1 font-bold text-lg">
					Welcome 👋 {authUser?.firstName || authUser?.fullName || "User"} 💫
				</p>
				<p className="text-ascent-2 text-sm">Select a chat to start messaging</p>
				<TiMessages className="text-4xl md:text-6xl text-ascent-1/80" />

				<style>{`
          .animate-softPop{ animation: softPop .4s ease-out both; }
          @keyframes softPop{
            from{ opacity:0; transform: translateY(8px) scale(.99); }
            to{ opacity:1; transform: translateY(0) scale(1); }
          }
        `}</style>
			</div>
		</div>
	);
};