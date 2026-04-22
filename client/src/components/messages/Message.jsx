/** @format */

import React from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { getUserInfo } from "../../utils";
import { useParams } from "react-router-dom";

const Message = ({ message }) => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	const { id } = useParams();

	const [chatUser, setChatUser] = React.useState(null);

	React.useEffect(() => {
		let isMounted = true;
		getUserInfo(authUser.token, id).then((user) => {
			if (isMounted) setChatUser(user);
		});
		return () => {
			isMounted = false;
		};
	}, [authUser.token, id]);
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;

	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profileUrl : chatUser?.profileUrl;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<>
			<div className={`chat ${chatClassName} msg-row animate-msgPop`}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full ring-2 ring-[#66666625] shadow-sm msg-avatar">
						<img alt="chat avatar" src={profilePic} />
					</div>
				</div>

				<div className="chat-header text-xs sm:text-sm text-ascent-2 flex items-center gap-2">
					<span className="font-semibold text-ascent-1">
						{fromMe ? authUser.firstName : chatUser?.firstName}
					</span>
					<time className="text-[11px] opacity-60">{formattedTime}</time>
				</div>

				<div
					className={[
						"chat-bubble rounded-2xl border shadow-sm backdrop-blur msg-bubble",
						fromMe ? "msg-bubble-me" : "msg-bubble-them",
						shakeClass,
					].join(" ")}
				>
					{message.message}
				</div>

				<style>{`
          .animate-msgPop{ animation: msgPop .28s ease-out both; }
          @keyframes msgPop{
            from{ opacity:0; transform: translateY(6px) scale(.99); }
            to{ opacity:1; transform: translateY(0) scale(1); }
          }

          .msg-row{ padding-block: 2px; }

          .msg-avatar{ transition: transform .2s ease, box-shadow .2s ease; }
          .msg-row:hover .msg-avatar{
            transform: translateY(-1px);
            box-shadow: 0 14px 30px rgba(0,0,0,0.12);
          }

          /* bubble base */
          .msg-bubble{
            border-color: rgba(102,102,102,0.22);
            background: rgba(255,255,255,0.04);
            max-width: min(520px, 82vw);
            line-height: 1.55;
          }

          /* incoming */
          .msg-bubble-them{
            background: rgba(255,255,255,0.04);
            border-color: rgba(102,102,102,0.22);
          }

          /* outgoing */
          .msg-bubble-me{
            background: linear-gradient(135deg, rgba(4,68,164,0.18), rgba(15,82,182,0.10));
            border-color: rgba(4,68,164,0.22);
          }

          /* upgraded shake (keeps your existing shouldShake behavior) */
          .shake{
            animation: shake .28s ease-in-out 0s 2;
          }
          @keyframes shake{
            0%{ transform: translateX(0); }
            25%{ transform: translateX(-3px); }
            50%{ transform: translateX(3px); }
            75%{ transform: translateX(-2px); }
            100%{ transform: translateX(0); }
          }
        `}</style>
			</div>
		</>
	);
};

export default Message;