/** @format */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RiSparkling2Fill } from "react-icons/ri";
import { BsSend } from "react-icons/bs";
import { FiCopy, FiCheck } from "react-icons/fi";

const SUGGESTIONS = [
	{
		title: "Project ideas",
		text: "Suggest top 10 final year project ideas (MERN/AI) with features and scope.",
	},
	{
		title: "Build roadmap",
		text: "Give me a step-by-step roadmap to build a MERN project with auth + posts + chat.",
	},
	{
		title: "Bug help",
		text: "I have a bug in my React app. Ask me questions and guide me to fix it.",
	},
	{
		title: "System design",
		text: "Help me design a scalable social media app (API, DB schema, caching).",
	},
	{
		title: "Resume",
		text: "Rewrite my resume bullets for MERN projects in a strong ATS-friendly way.",
	},
];

const formatTime = (d) =>
	new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Avatar = ({ role }) => {
	const isUser = role === "user";
	return (
		<div
			className={[
				"h-8 w-8 rounded-xl shrink-0 grid place-items-center",
				isUser ?
					"bg-[#0b3b8a] text-white"
				:	"bg-gradient-to-br from-[#065ad8] to-[#0f52b6] text-white",
				"shadow-sm border border-white/10",
			].join(" ")}
			aria-hidden="true">
			{isUser ? "Y" : <RiSparkling2Fill />}
		</div>
	);
};

const Bubble = ({ role, text, time, showAvatar, onCopy, copied }) => {
	const isUser = role === "user";

	return (
		<div
			className={[
				"w-full flex gap-2",
				isUser ? "justify-end" : "justify-start",
				"my-2",
			].join(" ")}>
			{!isUser && showAvatar && <Avatar role={role} />}
			{!isUser && !showAvatar && <div className="w-8" />}

			<div className={["max-w-[92%] md:max-w-[75%]"].join(" ")}>
				<div
					className={[
						"rounded-2xl px-4 py-3",
						"border border-[#66666625]",
						isUser ? "bg-[#0444a4] text-white" : "bg-primary text-ascent-1",
						"shadow-[0_10px_26px_rgba(0,0,0,0.08)]",
					].join(" ")}>
					<p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>

					<div className="mt-2 flex items-center justify-between gap-3">
						<div
							className={[
								"text-[11px] opacity-70",
								isUser ? "text-white/80" : "text-ascent-2",
							].join(" ")}>
							{time}
						</div>

						{!isUser && (
							<button
								type="button"
								onClick={onCopy}
								className={[
									"inline-flex items-center gap-1 text-[11px]",
									"text-ascent-2 hover:text-ascent-1",
									"opacity-80 hover:opacity-100 transition",
								].join(" ")}
								title="Copy">
								{copied ?
									<FiCheck />
								:	<FiCopy />}
								{copied ? "Copied" : "Copy"}
							</button>
						)}
					</div>
				</div>
			</div>

			{isUser && showAvatar && <Avatar role={role} />}
			{isUser && !showAvatar && <div className="w-8" />}
		</div>
	);
};

const TypingBubble = () => (
	<div className="w-full flex justify-start gap-2 my-2">
		<Avatar role="model" />
		<div className="max-w-[92%] md:max-w-[75%]">
			<div className="rounded-2xl px-4 py-3 border border-[#66666625] bg-primary shadow-[0_10px_26px_rgba(0,0,0,0.08)]">
				<div className="flex items-center gap-2 text-ascent-2">
					<span className="inline-flex gap-1">
						<span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.2s]" />
						<span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.1s]" />
						<span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
					</span>
					<span className="text-xs">Thinking…</span>
				</div>
			</div>
		</div>
	</div>
);

const ChatBotPanel = () => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	const [messages, setMessages] = useState([
		{
			id: crypto.randomUUID(),
			role: "model",
			text: "Hi! I’m your Gemini assistant. Ask me anything about projects, code, or planning.",
			createdAt: new Date().toISOString(),
		},
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");
	const [copiedId, setCopiedId] = useState(null);
	const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

	const endRef = useRef(null);

	const historyForApi = useMemo(() => {
		return messages.slice(-20).map((m) => ({ role: m.role, text: m.text }));
	}, [messages]);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [messages.length, loading]);

	const copyText = async (id, text) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 900);
		} catch {
			// ignore
		}
	};

	const sendToBot = async (text) => {
		const trimmed = (text || "").trim();
		if (!trimmed || loading) return;

		setErr("");
		setLoading(true);

		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			text: trimmed,
			createdAt: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMsg]);
		setInput("");

		try {
			const res = await fetch("http://localhost:8800/genrate/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${authUser?.token}`,
				},
				body: JSON.stringify({
					message: trimmed,
					history: historyForApi,
				}),
			});

			const data = await res.json();

			if (!res.ok || data?.success === false) {
				throw new Error(data?.message || "Gemini server error");
			}

			const botMsg = {
				id: crypto.randomUUID(),
				role: "model",
				text: data?.reply || "No reply received.",
				createdAt: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, botMsg]);
		} catch (e) {
			setErr(e?.message || "Gemini server error");
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "model",
					text: "⚠️ " + (e?.message || "Gemini server error"),
					createdAt: new Date().toISOString(),
				},
			]);
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		sendToBot(input);
	};

	const onKeyDown = (e) => {
		// Enter sends, Shift+Enter newline (chat-standard)
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendToBot(input);
		}
	};

	// show avatar only when role changes (reduces visual noise)
	const shouldShowAvatar = (idx) => {
		const prev = messages[idx - 1];
		const curr = messages[idx];
		return !prev || prev.role !== curr.role;
	};

	const hasOnlyWelcome = messages.length <= 1;

	return (
		<div className="flex-1 h-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
			{/* CENTER: Chat */}
			<div className="bg-primary rounded-2xl border border-[#66666630] shadow-[0_18px_60px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">
				{/* header */}
				<div className="px-4 py-3 border-b border-[#66666625] flex items-center justify-between sticky top-0 bg-primary/90 backdrop-blur z-10">
					<div className="flex items-center gap-2">
						<div className="h-9 w-9 rounded-xl grid place-items-center text-white bg-gradient-to-br from-[#065ad8] to-[#0f52b6] shadow-sm">
							<RiSparkling2Fill />
						</div>
						<div>
							<p className="text-ascent-1 font-semibold leading-tight">
								Gemini Assistant
							</p>
							<p className="text-xs text-ascent-2">
								Projects • Code • Planning
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-xs text-ascent-2">
							{loading ? "Thinking…" : "Online"}
						</span>
						<button
							type="button"
							className="lg:hidden text-xs text-ascent-2 hover:text-ascent-1 transition"
							onClick={() => setShowMobileSuggestions((v) => !v)}>
							{showMobileSuggestions ? "Hide" : "Shortcuts"}
						</button>
					</div>
				</div>

				{/* mobile shortcuts */}
				{showMobileSuggestions && (
					<div className="lg:hidden border-b border-[#66666625] bg-bgColor/30 px-3 py-3">
						<div className="flex gap-2 overflow-x-auto pb-1">
							{SUGGESTIONS.map((s) => (
								<button
									key={s.title}
									type="button"
									onClick={() => sendToBot(s.text)}
									className="shrink-0 rounded-full px-3 py-2 border border-[#66666625] bg-primary text-ascent-1 text-xs hover:border-[#66666645] transition">
									{s.title}
								</button>
							))}
						</div>
					</div>
				)}

				{/* messages */}
				<div className="flex-1 overflow-y-auto px-4 py-3">
					{hasOnlyWelcome && (
						<div className="mb-4 rounded-2xl border border-[#66666625] bg-bgColor/30 p-4">
							<p className="text-ascent-1 font-semibold">Try one of these</p>
							<p className="text-xs text-ascent-2 mt-1">
								Better prompts = better answers.
							</p>
							<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
								{SUGGESTIONS.slice(0, 4).map((s) => (
									<button
										key={s.title}
										type="button"
										onClick={() => sendToBot(s.text)}
										className="text-left rounded-xl px-3 py-3 border border-[#66666625] bg-primary hover:bg-[#0444a408] hover:border-[#66666645] transition">
										<p className="text-sm text-ascent-1 font-medium">
											{s.title}
										</p>
										<p className="text-xs text-ascent-2 mt-1 line-clamp-2">
											{s.text}
										</p>
									</button>
								))}
							</div>
						</div>
					)}

					{messages.map((m, idx) => (
						<Bubble
							key={m.id}
							role={m.role}
							text={m.text}
							time={formatTime(m.createdAt)}
							showAvatar={shouldShowAvatar(idx)}
							copied={copiedId === m.id}
							onCopy={() => copyText(m.id, m.text)}
						/>
					))}

					{loading && <TypingBubble />}

					<div
						ref={endRef}
						className="h-px"
					/>
				</div>

				{/* error */}
				{err && (
					<div className="px-4 pb-2">
						<p className="text-xs text-red-500">{err}</p>
					</div>
				)}

				{/* input */}
				<form
					onSubmit={onSubmit}
					className="p-3 border-t border-[#66666625] bg-bgColor/30">
					<div className="relative">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={onKeyDown}
							placeholder="Ask Gemini something… (Shift+Enter for new line)"
							className={[
								"w-full rounded-2xl",
								"bg-primary border border-[#66666635]",
								"px-4 py-3 pr-14",
								"text-ascent-1 placeholder:text-ascent-2/70",
								"outline-none resize-none",
								"focus:ring-2 focus:ring-[#0444a4]/25 focus:border-[#0444a4]/50",
								"transition",
							].join(" ")}
							rows={1}
							disabled={loading}
							style={{ minHeight: 48, maxHeight: 140 }}
						/>

						<button
							type="submit"
							disabled={loading || !input.trim()}
							className={[
								"absolute right-2 bottom-2",
								"h-10 w-10 rounded-full grid place-items-center",
								"bg-[#0444a4] text-white",
								"shadow-md",
								"hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]",
								"disabled:opacity-50 disabled:cursor-not-allowed",
								"transition",
							].join(" ")}
							title="Send">
							<BsSend className="text-sm" />
						</button>
					</div>

					<div className="mt-2 flex items-center justify-between text-[11px] text-ascent-2">
						<span>
							{loading ?
								"Generating response…"
							:	"Enter to send • Shift+Enter for new line"}
						</span>
						<span>{input.length > 0 ? `${input.length} chars` : ""}</span>
					</div>
				</form>
			</div>

			{/* RIGHT: Suggestions (desktop) */}
			<div className="hidden lg:flex flex-col gap-3">
				<div className="bg-primary rounded-2xl border border-[#66666630] shadow-[0_18px_60px_rgba(0,0,0,0.08)] p-4">
					<p className="text-ascent-1 font-semibold">Shortcuts</p>
					<p className="text-xs text-ascent-2 mt-1">
						Click to instantly ask Gemini
					</p>

					<div className="mt-4 flex flex-col gap-2">
						{SUGGESTIONS.map((s) => (
							<button
								key={s.title}
								type="button"
								onClick={() => sendToBot(s.text)}
								className={[
									"text-left w-full",
									"rounded-xl px-3 py-3",
									"border border-[#66666625]",
									"bg-bgColor/30",
									"hover:bg-[#0444a408] hover:border-[#66666645]",
									"transition group",
								].join(" ")}>
								<div className="flex items-center justify-between">
									<p className="text-sm text-ascent-1 font-medium">{s.title}</p>
									<RiSparkling2Fill className="opacity-70 group-hover:opacity-100 transition" />
								</div>
								<p className="text-xs text-ascent-2 mt-1 line-clamp-2">
									{s.text}
								</p>
							</button>
						))}
					</div>
				</div>

				<div className="bg-primary rounded-2xl border border-[#66666630] p-4">
					<p className="text-sm text-ascent-1 font-semibold">Tip</p>
					<p className="text-xs text-ascent-2 mt-1">
						Add details like tech stack, deadline, and target users for better
						answers.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatBotPanel;
