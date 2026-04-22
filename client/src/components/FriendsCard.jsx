/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BiMessageSquareDots } from "react-icons/bi";

const FriendsCard = ({ friends }) => {
	return (
		<div>
			<div className="w-full fcard-glass rounded-2xl px-6 py-5 fcard-lift fcard-in overflow-hidden relative">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] fcard-accent rounded-t-2xl" />
				<div className="pointer-events-none absolute inset-0 fcard-innerGlow rounded-2xl" />

				<div className="flex items-center justify-between pb-3 border-b fcard-divider relative z-10">
					<span className="font-semibold text-base text-ascent-1 tracking-wide">Friends</span>
					<span className="fcard-countBadge text-xs font-bold px-3 py-1 rounded-full">
						{friends?.length ?? 0}
					</span>
				</div>

				<div className="w-full flex flex-col gap-1.5 pt-3 relative z-10">
					{friends?.map((friend) => (
						<div className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 fcard-row" key={friend?._id}>
							<Link to={"/profile/" + friend?._id} className="w-full flex gap-3 items-center cursor-pointer">
								<div className="fcard-avatarWrap rounded-full p-[2px] shrink-0">
									<img src={friend?.profileUrl ?? NoProfile} alt={friend?.firstName} className="w-9 h-9 object-cover rounded-full" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-semibold text-ascent-1 truncate">{friend?.firstName} {friend?.lastName}</p>
									<span className="text-xs text-ascent-2 truncate block fcard-profession">{friend?.profession ?? "No Profession"}</span>
								</div>
							</Link>
							<Link to={"/chat/" + friend?._id} className="fcard-msgBtn flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 shrink-0 ml-2">
								<BiMessageSquareDots className="text-base fcard-msgIcon transition-colors duration-200" />
							</Link>
						</div>
					))}
					{(!friends || friends.length === 0) && (
						<p className="text-xs text-center text-ascent-2 opacity-60 py-4">No friends yet. Add some!</p>
					)}
				</div>
			</div>

			<style>{`
        .fcard-glass{
          background: rgba(13,13,26,0.60);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.18);
          box-shadow: 0 4px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        [data-theme="light"] .fcard-glass{
          background: rgba(255,255,255,0.75);
          border-color: rgba(109,40,217,0.14);
          box-shadow: 0 4px 30px rgba(0,0,0,0.08);
        }
        .fcard-accent{
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.9) 40%, rgba(139,92,246,0.8) 70%, transparent);
          animation: fcardAccent 5s ease-in-out infinite;
        }
        @keyframes fcardAccent{ 0%,100%{opacity:.65;transform:scaleX(0.8);} 50%{opacity:1;transform:scaleX(1);} }
        .fcard-innerGlow{ background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.06), transparent 70%); pointer-events:none; }
        .fcard-lift{ transition: transform .3s ease, box-shadow .3s ease; will-change:transform; position:relative; }
        .fcard-lift:hover{ transform:translateY(-3px); box-shadow:0 8px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(34,211,238,0.25); }
        .fcard-in{ animation: fcardIn .65s cubic-bezier(0.16,1,0.3,1) .1s both; }
        @keyframes fcardIn{ from{opacity:0;transform:translateY(18px) scale(0.98);} to{opacity:1;transform:translateY(0) scale(1);} }
        .fcard-divider{ border-color: rgba(255,255,255,0.07); }
        [data-theme="light"] .fcard-divider{ border-color: rgba(0,0,0,0.08); }
        .fcard-countBadge{ background:rgba(34,211,238,0.12); border:1px solid rgba(34,211,238,0.30); color:rgba(34,211,238,1); }
        [data-theme="light"] .fcard-countBadge{ background:rgba(6,182,212,0.10); border-color:rgba(6,182,212,0.30); color:rgba(6,182,212,1); }
        .fcard-row{ position:relative; }
        .fcard-row:hover{ background: rgba(139,92,246,0.09); }
        [data-theme="light"] .fcard-row:hover{ background: rgba(109,40,217,0.06); }
        .fcard-avatarWrap{ background: linear-gradient(135deg, rgba(139,92,246,0.7), rgba(34,211,238,0.6)); transition: box-shadow .25s ease; }
        .fcard-row:hover .fcard-avatarWrap{ box-shadow: 0 0 14px rgba(139,92,246,0.45); }
        .fcard-profession{ color: rgba(139,92,246,0.7); }
        [data-theme="light"] .fcard-profession{ color: rgba(109,40,217,0.65); }
        .fcard-msgBtn{ border:1px solid rgba(34,211,238,0.22); background:rgba(34,211,238,0.06); position:relative; overflow:hidden; }
        .fcard-msgBtn:hover{ background:rgba(34,211,238,0.16); border-color:rgba(34,211,238,0.50); box-shadow:0 0 14px rgba(34,211,238,0.30); transform:scale(1.07); }
        .fcard-msgBtn:active{ transform:scale(0.95); }
        .fcard-msgBtn::after{ content:""; position:absolute; inset:-2px; background:linear-gradient(90deg,transparent,rgba(34,211,238,0.22),transparent); transform:translateX(-120%); transition:transform .5s ease; pointer-events:none; }
        .fcard-msgBtn:hover::after{ transform:translateX(120%); }
        .fcard-msgIcon{ color: rgba(34,211,238,0.80); }
        .fcard-msgBtn:hover .fcard-msgIcon{ color: rgba(34,211,238,1); }
        [data-theme="light"] .fcard-msgIcon{ color: rgba(6,90,216,0.7); }
      `}</style>
		</div>
	);
};

export default FriendsCard;