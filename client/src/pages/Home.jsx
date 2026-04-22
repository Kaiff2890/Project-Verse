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
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiSparkling2Fill } from "react-icons/ri";
import { AiOutlineFile, AiOutlinePicture, AiOutlineProject } from "react-icons/ai";
import { MdVideoLibrary } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
	apiFormRequest,
	apiRequest,
	fetchPosts,
	getUserInfo,
	likePost,
	sendFriendRequest,
} from "../utils";
import { UserLogin } from "../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
	const { edit } = useSelector((state) => state.user);
	const user = JSON.parse(localStorage.getItem("user"));
	const { posts } = useSelector((state) => state.posts);

	const [friendRequest, setFriendRequest] = useState([]);
	const [suggestedFriends, setSuggestedFriends] = useState([]);
	const [errMsg, setErrMsg] = useState("");
	const [posting, setPosting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [attachments, setAttachments] = useState({ files: [], images: [], videos: [], projectFiles: [] });
	const [projectUrl, setProjectUrl] = useState("");
	const [projectCaption, setProjectCaption] = useState("");
	const [showProjectOptions, setShowProjectOptions] = useState(false);
const [previewFiles, setPreviewFiles] = useState([]);

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

	const handleGenerateCaption = async () => {
		try {
			setCaptionLoading(true);
			setCaptionError("");
			setAiCaption("");

			const text = descriptionValue.trim();

			if (!text) {
				setCaptionError("Type something first.");
				setCaptionLoading(false);
				return;
			}

			const res = await fetch(
				`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/genrate/generate-caption",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ text }),
				},
			);

			const data = await res.json();

			if (!res.ok || data?.success === false) {
				throw new Error(data?.message || "Failed to generate caption");
			}

			setAiCaption(data?.generated || data?.caption || "");
		} catch (e) {
			setCaptionError(e?.message || "Something went wrong");
			setAiCaption("");
		} finally {
			setCaptionLoading(false);
		}
	};

	const updateAttachments = (key, files) => {
		setAttachments((prev) => ({
			...prev,
			[key]: Array.from(files),
		}));
	};

	const handleFileSelection = (event) => {
		updateAttachments("files", event.target.files);
	};

	const handleImageSelection = (event) => {
		updateAttachments("images", event.target.files);
	};


	const handleVideoSelection = (event) => {
		updateAttachments("videos", event.target.files);
	};

	const handleProjectFileSelection = (event) => {
		updateAttachments("projectFiles", event.target.files);
		setShowProjectOptions(true);
	};

	React.useEffect(() => {
		const allFiles = [
			...attachments.images,
			...attachments.videos,
			...attachments.projectFiles,
			...attachments.files,
		];

		const previews = allFiles.map((file) => ({
			file,
			url: (file.type.startsWith("image/") || file.type.startsWith("video/"))
				? URL.createObjectURL(file)
				: null,
			isVideo: file.type.startsWith("video/"),
		}));

		setPreviewFiles(previews);

		return () => {
			previews.forEach((item) => {
				if (item.url) URL.revokeObjectURL(item.url);
			});
		};
	}, [attachments]);

	const handlePostSubmit = async (data) => {
		setPosting(true);
		setErrMsg("");

		const hasProject = attachments.projectFiles.length > 0 || projectUrl.trim().length > 0;

		if (hasProject && !projectCaption.trim()) {
			setErrMsg({ status: "failed", message: "Project caption is required." });
			setPosting(false);
			return;
		}

		if (projectUrl.trim() && !/^https?:\/\/(www\.)?github\.com\/.+/i.test(projectUrl.trim())) {
			setErrMsg({ status: "failed", message: "Please enter a valid GitHub URL." });
			setPosting(false);
			return;
		}

		try {
const postType = hasProject
			? "project"
			: attachments.videos.length
			? "video"
			: attachments.images.length
			? "image"
			: "text";

		const selectedFile =
			attachments.projectFiles[0] ||
			attachments.videos[0] ||
			attachments.images[0] ||
			attachments.files[0] ||
			null;

		let res;

		if (selectedFile) {
			const formData = new FormData();
			formData.append("description", data.description.trim());
			formData.append("postType", postType);
			formData.append("file", selectedFile);

			if (hasProject) {
				formData.append("projectCaption", projectCaption.trim());
				if (projectUrl.trim()) formData.append("gitUrl", projectUrl.trim());
			}

			res = await apiFormRequest({
				method: "POST",
				url: "/posts/create-post",
				data: formData,
				token: user?.token,
			});
		} else {
			const postData = {
				...data,
				postType,
				projectCaption: hasProject ? projectCaption.trim() : undefined,
				gitUrl: hasProject && projectUrl.trim() ? projectUrl.trim() : undefined,
			};

			res = await apiRequest({
				method: "POST",
				url: "/posts/create-post",
				data: postData,
				token: user?.token,
			});
		}

			if (res?.sucess === true) {
				reset({
					description: "",
				});
				setAttachments({ files: [], images: [], videos: [], projectFiles: [] });
				setProjectUrl("");
				setProjectCaption("");
				setShowProjectOptions(false);
				setErrMsg("");
				setAiCaption("");
				setCaptionError("");
				await fetchPost();
			} else {
				setErrMsg({
					status: "failed",
					message: res?.message || "Failed to create post. Please check the file size or try again.",
				});
			}
		} catch (error) {
			console.log("error in home.jsx :", error);
			setErrMsg({ status: "failed", message: "Failed to create post." });
		} finally {
			setPosting(false);
		}
	};

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

	const handelFriendRequet = async (id) => {
		try {
			await sendFriendRequest(user.token, id);
			await fetchsuggestedFriends();
		} catch (error) {
			console.log(error);
		}
	};

	const acceptFriendRequet = async (id, status) => {
		try {
			const res = await apiRequest({
				url: "/users/accept-request",
				token: user?.token,
				method: "POST",
				data: { rid: id, status },
			});
			setFriendRequest(res?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getUsers = async () => {
		const res = await getUserInfo(user?.token);
		const newData = { token: user?.token, ...res };
		dispatch(UserLogin(newData));
	};

	useEffect(() => {
		setLoading(true);
		fetchFrienduesReqests();
		fetchsuggestedFriends();
		getUsers();
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="w-full px-0 lg:px-10 pb-5 2xl:px-40 home-bg min-h-screen relative">
				{/* ── Futuristic Background Layer ── */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
					{/* Deep-space base */}
					<div className="absolute inset-0 home-deepspace" />
					{/* Violet orb — top-left */}
					<motion.div
						animate={{ scale:[1,1.15,1], opacity:[0.18,0.28,0.18] }}
						transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
						className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-[110px]"
						style={{ background:"radial-gradient(circle, rgba(109,40,217,0.55), transparent 70%)" }}
					/>
					{/* Cyan orb — bottom-right */}
					<motion.div
						animate={{ scale:[1,1.2,1], opacity:[0.12,0.22,0.12] }}
						transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:2 }}
						className="absolute -bottom-32 -right-32 w-[650px] h-[650px] rounded-full blur-[130px]"
						style={{ background:"radial-gradient(circle, rgba(6,182,212,0.45), transparent 70%)" }}
					/>
					{/* Fuchsia orb — center */}
					<motion.div
						animate={{ scale:[1,1.1,1], opacity:[0.06,0.13,0.06] }}
						transition={{ duration:18, repeat:Infinity, ease:"easeInOut", delay:5 }}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
						style={{ background:"radial-gradient(circle, rgba(217,70,239,0.30), transparent 70%)" }}
					/>
					{/* Subtle grid mesh */}
					<div className="absolute inset-0 home-grid" />
					{/* Multi-color floating particles */}
					{Array.from({ length: 35 }).map((_, i) => {
						const colors = [
							"rgba(139,92,246,0.9)",
							"rgba(34,211,238,0.9)",
							"rgba(232,121,249,0.85)",
							"rgba(99,102,241,0.9)",
							"rgba(255,255,255,0.6)",
						];
						const color = colors[i % colors.length];
						const size = Math.random() * 3 + 1.5;
						return (
							<motion.div
								key={i}
								className="absolute rounded-full"
								style={{
									width: size + "px", height: size + "px",
									background: color,
									boxShadow: `0 0 ${size * 3}px ${color}`,
									left: Math.random() * 100 + "%",
									top: Math.random() * 100 + "%",
								}}
								animate={{
									y: [0, -(120 + Math.random() * 120)],
									x: [0, (Math.random() - 0.5) * 60],
									opacity: [0, Math.random() * 0.7 + 0.2, 0],
								}}
								transition={{
									duration: Math.random() * 14 + 10,
									repeat: Infinity, ease: "linear",
									delay: Math.random() * 10,
								}}
							/>
						);
					})}
				</div>

				<div className="pointer-events-none absolute inset-0 home-grid-mask" />

				<TopBar />

				<div className="w-full flex gap-3 lg:gap-6 pt-5 pb-5 relative z-10">
					{/* LEFT */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 pr-1 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
						<ProfileCard user={user} />
						<FriendsCard friends={user?.friends} />
					</motion.div>

					{/* CENTER */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
						className="flex-1 px-2 flex flex-col gap-5 rounded-2xl pb-10">
						<form
							onSubmit={handleSubmit(handlePostSubmit)}
							className="home-formGlass px-4 sm:px-5 rounded-2xl home-cardLift overflow-hidden relative">
							<div className="w-full flex items-start gap-3 py-5 border-b border-[#66666625]">
								<img
									src={user?.profileUrl ?? NoProfile}
									alt="User Image"
									className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-[#66666630] shadow-sm"
								/>

								<div className="w-full">
									<TextInput
										styles="w-full rounded-full py-5 transition-all duration-200 focus:scale-[1.01] focus:shadow-[0_0_0_6px_rgba(6,90,216,0.12)]"
										placeholder="What's on your mind...."
										disabled={captionLoading}
										register={register("description", {
											required: "Write something about post",
										})}
										error={errors.description ? errors.description.message : ""}
										rightIcon={
											captionLoading ?
												<span className="text-xs opacity-70 animate-pulse">
													...
												</span>
											:	<RiSparkling2Fill
													size={20}
													className="home-sparkle"
												/>
										}
										onRightIconClick={handleGenerateCaption}
									/>

									{/* ✅ AI caption result */}
									<div className="w-full mt-3">
										{captionLoading && (
											<p className="text-sm text-ascent-2 animate-pulse">
												Generating caption...
											</p>
										)}

										{captionError && (
											<p className="text-sm text-red-500 home-shake">
												{captionError}
											</p>
										)}

										{aiCaption && !captionLoading && (
											<div className="bg-bgColor border border-[#66666635] rounded-2xl px-4 py-3 shadow-soft animate-softPop">
												<div className="flex items-center justify-between">
													<p className="text-xs text-ascent-2 mb-1 flex items-center gap-2">
														<span className="inline-block h-2 w-2 rounded-full bg-blue home-pingSlow" />
														AI Caption
													</p>
													<span className="text-[11px] text-ascent-2/70">
														ready
													</span>
												</div>

												<p className="text-sm text-ascent-1 leading-relaxed">
													{aiCaption}
												</p>
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
									} mt-2 inline-block animate-softPop`}>
									{errMsg?.message}
								</span>
							)}

							<div className="flex flex-col gap-3 py-4">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<div className="flex flex-wrap gap-2 items-center">
										<label className="inline-flex items-center gap-2 rounded-full border border-[#66666640] bg-[#0b3f82]/10 px-4 py-2 text-sm text-ascent-1 cursor-pointer transition hover:border-[#0444a4] hover:bg-[#0444a4]/20">
											<AiOutlineFile size={18} />
											<span>Upload files</span>
											<input
												type="file"
												accept=".zip,.pdf,.doc,.docx,.ppt,.pptx,.txt"
												hidden
												onChange={handleFileSelection}
												multiple
											/>
										</label>

										<label className="inline-flex items-center gap-2 rounded-full border border-[#66666640] bg-[#0f5bb7]/10 px-4 py-2 text-sm text-ascent-1 cursor-pointer transition hover:border-[#0444a4] hover:bg-[#0444a4]/20">
											<AiOutlinePicture size={18} />
											<span>Images</span>
											<input
												type="file"
												accept="image/*"
												hidden
												onChange={handleImageSelection}
												multiple
											/>
										</label>

										<button
											type="button"
											onClick={() => setShowProjectOptions(true)}
											className="inline-flex items-center gap-2 rounded-full border border-[#66666640] bg-[#1d4ed8]/10 px-4 py-2 text-sm text-ascent-1 cursor-pointer transition hover:border-[#0444a4] hover:bg-[#0444a4]/20"
										>
											<AiOutlineProject size={18} />
											<span>Project</span>
										</button>


										<label className="inline-flex items-center gap-2 rounded-full border border-[#66666640] bg-[#1a1a3e]/10 px-4 py-2 text-sm text-ascent-1 cursor-pointer transition hover:border-[#0444a4] hover:bg-[#0444a4]/20">
											<MdVideoLibrary size={18} />
											<span>Video</span>
											<input
												type="file"
												accept="video/*"
												hidden
												onChange={handleVideoSelection}
												multiple
											/>
										</label>
									</div>

									<div className="flex items-center gap-2">
										{posting ? (
											<Loading />
										) : (
											<CustomButton
												type="submit"
												title="Post"
												containerStyles="bg-[#0444a4] text-white py-2 px-7 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 home-postBtn"
											/>
										)}
									</div>
								</div>

								{showProjectOptions && (
									<div className="mt-4 rounded-2xl border border-[#66666630] bg-[#0f172a]/70 p-4 text-sm text-ascent-1 sm:col-span-2">
										<p className="mb-3 font-semibold text-ascent-2">Project details</p>
										<div className="grid gap-3 sm:grid-cols-2">
											<input
												value={projectUrl}
												onChange={(e) => setProjectUrl(e.target.value)}
												placeholder="GitHub repository URL"
												className="w-full rounded-2xl border border-[#66666645] bg-bgColor/70 px-4 py-3 text-ascent-1 outline-none transition duration-200 focus:border-[#0444a4] focus:ring-2 focus:ring-[#0444a4]/20"
											/>
											<input
												value={projectCaption}
												onChange={(e) => setProjectCaption(e.target.value)}
												placeholder="Project title or caption"
												className="w-full rounded-2xl border border-[#66666645] bg-bgColor/70 px-4 py-3 text-ascent-1 outline-none transition duration-200 focus:border-[#0444a4] focus:ring-2 focus:ring-[#0444a4]/20"
											/>
										</div>
										<label className="inline-flex items-center justify-center gap-2 rounded-full border border-[#66666640] bg-[#0b3f82]/10 px-4 py-2 text-sm text-ascent-1 cursor-pointer transition hover:border-[#0444a4] hover:bg-[#0444a4]/20">
										Upload project files
										<input
											type="file"
											accept=".zip,.rar,.tar,.gz,.7z,.pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.csv,.json,.js,.jsx,.ts,.tsx,.html,.css"
											hidden
											onChange={handleProjectFileSelection}
											multiple
										/>
									</label>
										<p className="mt-3 text-xs text-ascent-2">
											Upload project files, add a GitHub repo link, or both. Files can be .zip, .pdf, .docx, .pptx, .js, .json and more.
										</p>
									</div>
								)}

								<div className="flex flex-wrap items-center justify-between gap-2">
									{attachments.files.length > 0 && (
										<span className="rounded-full bg-[#0444a4]/10 px-3 py-1 text-xs text-ascent-1">
											{attachments.files.length} file{attachments.files.length > 1 ? "s" : ""}
										</span>
									)}
									{attachments.images.length > 0 && (
										<span className="rounded-full bg-[#0444a4]/10 px-3 py-1 text-xs text-ascent-1">
											{attachments.images.length} image{attachments.images.length > 1 ? "s" : ""}
										</span>
									)}
									{attachments.videos.length > 0 && (
										<span className="rounded-full bg-[#0444a4]/10 px-3 py-1 text-xs text-ascent-1">
											{attachments.videos.length} video{attachments.videos.length > 1 ? "s" : ""}
										</span>
									)}
					{attachments.projectFiles.length > 0 && (
						<span className="rounded-full bg-[#0444a4]/10 px-3 py-1 text-xs text-ascent-1">
							{attachments.projectFiles.length} project file{attachments.projectFiles.length > 1 ? "s" : ""}
						</span>
					)}
							</div>

					{previewFiles.length > 0 && (
						<div className="grid gap-3 sm:grid-cols-2 mt-3">
							{previewFiles.map(({ file, url, isVideo }, idx) => (
								<div
									key={idx}
									className={`rounded-2xl border border-[#66666635] bg-bgColor/80 overflow-hidden ${
										isVideo ? "col-span-full" : "flex items-center gap-3 px-4 py-3"
									}`}
								>
									{isVideo && url ? (
										<div className="relative w-full bg-black rounded-2xl overflow-hidden">
											<video
												src={url}
												className="w-full max-h-72 object-contain"
												controls
												preload="metadata"
											/>
											<div className="px-4 py-2 flex items-center gap-2 border-t border-[#66666625]">
												<MdVideoLibrary size={14} className="text-ascent-2 shrink-0" />
												<p className="truncate text-xs font-medium text-ascent-1">{file.name}</p>
												<span className="ml-auto text-xs text-ascent-2 shrink-0">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
											</div>
										</div>
									) : url ? (
										<>
											<img
												alt={file.name}
												src={url}
												className="h-16 w-16 rounded-xl object-cover"
											/>
											<div className="min-w-0">
												<p className="truncate text-sm font-medium text-ascent-1">{file.name}</p>
												<p className="text-xs text-ascent-2">{(file.size / 1024).toFixed(1)} KB</p>
											</div>
										</>
									) : (
										<>
											<div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#66666645] bg-[#0f172a] text-[10px] text-ascent-2 text-center px-2">
												{file.name.split(".").pop().toUpperCase()}
											</div>
											<div className="min-w-0">
												<p className="truncate text-sm font-medium text-ascent-1">{file.name}</p>
												<p className="text-xs text-ascent-2">{(file.size / 1024).toFixed(1)} KB</p>
											</div>
										</>
									)}
								</div>
							))}
						</div>
					)}
    {loading ? (
                                <div className="home-cardLift">
                                    <Loading />
                                </div>
                            ) : posts?.length > 0 ? (
								<AnimatePresence>
                                {posts?.map((post) => (
								<motion.div
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									key={post?._id}
									className="home-cardLift group">
									<PostCard
										post={post}
										user={user}
									/>
								</motion.div>
								))}
								</AnimatePresence>
						                            ) : (
								<div className="flex w-full h-full items-center justify-center home-cardLift rounded-2xl">
									<p className="text-lg text-ascent-2">No Post Available</p>
								</div>
							)}
                        </div>
					</form>
				</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
						className="hidden w-1/4 lg:flex flex-col gap-6 pl-1 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">
						{/* FRIEND REQUEST */}
						<div className="w-full home-glassPanel rounded-2xl px-5 py-5 home-cardLift overflow-hidden relative">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] home-panelAccentViolet" />
							<div className="flex items-center justify-between pb-3 border-b home-divider">
								<span className="text-base font-semibold text-ascent-1 tracking-wide">Friend Requests</span>
								<span className="home-badge home-badgeViolet text-xs font-bold px-2.5 py-1 rounded-full">{friendRequest?.length}</span>
							</div>

							<div className="w-full flex flex-col gap-4 pt-4">
								{friendRequest?.map(({ _id, requestFrom: from }) => (
									<div
										key={_id}
										className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-[#0444a408] transition">
										<Link
											to={"/profile/" + from._id}
											className="w-full flex gap-3 items-center cursor-pointer">
											<img
												src={from?.profileUrl ?? NoProfile}
												alt={from?.firstName}
												className="w-10 h-10 object-cover rounded-full ring-2 ring-[#66666630]"
											/>
											<div className="flex-1 min-w-0">
												<p className="text-base font-medium text-ascent-1 truncate">
													{from?.firstName} {from?.lastName}
												</p>
												<span className="text-sm text-ascent-2">
													{from?.profession ?? "No Profession"}
												</span>
											</div>
										</Link>

										<div className="flex gap-2">
											<CustomButton
												title="Accept"
												onClick={() => acceptFriendRequet(_id, "Accepted")}
												containerStyles="bg-[#0444a4] text-xs text-white px-3 py-2 rounded-full hover:scale-[1.03] active:scale-[0.99] transition"
											/>
											<CustomButton
												title="Deny"
												onClick={() => acceptFriendRequet(_id, "Denied")}
												containerStyles="border border-[#666] text-xs text-ascent-1 px-3 py-2 rounded-full hover:bg-[#00000008] transition"
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* SUGGESTED FRIENDS */}
						<div className="w-full home-glassPanel rounded-2xl px-5 py-5 home-cardLift overflow-hidden relative">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] home-panelAccentCyan" />
							<div className="flex items-center justify-between pb-3 border-b home-divider">
								<span className="text-base font-semibold text-ascent-1 tracking-wide">Suggestions</span>
							</div>
							<div className="w-full flex flex-col gap-1.5 pt-3">
								{suggestedFriends?.map((friend) => (
									<div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 transition-all duration-200 home-friendRow" key={friend._id}>
										<Link to={"/profile/" + friend?._id} className="w-full flex gap-3 items-center cursor-pointer">
											<div className="home-avatarRing rounded-full p-[2px] shrink-0">
												<img src={friend?.profileUrl ?? NoProfile} alt={friend?.firstName} className="w-9 h-9 object-cover rounded-full" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-ascent-1 truncate">{friend?.firstName} {friend?.lastName}</p>
												<span className="text-xs text-ascent-2">{friend?.profession ?? "No Profession"}</span>
											</div>
										</Link>
										<button className="home-addBtn p-2 rounded-full transition-all duration-200" onClick={() => handelFriendRequet(friend?._id)}>
											<BsPersonFillAdd size={18} className="home-addIcon" />
										</button>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				{/* UI-only animations */}
				<style>{`
  /* ── Background ── */
  .home-bg{ background: #06060f; }
  [data-theme="light"] .home-bg{ background: rgb(var(--color-bg)); }

  .home-deepspace{
    background: linear-gradient(135deg, #06060f 0%, #0d0620 40%, #060d1a 70%, #06060f 100%);
  }
  [data-theme="light"] .home-deepspace{ display:none; }

  .home-grid{
    background-image: linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px);
    background-size: 44px 44px;
    animation: homeGridPulse 20s ease-in-out infinite;
  }
  [data-theme="light"] .home-grid{ opacity:.3; }
  @keyframes homeGridPulse{ 0%,100%{opacity:.6;} 50%{opacity:1;} }

  .home-grid-mask{
    background:
      radial-gradient(700px 420px at 15% 10%, rgba(109,40,217,0.12), transparent 60%),
      radial-gradient(700px 420px at 85% 25%, rgba(6,182,212,0.08), transparent 62%),
      radial-gradient(700px 520px at 50% 92%, rgba(217,70,239,0.06), transparent 60%);
    animation: homeBg 20s ease-in-out infinite;
    opacity:1;
  }
  @keyframes homeBg{
    0%,100%{ transform: scale(1); }
    50%{ transform: scale(1.04); }
  }

  /* ── Glass panel ── */
  .home-formGlass{
    background: rgba(13,13,26,0.60);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 4px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05);
  }
  [data-theme="light"] .home-formGlass{
    background: rgba(255,255,255,0.78);
    border-color: rgba(109,40,217,0.12);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }

  .home-glassPanel{
    background: rgba(13,13,26,0.60);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 4px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05);
  }
  [data-theme="light"] .home-glassPanel{
    background: rgba(255,255,255,0.78);
    border-color: rgba(109,40,217,0.12);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }

  /* ── Panel accents ── */
  .home-panelAccentViolet{
    background: linear-gradient(90deg, transparent, rgba(139,92,246,0.9) 40%, rgba(99,102,241,0.8) 70%, transparent);
    animation: panelAccentPulse 4s ease-in-out infinite;
  }
  .home-panelAccentCyan{
    background: linear-gradient(90deg, transparent, rgba(34,211,238,0.9) 40%, rgba(6,182,212,0.7) 70%, transparent);
    animation: panelAccentPulse 5s ease-in-out infinite;
  }
  @keyframes panelAccentPulse{ 0%,100%{opacity:.6;} 50%{opacity:1;} }

  /* ── Divider ── */
  .home-divider{ border-color: rgba(255,255,255,0.07); }
  [data-theme="light"] .home-divider{ border-color: rgba(0,0,0,0.08); }

  /* ── Badges ── */
  .home-badge{ display:inline-flex; align-items:center; }
  .home-badgeViolet{
    background: rgba(139,92,246,0.15);
    border: 1px solid rgba(139,92,246,0.35);
    color: rgba(167,139,250,1);
  }
  [data-theme="light"] .home-badgeViolet{
    background: rgba(109,40,217,0.10);
    border-color: rgba(109,40,217,0.25);
    color: rgba(109,40,217,1);
  }

  /* ── Avatar ring ── */
  .home-avatarRing{
    background: linear-gradient(135deg, rgba(139,92,246,0.8), rgba(34,211,238,0.7));
    transition: box-shadow .25s ease;
  }
  .home-friendRow:hover .home-avatarRing{ box-shadow: 0 0 12px rgba(139,92,246,0.4); }

  /* ── Friend row ── */
  .home-friendRow{ transition: background .2s ease; }
  .home-friendRow:hover{ background: rgba(139,92,246,0.08); }
  [data-theme="light"] .home-friendRow:hover{ background: rgba(109,40,217,0.05); }

  /* ── Accept / Deny buttons ── */
  .home-acceptBtn{
    background: linear-gradient(135deg, rgba(109,40,217,0.9), rgba(99,102,241,0.9));
    border: 1px solid rgba(139,92,246,0.40);
    box-shadow: 0 0 12px rgba(109,40,217,0.25);
  }
  .home-acceptBtn:hover{ box-shadow: 0 0 20px rgba(109,40,217,0.45); transform:scale(1.04); }
  .home-denyBtn{
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .home-denyBtn:hover{ background: rgba(239,68,68,0.10); border-color: rgba(239,68,68,0.25); color:rgba(248,113,113,1); }
  [data-theme="light"] .home-denyBtn{ background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.12); }

  /* ── Add friend button ── */
  .home-addBtn{
    border: 1px solid rgba(34,211,238,0.28);
    background: rgba(34,211,238,0.08);
  }
  .home-addBtn:hover{
    background: rgba(34,211,238,0.18);
    border-color: rgba(34,211,238,0.55);
    box-shadow: 0 0 14px rgba(34,211,238,0.30);
    transform: scale(1.08);
  }
  .home-addBtn:active{ transform:scale(0.95); }
  .home-addIcon{ color: rgba(34,211,238,0.85); }
  .home-addBtn:hover .home-addIcon{ color: rgba(34,211,238,1); }

  /* ── Card lift ── */
  .home-cardLift{
    transition: transform .25s ease, box-shadow .25s ease;
    will-change: transform;
  }
  .home-cardLift:hover{ transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }

  /* ── Animations preserved ── */
  .animate-homeIn{ animation: homeIn .55s ease-out both; }
  .animate-softPop{ animation: softPop .45s ease-out both; }
  @keyframes homeIn{ from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
  @keyframes softPop{ from{opacity:0;transform:translateY(8px) scale(.99);} to{opacity:1;transform:translateY(0) scale(1);} }

  .home-sparkle{
    animation: sparkle 2.2s ease-in-out infinite;
    color: rgba(167,139,250,1);
    filter: drop-shadow(0 0 8px rgba(139,92,246,0.6));
  }
  @keyframes sparkle{ 0%,100%{transform:rotate(0deg) scale(1);} 50%{transform:rotate(10deg) scale(1.1);} }

  .home-postBtn{ position:relative; overflow:hidden; }
  .home-postBtn::after{
    content:""; position:absolute; inset:-2px;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
    transform: translateX(-120%); transition: transform .55s ease;
  }
  .home-postBtn:hover::after{ transform: translateX(120%); }

  .home-pingSlow{ animation: pingSlow 1.6s cubic-bezier(0,0,.2,1) infinite; }
  @keyframes pingSlow{ 0%{transform:scale(1);opacity:.9;} 70%,100%{transform:scale(2.2);opacity:0;} }

  .home-shake{ animation: shake .25s ease-in-out 2; }
  @keyframes shake{ 0%{transform:translateX(0);} 25%{transform:translateX(-2px);} 50%{transform:translateX(2px);} 75%{transform:translateX(-2px);} 100%{transform:translateX(0);} }

  @media (prefers-reduced-motion:reduce){
    .home-grid,.home-grid-mask,.animate-homeIn,.animate-softPop,.home-sparkle,.home-pingSlow,.home-shake{ animation:none !important; }
    .home-cardLift{ transition:none; }
    .home-postBtn::after{ display:none; }
  }
`}</style>
			</div>

			{edit && <EditProfile />}
		</>
	);
};

export default Home;
