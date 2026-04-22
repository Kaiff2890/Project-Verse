/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
	BsBriefcase,
	BsFacebook,
	BsInstagram,
	BsPersonFillAdd,
} from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";

import { NoProfile } from "../assets";
import { UpdateProfile } from "../redux/userSlice";

const normalizeUrl = (url) => {
	if (!url) return "";
	const trimmed = String(url).trim();
	if (!trimmed) return "";
	if (/^https?:\/\//i.test(trimmed)) return trimmed;
	return `https://${trimmed}`;
};

const SocialRow = ({ icon: Icon, label, url }) => {
	const value = (url || "").trim();

	return (
		<div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 pcard-socialRow">
			<div className="flex gap-2.5 items-center">
				<Icon className="text-xl pcard-socialIcon transition-colors duration-200" />
				<span className="text-sm text-ascent-2">{label}</span>
			</div>

			{value ?
				<a
					href={normalizeUrl(value)}
					target="_blank"
					rel="noreferrer"
					className="text-sm pcard-link hover:underline truncate max-w-[55%]"
					title={value}>
					Open
				</a>
			:	<span className="text-xs text-ascent-2 opacity-50">Not added</span>}
		</div>
	);
};

const ProfileCard = ({ user }) => {
	const { user: data } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const instagram = user?.socialLinks?.instagram || "";
	const github = user?.socialLinks?.github || "";
	const facebook = user?.socialLinks?.facebook || "";

	return (
		<div>
			<div className="w-full pcard-glass flex flex-col items-center rounded-2xl px-6 py-5 pcard-lift pcard-in overflow-hidden relative">

				{/* Animated top accent line */}
				<div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] pcard-accent rounded-t-2xl" />

				{/* Subtle inner glow */}
				<div className="pointer-events-none absolute inset-0 pcard-innerGlow rounded-2xl" />

				{/* Header row */}
				<div className="w-full flex items-center justify-between pb-5 border-b pcard-divider relative z-10">
					<Link
						to={"/profile/" + user?._id}
						className="flex gap-3 items-center group min-w-0">
						<div className="relative">
							<div className="pcard-avatarRing rounded-full p-[2px]">
								<img
									src={user?.profileUrl ?? NoProfile}
									alt={user?.email}
									className="w-14 h-14 object-cover rounded-full transition-transform duration-300 group-hover:scale-[1.04]"
								/>
							</div>
							{/* Online dot */}
							<span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0d0d1a] pcard-onlineDot" />
						</div>

						<div className="flex flex-col justify-center min-w-0">
							<p className="text-lg font-semibold text-ascent-1 leading-tight truncate">
								{user?.firstName} {user?.lastName}
							</p>
							<span className="text-ascent-2 text-sm truncate pcard-profession">
								{user?.profession ?? "No Profession"}
							</span>
						</div>
					</Link>

					<div>
						{user?._id === data?._id ?
							<button
								className="pcard-iconBtn p-2 rounded-xl border pcard-border hover:pcard-border-hover transition-all duration-200"
								onClick={() => dispatch(UpdateProfile(true))}
								aria-label="Edit profile">
								<LiaEditSolid size={20} className="pcard-editIcon" />
							</button>
						:	<button
								className="pcard-iconBtn p-2 rounded-xl border pcard-border hover:pcard-border-hover transition-all duration-200"
								onClick={() => {}}
								aria-label="Add friend">
								<BsPersonFillAdd size={20} className="pcard-addIcon" />
							</button>
						}
					</div>
				</div>

				{/* Location + Profession */}
				<div className="w-full flex flex-col gap-2.5 py-4 border-b pcard-divider relative z-10">
					<div className="flex gap-2.5 items-center text-ascent-2">
						<CiLocationOn className="text-xl pcard-metaIcon shrink-0" />
						<span className="text-sm">{user?.location ?? "Add Location"}</span>
					</div>
					<div className="flex gap-2.5 items-center text-ascent-2">
						<BsBriefcase className="text-lg pcard-metaIcon shrink-0" />
						<span className="text-sm">{user?.profession ?? "Add Profession"}</span>
					</div>
				</div>

				{/* Stats */}
				<div className="w-full flex flex-col gap-3 py-4 border-b pcard-divider relative z-10">
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold text-ascent-1">Friends</span>
						<span className="pcard-statBadge text-sm font-bold">{user?.friends?.length ?? 0}</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-ascent-2 text-sm">Profile views</span>
						<span className="text-ascent-1 text-sm font-semibold">{user?.views?.length ?? 0}</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-ascent-2 text-sm">Status</span>
						<span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user?.verified ? "pcard-verifiedBadge" : "pcard-unverifiedBadge"}`}>
							{user?.verified ? "✓ Verified" : "Not Verified"}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-ascent-2 text-sm">Joined</span>
						<span className="text-ascent-1 text-sm">{moment(user?.createdAt).fromNow()}</span>
					</div>
				</div>

				{/* Social links */}
				<div className="w-full flex flex-col gap-1 py-4 pb-2 relative z-10">
					<p className="text-ascent-1 text-sm font-semibold mb-2 pcard-sectionLabel">Social Profile</p>
					<SocialRow icon={BsInstagram} label="Instagram" url={instagram} />
					<SocialRow icon={FaGithubSquare} label="GitHub" url={github} />
					<SocialRow icon={BsFacebook} label="Facebook" url={facebook} />
				</div>
			</div>

			<style>{`
        /* ── Glass card base ── */
        .pcard-glass{
          background: rgba(13,13,26,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.18);
          box-shadow:
            0 4px 40px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* Light-mode override */
        [data-theme="light"] .pcard-glass{
          background: rgba(255,255,255,0.72);
          border-color: rgba(109,40,217,0.15);
          box-shadow: 0 4px 30px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        /* ── Animated top accent ── */
        .pcard-accent{
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(139,92,246,0.9) 30%,
            rgba(34,211,238,0.9) 70%,
            transparent 100%
          );
          animation: pcardAccentSlide 4s ease-in-out infinite;
        }
        @keyframes pcardAccentSlide{
          0%,100%{ opacity:.7; transform: scaleX(0.85); }
          50%{ opacity:1; transform: scaleX(1.0); }
        }

        /* ── Inner glow ── */
        .pcard-innerGlow{
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.08), transparent 70%);
          pointer-events:none;
        }

        /* ── Lift hover ── */
        .pcard-lift{
          transition: transform .3s ease, box-shadow .3s ease;
          will-change: transform;
          position: relative;
        }
        .pcard-lift:hover{
          transform: translateY(-3px);
          box-shadow:
            0 8px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(139,92,246,0.35),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* ── Entrance animation ── */
        .pcard-in{ animation: pcardIn .6s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes pcardIn{
          from{ opacity:0; transform: translateY(16px) scale(0.98); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }

        /* ── Avatar ring ── */
        .pcard-avatarRing{
          background: linear-gradient(135deg, rgba(139,92,246,0.9), rgba(34,211,238,0.8));
          transition: box-shadow .3s ease;
        }
        .pcard-lift:hover .pcard-avatarRing{
          box-shadow: 0 0 20px rgba(139,92,246,0.5);
        }

        /* ── Online dot ── */
        .pcard-onlineDot{
          box-shadow: 0 0 8px rgba(52,211,153,0.8);
          animation: pcardPing 2s ease-in-out infinite;
        }
        @keyframes pcardPing{
          0%,100%{ box-shadow: 0 0 8px rgba(52,211,153,0.8); }
          50%{ box-shadow: 0 0 14px rgba(52,211,153,1); }
        }

        /* ── Dividers ── */
        .pcard-divider{ border-color: rgba(255,255,255,0.07); }
        [data-theme="light"] .pcard-divider{ border-color: rgba(0,0,0,0.08); }

        /* ── Typography ── */
        .pcard-profession{ color: rgba(139,92,246,0.85); }
        [data-theme="light"] .pcard-profession{ color: rgba(109,40,217,0.75); }

        .pcard-sectionLabel{
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 11px;
          color: rgba(139,92,246,0.7);
        }
        [data-theme="light"] .pcard-sectionLabel{ color: rgba(109,40,217,0.65); }

        /* ── Stat badge ── */
        .pcard-statBadge{
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.30);
          color: rgba(167,139,250,1);
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
        }
        [data-theme="light"] .pcard-statBadge{
          background: rgba(109,40,217,0.10);
          border-color: rgba(109,40,217,0.25);
          color: rgba(109,40,217,1);
        }

        /* ── Verified badges ── */
        .pcard-verifiedBadge{
          background: rgba(34,211,238,0.15);
          border: 1px solid rgba(34,211,238,0.35);
          color: rgba(34,211,238,1);
        }
        .pcard-unverifiedBadge{
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.45);
        }
        [data-theme="light"] .pcard-unverifiedBadge{
          background: rgba(0,0,0,0.05);
          border-color: rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.45);
        }

        /* ── Icon colors ── */
        .pcard-editIcon{ color: rgba(139,92,246,1); }
        .pcard-addIcon{ color: rgba(34,211,238,0.9); }
        .pcard-metaIcon{ color: rgba(139,92,246,0.7); }
        [data-theme="light"] .pcard-metaIcon{ color: rgba(109,40,217,0.65); }

        /* ── Icon button ── */
        .pcard-iconBtn{
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .pcard-iconBtn:hover{
          transform: translateY(-1px);
          box-shadow: 0 0 14px rgba(139,92,246,0.3);
        }
        .pcard-border{
          border-color: rgba(139,92,246,0.20);
          background: rgba(139,92,246,0.06);
        }
        .pcard-border-hover:hover{
          border-color: rgba(139,92,246,0.45);
          background: rgba(139,92,246,0.12);
        }
        [data-theme="light"] .pcard-border{ border-color: rgba(109,40,217,0.18); background: rgba(109,40,217,0.05); }

        /* ── Social row ── */
        .pcard-socialRow:hover{ background: rgba(139,92,246,0.08); }
        [data-theme="light"] .pcard-socialRow:hover{ background: rgba(109,40,217,0.06); }

        .pcard-socialIcon{ color: rgba(139,92,246,0.75); }
        [data-theme="light"] .pcard-socialIcon{ color: rgba(109,40,217,0.65); }
        .pcard-socialRow:hover .pcard-socialIcon{ color: rgba(167,139,250,1); }

        .pcard-link{ color: rgba(34,211,238,0.9); }
        [data-theme="light"] .pcard-link{ color: rgba(6,90,216,1); }
      `}</style>
		</div>
	);
};

export default ProfileCard;
