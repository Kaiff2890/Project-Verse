/** @format */

import { FriendsCard, ProfileCard, TopBar } from "../components";
import MessageCountainer from "../components/messages/MessageCountainer";

const Chat = () => {
	const userInfo = JSON.parse(localStorage.getItem("user"));

	return (
		<>
			<div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-2xl h-screen overflow-hidden relative">
				{/* subtle animated background overlay (UI only) */}
				<div className="pointer-events-none absolute inset-0 opacity-[0.12] chat-grid-mask" />

				<TopBar />

				<div className="w-full flex gap-3 lg:gap-6 md:pl-4 pt-5 pb-10 h-full relative">
					{/* LEFT */}
					<div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto pr-1 animate-chatIn">
						<div className="chat-cardLift">
							<ProfileCard user={userInfo} />
						</div>

						<div className="block lg:hidden chat-cardLift">
							<FriendsCard friends={userInfo?.friends} />
						</div>
					</div>

					{/* CENTER */}
					<div className="flex-1 h-full bg-primary px-4 sm:px-5 flex flex-col gap-6 overflow-y-auto rounded-2xl border border-[#66666630] shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm animate-chatIn chat-cardLift">
						<MessageCountainer />
					</div>

					{/* RIGHT */}
					<div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto pl-1 animate-chatIn">
						<div className="chat-cardLift">
							<FriendsCard friends={userInfo?.friends} />
						</div>
					</div>
				</div>

				{/* UI-only animations */}
				<style>{`
          .chat-grid-mask{
            background:
              radial-gradient(circle at 18% 12%, rgba(4,68,164,0.14), transparent 42%),
              radial-gradient(circle at 84% 30%, rgba(15,82,182,0.10), transparent 45%),
              radial-gradient(circle at 50% 92%, rgba(4,68,164,0.08), transparent 55%);
            animation: chatBg 18s ease-in-out infinite;
          }

          .chat-cardLift{ transition: transform .25s ease, box-shadow .25s ease; }
          .chat-cardLift:hover{ transform: translateY(-2px); box-shadow: 0 18px 50px rgba(0,0,0,.14); }

          .animate-chatIn{ animation: chatIn .55s ease-out both; }

          @keyframes chatIn{
            from{ opacity:0; transform: translateY(10px); }
            to{ opacity:1; transform: translateY(0); }
          }

          @keyframes chatBg{
            0%{ filter: hue-rotate(0deg); transform: scale(1); }
            50%{ filter: hue-rotate(10deg); transform: scale(1.03); }
            100%{ filter: hue-rotate(0deg); transform: scale(1); }
          }
        `}</style>
			</div>
		</>
	);
};

export default Chat;