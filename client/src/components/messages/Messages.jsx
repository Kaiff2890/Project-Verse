/** @format */
import useListenMessages from "../../hooks/useListenMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import React, { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMesages.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const messagesEndRef = useRef(null);
	const [prevMessagesLength, setPrevMessagesLength] = useState(0);

	useListenMessages();

	useEffect(() => {
		// Only scroll if new messages were added (not on initial load)
		if (messages.length > prevMessagesLength && messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
		setPrevMessagesLength(messages.length);
	}, [messages.length]); // Only trigger on length changes

	return (
		<div className="relative px-4 sm:px-5 flex-1 overflow-auto chat-scroll animate-chatPaneIn">
			{/* subtle top/bottom fade (UI only) */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-10 chat-fadeTop" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 chat-fadeBottom" />

			{/* inner spacing so fades don't cover content */}
			<div className="pt-2 pb-4 flex flex-col gap-2">
				{!loading &&
					messages.length > 0 &&
					messages.map((message) => (
						<Message key={message._id} message={message} />
					))}

				{loading &&
					[...Array(5)].map((_, idx) => (
						<div className="animate-softPop" key={idx}>
							<MessageSkeleton />
						</div>
					))}

				{!loading && messages.length === 0 && (
					<div className="min-h-[45vh] grid place-items-center">
						<div className="text-center max-w-md px-6 py-8 rounded-2xl border border-[#66666625] bg-primary/40 backdrop-blur shadow-sm animate-softPop">
							<p className="text-ascent-1 font-semibold text-base">
								Send a message to start conversation
							</p>
							<p className="text-ascent-2 text-sm mt-2">
								Keep it short, clear, and friendly.
							</p>
						</div>
					</div>
				)}

				{/* More subtle scroll marker */}
				<div ref={messagesEndRef} className="h-px" />
			</div>

			{/* UI-only CSS */}
			<style>{`
        .animate-chatPaneIn{ animation: chatPaneIn .45s ease-out both; }
        @keyframes chatPaneIn{
          from{ opacity:0; transform: translateY(8px); }
          to{ opacity:1; transform: translateY(0); }
        }

        .animate-softPop{ animation: softPop .35s ease-out both; }
        @keyframes softPop{
          from{ opacity:0; transform: translateY(6px) scale(.99); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }

        /* fade overlays */
        .chat-fadeTop{
          background: linear-gradient(to bottom, rgba(0,0,0,0.10), transparent);
          opacity: .35;
        }
        .chat-fadeBottom{
          background: linear-gradient(to top, rgba(0,0,0,0.12), transparent);
          opacity: .35;
        }

        /* modern scrollbar */
        .chat-scroll{
          scrollbar-width: thin;
          scrollbar-color: rgba(102,102,102,0.45) transparent;
        }
        .chat-scroll::-webkit-scrollbar{
          width: 10px;
        }
        .chat-scroll::-webkit-scrollbar-track{
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb{
          background: rgba(102,102,102,0.35);
          border-radius: 999px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover{
          background: rgba(102,102,102,0.55);
          border: 3px solid transparent;
          background-clip: content-box;
        }

        @media (prefers-reduced-motion: reduce){
          .animate-chatPaneIn, .animate-softPop{ animation: none; }
        }
      `}</style>
		</div>
	);
};

export default Messages;