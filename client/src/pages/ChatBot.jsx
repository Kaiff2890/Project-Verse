/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CustomButton,
	EditProfile,
	FriendsCard,
	Loading,
	PostCard,
	ProfileCard,
	TextInput,
	TopBar,
} from "../components";
import { Link } from "react-router-dom";
import { RiSparkling2Fill } from "react-icons/ri";
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import {
	apiRequest,
	fetchPosts,
	getUserInfo,
	likePost,
	sendFriendRequest,
} from "../utils";
import { UserLogin } from "../redux/userSlice";
import ChatBotPanel from "../components/ChatBotPanel";

const ChatBot = () => {
	const { edit } = useSelector((state) => state.user);
	const user = JSON.parse(localStorage.getItem("user"));
	const { posts } = useSelector((state) => state.posts);

	const [friendRequest, setFriendRequest] = useState([]);
	const [suggestedFriends, setSuggestedFriends] = useState([]);
	const [errMsg, setErrMsg] = useState("");
	const [posting, setPosting] = useState(false);
	const [loading, setLoading] = useState(false);

	// ✅ AI caption states
	const [aiCaption, setAiCaption] = useState("");
	const [captionLoading, setCaptionLoading] = useState(false);
	const [captionError, setCaptionError] = useState("");

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm();

	// ✅ react-hook-form current value
	const descriptionValue = watch("description") || "";

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
		setLoading(false);
	};

	const handelLikePost = async (uri) => {
		await likePost({ uri: uri, token: user?.token });
		await fetchPost();
	};

	const fetchFrienduesReqests = async () => {
		try {
			const res = await apiRequest({
				url: "/users/get-friend-request",
				token: user?.token,
				method: "POST",
			});
			setFriendRequest(res?.data);
		} catch (error) {
			console.log("error in home.jsx : ", error);
		}
	};

	const fetchsuggestedFriends = async () => {
		try {
			const res = await apiRequest({
				url: "/users/suggested-friends",
				token: user?.token,
				method: "POST",
			});
			setSuggestedFriends(res?.data);
		} catch (error) {
			console.log("error in home.jsx : ", error);
		}
	};

	// ------------------ CHATBOT STATE ------------------
	const [botMessages, setBotMessages] = useState([
		{
			id: crypto.randomUUID(),
			role: "model",
			text: "Hi! I’m your Gemini assistant. Ask me anything about projects, code, or planning.",
			ts: Date.now(),
		},
	]);
	const [botInput, setBotInput] = useState("");
	const [botLoading, setBotLoading] = useState(false);

	const botEndRef = React.useRef(null);

	useEffect(() => {
		botEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [botMessages, botLoading]);

	const callGemini = async (text) => {
		// Map UI messages to backend history format
		const history = botMessages
			.filter((m) => m.role === "user" || m.role === "model")
			.map((m) => ({ role: m.role, text: m.text }));

		const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/genrate/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: text, history }),
		});

		const data = await res.json();
		if (!res.ok || data?.success === false) {
			throw new Error(data?.message || "Failed to get Gemini reply");
		}
		return data.reply;
	};

	const sendToBot = async (text) => {
		const msg = (text || "").trim();
		if (!msg || botLoading) return;

		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			text: msg,
			ts: Date.now(),
		};

		setBotMessages((prev) => [...prev, userMsg]);
		setBotInput("");
		setBotLoading(true);

		try {
			const reply = await callGemini(msg);

			const botMsg = {
				id: crypto.randomUUID(),
				role: "model",
				text: reply,
				ts: Date.now(),
			};

			setBotMessages((prev) => [...prev, botMsg]);
		} catch (e) {
			setBotMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "model",
					text: `⚠️ ${e?.message || "Something went wrong"}`,
					ts: Date.now(),
				},
			]);
		} finally {
			setBotLoading(false);
		}
	};

	const botShortcuts = [
		{
			title: "Build a project roadmap",
			prompt: "Help me build a project roadmap with milestones for 30 days.",
		},
		{
			title: "Best final year project ideas",
			prompt:
				"Suggest top 10 final year project ideas (MERN/AI) with features and scope.",
		},
		{
			title: "Fix my bug",
			prompt:
				"I have a bug in React. Ask me questions step-by-step and help me fix it.",
		},
		{
			title: "Make my UI professional",
			prompt:
				"Give me 10 UI improvements for a social media app using Tailwind.",
		},
		{
			title: "Write API design",
			prompt:
				"Design REST APIs for posts, comments, likes, and chat with clean routes.",
		},
	];

	const getUsers = async () => {
		const res = await getUserInfo(user?.token);
		const newData = { token: user?.token, ...res };
		dispatch(UserLogin(newData));
	};

	useEffect(() => {
		fetchFrienduesReqests();
		fetchsuggestedFriends();
		getUsers();
		fetchPost();
		setLoading(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor h-screen overflow-hidden relative">
				{/* subtle animated overlay (UI only) */}
				<div className="pointer-events-none absolute inset-0 opacity-[0.12] home-grid-mask" />

				<TopBar />

				<div className="w-full flex gap-3 lg:gap-6 pt-5 pb-10 h-full relative">
					{/* LEFT */}
					<div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto pr-1 animate-homeIn">
						<div className="home-cardLift">
							<ProfileCard user={user} />
						</div>
						<div className="home-cardLift">
							<FriendsCard friends={user?.friends} />
						</div>
					</div>

					<ChatBotPanel />
				</div>

				{/* UI-only animations */}
				<style>{`
  /* background overlay */
  .home-grid-mask{
    background:
      radial-gradient(700px 420px at 15% 10%, rgba(4,68,164,0.16), transparent 60%),
      radial-gradient(700px 420px at 85% 25%, rgba(15,82,182,0.10), transparent 62%),
      radial-gradient(700px 520px at 50% 92%, rgba(4,68,164,0.08), transparent 60%);
    animation: homeBg 16s ease-in-out infinite;
  }

  /* smooth section entrance */
  .animate-homeIn{ animation: homeIn .55s ease-out both; }
  .animate-softPop{ animation: softPop .45s ease-out both; }

  @keyframes homeIn{
    from{ opacity:0; transform: translateY(10px); }
    to{ opacity:1; transform: translateY(0); }
  }
  @keyframes softPop{
    from{ opacity:0; transform: translateY(8px) scale(.99); }
    to{ opacity:1; transform: translateY(0) scale(1); }
  }

  /* background motion */
  @keyframes homeBg{
    0%{ filter: hue-rotate(0deg); transform: scale(1); opacity: .12; }
    50%{ filter: hue-rotate(10deg); transform: scale(1.02); opacity: .14; }
    100%{ filter: hue-rotate(0deg); transform: scale(1); opacity: .12; }
  }

  /* lift cards (less aggressive + no jitter) */
  .home-cardLift{
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
    will-change: transform;
  }
  .home-cardLift:hover{
    transform: translateY(-1px);
    box-shadow: 0 16px 44px rgba(0,0,0,.12);
  }

  /* chips and icons */
  .home-icon{ transition: transform .22s ease; }
  .home-chip:hover .home-icon{ transform: translateY(-1px) scale(1.06); }

  /* sparkle icon animation */
  .home-sparkle{
    animation: sparkle 2.2s ease-in-out infinite;
    filter: drop-shadow(0 10px 18px rgba(6,90,216,0.18));
    opacity: .95;
  }
  @keyframes sparkle{
    0%,100%{ transform: rotate(0deg) scale(1); }
    50%{ transform: rotate(10deg) scale(1.08); }
  }

  /* Post button sheen */
  .home-postBtn{ position: relative; overflow: hidden; }
  .home-postBtn::after{
    content:"";
    position:absolute; inset:-2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
    transform: translateX(-120%);
    transition: transform .55s ease;
  }
  .home-postBtn:hover::after{ transform: translateX(120%); }

  /* AI caption dot pulse (slow) */
  .home-pingSlow{
    animation: pingSlow 1.6s cubic-bezier(0,0,.2,1) infinite;
  }
  @keyframes pingSlow{
    0%{ transform: scale(1); opacity:.9; }
    70%,100%{ transform: scale(2.2); opacity:0; }
  }

  /* error shake */
  .home-shake{
    animation: shake .25s ease-in-out 2;
  }
  @keyframes shake{
    0%{ transform: translateX(0); }
    25%{ transform: translateX(-2px); }
    50%{ transform: translateX(2px); }
    75%{ transform: translateX(-2px); }
    100%{ transform: translateX(0); }
  }

  @media (prefers-reduced-motion: reduce){
    .home-grid-mask,
    .animate-homeIn,
    .animate-softPop,
    .home-sparkle,
    .home-pingSlow,
    .home-shake{ animation: none !important; }
    .home-cardLift{ transition: none; }
    .home-postBtn::after{ display:none; }
  }
`}</style>
			</div>

			{edit && <EditProfile />}
		</>
	);
};

export default ChatBot;
