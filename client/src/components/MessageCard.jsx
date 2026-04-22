/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
// import { postComments } from "../assets/data";
import {
	apiRequest,
	deletePost,
	fetchPosts,
	getUserInfo,
	likePost,
} from "../utils";
import { updateComments } from "../redux/postSlice";
import { useDispatch } from "react-redux";

const MessageCard = ({ user, chats }) => {
	const { id } = useParams();

	const [showAll, setShowAll] = useState(0);
	const [showReply, setShowReply] = useState(0);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [replyComments, setReplyComments] = useState(0);
	const [showComments, setShowComments] = useState(0);
	const [userInfo, setUserInfo] = useState(user);

	const dispatch = useDispatch();

	const getUser = async () => {
		const res = await getUserInfo(user?.token, id);
		setUserInfo(res);
	};

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
	};

	const handleLike = async (uri) => {
		await likePost(user?.token, uri);
		await fetchPost();
	};

	useEffect(() => {
		getUser();
	}, [id]);

	return (
		<div className="mb-3 bg-primary p-4 sm:p-5 rounded-2xl border border-[#66666630] shadow-[0_18px_60px_rgba(0,0,0,0.10)] backdrop-blur-sm msgCard-lift animate-msgCardIn overflow-hidden relative">
			{/* subtle top accent (UI only) */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] msgCard-accent" />

			<div className="flex gap-3 items-center mb-3 border-b border-[#66666625] pb-4">
				<Link to={"/profile/" + id}>
					<img
						src={userInfo?.profileUrl ?? NoProfile}
						alt={userInfo?.firstName}
						className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full ring-2 ring-[#66666625] shadow-sm"
					/>
				</Link>

				<div className="w-full flex justify-between gap-3">
					<div className="min-w-0">
						<Link to={"/profile/" + userInfo?._id}>
							<p className="font-semibold text-lg text-ascent-1 truncate">
								{userInfo?.firstName} {userInfo?.lastName}
							</p>
						</Link>
						<span className="text-ascent-2 text-sm">{userInfo?.location}</span>
						<span className="md:hidden flex text-ascent-2 text-xs mt-1">
							{moment(userInfo?.createdAt ?? "2023-05-25").fromNow()}
						</span>
					</div>

					<span className="hidden md:flex text-ascent-2 text-sm">
						{moment(userInfo?.createdAt ?? "2023-05-25").fromNow()}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{chats?.map((chat) => {
					return (
						<div
							className={`chat ${
								chat?.sender === user?._id ? "chat-end" : "chat-start"
							} animate-msgPop`}
						>
							<div className="chat-image avatar">
								<div className="w-10 rounded-full ring-2 ring-[#66666625] shadow-sm">
									<img
										alt={chat?.sender?.firstName}
										src={
											chat?.sender === user?._id
												? (user?.profileUrl ?? NoProfile)
												: (userInfo?.profileUrl ?? NoProfile)
										}
									/>
								</div>
							</div>

							<div className="chat-header text-xs sm:text-sm text-ascent-2 flex items-center gap-2">
								<span className="font-semibold text-ascent-1">
									{chat?.sender === user?._id ? user?.firstName : userInfo?.firstName}
								</span>
								<time className="text-[11px] opacity-60">
									{moment(chat?.createdAt).format("HH:mm")}
								</time>
							</div>

							<div className="chat-bubble flex items-center gap-2 rounded-2xl border border-[#66666625] shadow-sm msg-bubble">
								<span className="leading-relaxed">{chat?.message}</span>
							</div>

							{chat?.sender === user?._id && (
								<div className="chat-footer text-[11px] opacity-60">
									{chat?.isRead ? "Read" : "Delivered"}
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* UI-only animations + bubble styling */}
			<style>{`
        .animate-msgCardIn{ animation: msgCardIn .55s ease-out both; }
        @keyframes msgCardIn{
          from{ opacity:0; transform: translateY(10px); }
          to{ opacity:1; transform: translateY(0); }
        }

        .msgCard-lift{ transition: transform .25s ease, box-shadow .25s ease; }
        .msgCard-lift:hover{ transform: translateY(-2px); box-shadow: 0 22px 70px rgba(0,0,0,0.14); }

        .msgCard-accent{
          background: linear-gradient(90deg, rgba(4,68,164,0.0), rgba(4,68,164,0.45), rgba(15,82,182,0.35), rgba(4,68,164,0.0));
          opacity: .9;
          animation: accentMove 3.8s ease-in-out infinite;
        }
        @keyframes accentMove{
          0%,100%{ transform: translateX(-10%); opacity:.8; }
          50%{ transform: translateX(10%); opacity:1; }
        }

        .animate-msgPop{ animation: msgPop .35s ease-out both; }
        @keyframes msgPop{
          from{ opacity:0; transform: translateY(6px) scale(.99); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }

        /* bubble refinement (keeps DaisyUI behavior but upgrades look) */
        .msg-bubble{
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
        }

        /* slightly different feel for outgoing */
        .chat-end .msg-bubble{
          background: linear-gradient(135deg, rgba(4,68,164,0.16), rgba(15,82,182,0.10));
          border-color: rgba(4,68,164,0.22);
        }
        .chat-start .msg-bubble{
          background: rgba(255,255,255,0.04);
          border-color: rgba(102,102,102,0.22);
        }
      `}</style>
		</div>
	);
};

export default MessageCard;