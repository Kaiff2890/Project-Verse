/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { apiRequest, deletePost, fetchPosts, likePost } from "../utils";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const getPostComments = async (id) => {
	try {
		const res = await apiRequest({
			url: "/posts/comments/" + id,
			method: "GET",
		});
		return res?.data;
	} catch (error) {
		console.log("error in postcard.jsx :", error);
	}
};

const isValidUrl = (value) => {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
};

const ReplyCard = ({ reply, user, handleLike }) => {
	return (
		<div className="w-full py-3">
			<div className="flex gap-3 items-center mb-1">
				<Link to={"/profile/" + reply?.userId?._id}>
					<img
						src={reply?.userId?.profileUrl ?? NoProfile}
						alt={reply?.userId?.firstName}
						className="w-10 h-10 rounded-full object-cover"
					/>
				</Link>

				<div>
					<Link to={"/profile/" + reply?.userId?._id}>
						<p className="font-medium text-base text-ascent-1">
							{reply?.userId?.firstName} {reply?.userId?.lastName}
						</p>
					</Link>
					<span className="text-ascent-2 text-sm">
						{moment(reply?.createdAt).fromNow()}
					</span>
				</div>
			</div>

			<div className="ml-12">
				<p className="text-ascent-2 ">{reply?.comment}</p>
				<div className="mt-2 flex gap-6">
					<p
						className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
						onClick={handleLike}>
						{reply?.likes?.includes(user?._id) ?
							<BiSolidLike
								size={20}
								color="blue"
							/>
						:	<BiLike size={20} />}
						{reply?.likes?.length} Likes
					</p>
				</div>
			</div>
		</div>
	);
};

const CommentForm = ({ user, id, replyAt, getComments, postDescription }) => {
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const [suggestions, setSuggestions] = useState([]);
	const [suggestLoading, setSuggestLoading] = useState(false);
	const [suggestErr, setSuggestErr] = useState("");

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const inputValue = watch("comment") || "";

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
	};

	const onSubmit = async (data) => {
		setErrMsg("");
		setLoading(true);

		try {
			const URL =
				!replyAt ? "/posts/comment/" + id : "/posts/reply-comment/" + id;

			const newData = {
				comment: data?.comment,
				from: user?.firstName + " " + user?.lastName,
				replyAt: replyAt,
			};

			const res = await apiRequest({
				method: "POST",
				url: URL,
				data: newData,
				token: user?.token,
			});

			if (res?.status === "failed") {
				setErrMsg(res);
			} else {
				reset({ comment: "" });
				setErrMsg("");
				setSuggestions([]);
				setSuggestErr("");
				await getComments();
				await fetchPost();
			}
		} catch (error) {
			console.log("error in postcard.jsx :", error.message);
			setErrMsg({ message: error.message, status: "failed" });
		} finally {
			setLoading(false);
		}
	};

	const handleSuggest = async () => {
		try {
			setSuggestLoading(true);
			setSuggestErr("");
			setSuggestions([]);

			const desc = (postDescription || "").trim();

			if (!desc || desc.length < 5) {
				setSuggestErr("Post description too short for suggestions.");
				setSuggestLoading(false);
				return;
			}

			const endpoint =
				replyAt ?
					`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/genrate/suggest-replies"
				:	`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/genrate/suggest-comments";

			const payload =
				replyAt ?
					{
						text: desc,
						comment: inputValue.trim() || "",
						replyTo: replyAt,
					}
				:	{ text: desc };

			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (!res.ok || data?.success === false) {
				throw new Error(data?.message || "Failed to get suggestions");
			}

			const list = data?.suggestions || [];
			setSuggestions(Array.isArray(list) ? list.slice(0, 3) : []);
		} catch (e) {
			setSuggestErr(e?.message || "Something went wrong");
		} finally {
			setSuggestLoading(false);
		}
	};

	const applySuggestion = (text) => {
		setValue("comment", text, { shouldValidate: true, shouldDirty: true });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full border-b border-[#66666645]">
			<div className="w-full flex items-center gap-2 py-4">
				<img
					src={user?.profileUrl ?? NoProfile}
					alt="User Image"
					className="w-10 h-10 rounded-full object-cover"
				/>

				<div className="w-full">
					<div className="relative w-full">
						<TextInput
							name="comment"
							styles="w-full rounded-full py-3"
							placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
							register={register("comment", {
								required: "Comment can not be empty",
							})}
							error={errors.comment ? errors.comment.message : ""}
						/>

						<button
							type="button"
							onClick={handleSuggest}
							disabled={suggestLoading}
							className="absolute right-4 top-[35px] -translate-y-1/2 text-ascent-2 hover:text-ascent-1 disabled:opacity-50"
							title={replyAt ? "Suggest replies" : "Suggest comments"}>
							<RiSparkling2Fill size={18} />
						</button>
					</div>

					<div className="mt-2">
						{suggestLoading && (
							<p className="text-xs text-ascent-2">
								{replyAt ? "Generating replies..." : "Generating comments..."}
							</p>
						)}

						{suggestErr && <p className="text-xs text-red-500">{suggestErr}</p>}

						{suggestions?.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{suggestions.map((s, idx) => (
									<button
										key={idx}
										type="button"
										onClick={() => applySuggestion(s)}
										className="text-xs px-3 py-1 rounded-full border border-[#66666645] bg-bgColor text-ascent-1 hover:border-[#66666670]">
										{s}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{errMsg?.message && (
				<span
					role="alert"
					className={`text-sm ${
						errMsg?.status === "failed" ?
							"text-[#f64949fe]"
						:	"text-[#2ba150fe]"
					} mt-0.5`}>
					{errMsg?.message}
				</span>
			)}

			<div className="flex items-end justify-end pb-2">
				{loading ?
					<Loading />
				:	<CustomButton
						title="Submit"
						type="submit"
						onClick={handleSubmit(onSubmit)}
						containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm"
					/>
				}
			</div>
		</form>
	);
};

const PostCard = ({ post, user }) => {
	const [showAll, setShowAll] = useState(0);
	const [showReply, setShowReply] = useState(0);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [replyComments, setReplyComments] = useState(0);
	const [showComments, setShowComments] = useState(0);

	const [summary, setSummary] = useState("");
	const [summaryLoading, setSummaryLoading] = useState(false);
	const [summaryError, setSummaryError] = useState("");

	const dispatch = useDispatch();

	const getComments = async (id) => {
		setReplyComments(0);
		if (comments.length === 0) setLoading(true);
		const result = await getPostComments(id);
		setComments(result || []);
		setLoading(false);
	};

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
	};

	const handelDelete = async (token, id) => {
		await deletePost(token, id);
		await fetchPost();
	};

	const handleLike = async (uri) => {
		await likePost(user?.token, uri);
		await getComments(post?._id);
		await fetchPost();
	};

	// ✅ open github safely
	const handleViewProject = () => {
		const url = (post?.gitUrl || "").trim();
		if (!url) return;

		// Only allow github links to avoid open-redirect issues
		const isGithub = /^https?:\/\/(www\.)?github\.com\/.+/i.test(url);
		if (!isGithub) {
			alert("Invalid GitHub URL in this post.");
			return;
		}

		window.open(url, "_blank", "noopener,noreferrer");
	};

	const handleSummarize = async () => {
		try {
			setSummaryLoading(true);
			setSummaryError("");
			setSummary("");

			const text = (post?.description || "").trim();
			if (!text || text.length < 10) {
				setSummaryError("Post is too short to summarize.");
				setSummaryLoading(false);
				return;
			}

			const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/genrate/summarize-post", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text }),
			});

			const data = await res.json();

			if (!res.ok || data?.success === false) {
				throw new Error(data?.message || "Failed to summarize");
			}

			setSummary(data?.summary || "");
		} catch (e) {
			setSummaryError(e?.message || "Something went wrong");
		} finally {
			setSummaryLoading(false);
		}
	};

	return (
		<div className="mb-2 pcard2-glass rounded-2xl p-5 pcard2-lift group overflow-hidden relative">
			{/* Top accent */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] pcard2-accent" />
			<div className="flex gap-3 items-center mb-3">
				<Link to={"/profile/" + post?.userId?._id}>
					<img
						src={post?.userId?.profileUrl ?? NoProfile}
						alt={post?.userId?.firstName}
						className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full"
					/>
				</Link>

				<div className="w-full flex justify-between">
					<div>
						<Link to={"/profile/" + post?.userId?._id}>
							<p className="font-medium text-lg text-ascent-1">
								{post?.userId?.firstName} {post?.userId?.lastName}
							</p>
						</Link>
						<span className="text-ascent-2">{post?.userId?.location}</span>
						<span className="md:hidden flex text-ascent-2 text-sm">
							{moment(post?.createdAt ?? "2023-05-25").fromNow()}
						</span>
					</div>

					<span className="hidden md:flex text-ascent-2">
						{moment(post?.createdAt ?? "2023-05-25").fromNow()}
					</span>
				</div>
			</div>

			<div>
				{/* ✅ If project post: show project header + button */}
				{post?.postType === "project" && (
					<div className="mb-3 rounded-xl pcard2-projectBanner px-4 py-3">
						<p className="text-xs text-ascent-2 mb-1">Project</p>

						{post?.projectCaption && (
							<p className="text-ascent-1 font-medium">
								{post?.projectCaption}
							</p>
						)}

						<div className="mt-3 flex flex-wrap gap-2">
							<button
								type="button"
								onClick={handleViewProject}
								className="inline-flex items-center gap-2 bg-[#0444a4] text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-[1.02] active:scale-[0.99] transition"
								title="Open GitHub repository">
								<BsGithub size={18} />
								View Project
							</button>

							{/* {post?.gitUrl && (
								<a
									href={post.gitUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm px-4 py-2 rounded-full border border-[#66666645] text-ascent-2 hover:text-ascent-1 hover:border-[#66666670] transition"
									title="Open GitHub link"
								>
									GitHub Link
								</a>
							)} */}
						</div>
					</div>
				)}

				{/* Description + Summarize */}
				<div className="flex gap-2 items-start">
					<p className="text-ascent-2 flex-1">
						{showAll === post?._id ?
							post?.description
						:	post?.description?.slice(0, 300)}

						{post?.description?.length > 301 &&
							(showAll === post?._id ?
								<span
									className="text-blue ml-2 font-medium cursor-pointer"
									onClick={() => setShowAll(0)}>
									Show Less
								</span>
							:	<span
									className="text-blue ml-2 font-medium cursor-pointer"
									onClick={() => setShowAll(post?._id)}>
									Show More
								</span>)}
					</p>

					<button
						type="button"
						onClick={handleSummarize}
						disabled={summaryLoading}
						className="mt-1 p-2 rounded-full border border-[#66666645] text-ascent-2 hover:text-ascent-1 hover:border-[#66666670] disabled:opacity-50"
						title="Summarize post">
						<RiSparkling2Fill size={18} />
					</button>
				</div>

				{/* Summary output */}
				<div className="mt-2">
					{summaryLoading && (
						<p className="text-sm text-ascent-2">Summarizing...</p>
					)}
					{summaryError && (
						<p className="text-sm text-red-500">{summaryError}</p>
					)}
					{summary && !summaryLoading && (
						<div className="pcard2-aiPanel rounded-xl px-4 py-3 mt-2">
							<p className="text-xs mb-1 pcard2-aiLabel">✨ AI Summary</p>
							<p className="text-sm text-ascent-1">{summary}</p>
						</div>
					)}
				</div>

				{post?.image && (
					<div className="mt-2">
						{isValidUrl(post.image) ? (
							/\.(mp4|webm|ogg|mov)$/i.test(post.image) ? (
								<video
									src={post.image}
									controls
									className="w-full rounded-lg"
								/>
							) : /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(post.image) ? (
								<img
									src={post.image}
									alt="post"
									className="w-full rounded-lg"
								/>
							) : (
								<a
									href={post.image}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-xl border border-[#66666645] bg-bgColor px-4 py-3 text-sm text-ascent-1 hover:border-[#66666670] transition"
								>
									View attachment
								</a>
							)
						) : (
							<div className="rounded-xl border border-[#66666645] bg-bgColor px-4 py-3">
								<p className="text-xs text-ascent-2 uppercase">Attachment</p>
								<p className="text-sm text-ascent-1 break-words">
									{post.image}
								</p>
							</div>
						)}
					</div>
				)}
			</div>

			<div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t pcard2-divider">
				<motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.93 }}
					className="flex gap-2 items-center text-base cursor-pointer pcard2-actionBtn pcard2-likeBtn rounded-lg px-3 py-1.5 transition-all duration-200"
					onClick={() => handleLike("/posts/like/" + post?._id)}>
					{post?.likes?.includes(user?._id) ?
						<BiSolidLike size={20} className="text-violet-400" />
					:	<BiLike size={20} />}
					<span className="text-sm">{post?.likes?.length} Likes</span>
				</motion.div>

				<motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.93 }}
					className="flex gap-2 items-center text-base cursor-pointer pcard2-actionBtn pcard2-commentBtn rounded-lg px-3 py-1.5 transition-all duration-200"
					onClick={() => {
						setShowComments(showComments === post._id ? null : post._id);
						getComments(post?._id);
					}}>
					<BiComment size={20} />
					<span className="text-sm">{post?.comments?.length} Comments</span>
				</motion.div>

				{user?._id === post?.userId?._id && (
					<motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.93 }}
						className="flex gap-1 items-center text-base cursor-pointer pcard2-actionBtn pcard2-deleteBtn rounded-lg px-3 py-1.5 transition-all duration-200"
						onClick={() => handelDelete(user?.token, post?._id)}>
						<MdOutlineDeleteOutline size={20} />
						<span className="text-sm">Delete</span>
					</motion.div>
				)}
			</div>

			{/* COMMENTS */}
			<AnimatePresence>
			{showComments === post?._id && (
				<motion.div 
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
					className="w-full mt-4 border-t border-[#66666645] pt-4 overflow-hidden">
					<CommentForm
						user={user}
						id={post?._id}
						getComments={() => getComments(post?._id)}
						postDescription={post?.description}
					/>

					{loading ?
						<Loading />
					: comments?.length > 0 ?
						comments?.map((comment) => (
							<div
								className="w-full py-2"
								key={comment?._id}>
								<div className="flex gap-3 items-center mb-1">
									<Link to={"/profile/" + comment?.userId?._id}>
										<img
											src={comment?.userId?.profileUrl ?? NoProfile}
											alt={comment?.userId?.firstName}
											className="w-10 h-10 rounded-full object-cover"
										/>
									</Link>
									<div>
										<Link to={"/profile/" + comment?.userId?._id}>
											<p className="font-medium text-base text-ascent-1">
												{comment?.userId?.firstName} {comment?.userId?.lastName}
											</p>
										</Link>
										<span className="text-ascent-2 text-sm">
											{moment(comment?.createdAt ?? "2023-05-25").fromNow()}
										</span>
									</div>
								</div>

								<div className="ml-12">
									<p className="text-ascent-2">{comment?.comment}</p>

									<div className="mt-2 flex gap-6">
										<p
											className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
											onClick={() =>
												handleLike("/posts/like-comment/" + comment?._id)
											}>
											{comment?.likes?.includes(user?._id) ?
												<BiSolidLike
													size={20}
													color="blue"
												/>
											:	<BiLike size={20} />}
											{comment?.likes?.length} Likes
										</p>

										<span
											className="text-blue cursor-pointer"
											onClick={() => setReplyComments(comment?._id)}>
											Reply
										</span>
									</div>

									{replyComments === comment?._id && (
										<CommentForm
											user={user}
											id={comment?._id}
											replyAt={comment?.from}
											getComments={() => getComments(post?._id)}
											postDescription={post?.description}
										/>
									)}
								</div>

								<div className="py-2 px-8 mt-6">
									{comment?.replies?.length > 0 && (
										<p
											className="text-base text-ascent-1 cursor-pointer"
											onClick={() =>
												setShowReply(
													showReply === comment?.replies?._id ?
														0
													:	comment?.replies?._id,
												)
											}>
											Show Replies ({comment?.replies?.length})
										</p>
									)}

									{showReply === comment?.replies?._id &&
										comment?.replies?.map((reply) => (
											<ReplyCard
												reply={reply}
												user={user}
												key={reply?._id}
												handleLike={() =>
													handleLike(
														"/posts/like-comment/" +
															comment?._id +
															"/" +
															reply?._id,
													)
												}
											/>
										))}
								</div>
							</div>
						))
					:	<span className="flex text-sm py-4 text-ascent-2 text-center">
							No Comments, be first to comment
						</span>
					}
				</motion.div>
			)}
			</AnimatePresence>

			<style>{`
        .pcard2-glass{
          background: rgba(13,13,26,0.58);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 2px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        [data-theme="light"] .pcard2-glass{
          background: rgba(255,255,255,0.75);
          border-color: rgba(0,0,0,0.08);
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
        }
        .pcard2-glass.pcard2-lift:hover{
          border-color: rgba(139,92,246,0.30);
          box-shadow: 0 6px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        [data-theme="light"] .pcard2-glass.pcard2-lift:hover{
          border-color: rgba(109,40,217,0.20);
          box-shadow: 0 6px 30px rgba(0,0,0,0.10);
        }
        .pcard2-lift{ transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; will-change:transform; }
        .pcard2-lift:hover{ transform: translateY(-2px); }
        .pcard2-accent{
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.6) 35%, rgba(34,211,238,0.5) 65%, transparent);
          opacity:0;
          transition: opacity .3s ease;
        }
        .pcard2-lift:hover .pcard2-accent{ opacity:1; }
        .pcard2-divider{ border-color: rgba(255,255,255,0.07); }
        [data-theme="light"] .pcard2-divider{ border-color: rgba(0,0,0,0.08); }
        .pcard2-actionBtn{ color: rgba(164,161,180,1); }
        .pcard2-likeBtn:hover{ background: rgba(139,92,246,0.12); color: rgba(167,139,250,1); box-shadow: 0 0 12px rgba(139,92,246,0.20); }
        .pcard2-commentBtn:hover{ background: rgba(34,211,238,0.10); color: rgba(34,211,238,1); box-shadow: 0 0 12px rgba(34,211,238,0.18); }
        .pcard2-deleteBtn:hover{ background: rgba(239,68,68,0.10); color: rgba(248,113,113,1); }
        .pcard2-aiPanel{
          background: rgba(34,211,238,0.06);
          border: 1px solid rgba(34,211,238,0.22);
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .pcard2-aiPanel{
          background: rgba(6,182,212,0.06);
          border-color: rgba(6,182,212,0.20);
        }
        .pcard2-aiLabel{ color: rgba(34,211,238,0.9); text-transform: uppercase; letter-spacing:.08em; font-size:11px; }
        [data-theme="light"] .pcard2-aiLabel{ color: rgba(6,90,216,0.8); }
        .pcard2-projectBanner{
          background: rgba(139,92,246,0.07);
          border: 1px solid rgba(139,92,246,0.22);
        }
        [data-theme="light"] .pcard2-projectBanner{
          background: rgba(109,40,217,0.05);
          border-color: rgba(109,40,217,0.18);
        }
        .pcard2-suggestionPill{
          background: rgba(139,92,246,0.10);
          border: 1px solid rgba(139,92,246,0.28);
          color: rgba(167,139,250,1);
        }
        .pcard2-suggestionPill:hover{
          background: rgba(139,92,246,0.20);
          border-color: rgba(139,92,246,0.50);
        }
        [data-theme="light"] .pcard2-suggestionPill{
          background: rgba(109,40,217,0.08);
          border-color: rgba(109,40,217,0.22);
          color: rgba(109,40,217,1);
        }
      `}</style>
		</div>
	);
};

export default PostCard;
