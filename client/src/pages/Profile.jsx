/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	FriendsCard,
	Loading,
	PostCard,
	ProfileCard,
	TopBar,
} from "../components";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";
// import { posts } from "../assets/data";

const Profile = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { posts } = useSelector((state) => state.posts);
	const [userInfo, setUserInfo] = useState(user);
	const [loading, setLoading] = useState(false);
	const uri = "/posts/get-user-post/" + id;

	const getUser = async () => {
		const res = await getUserInfo(user?.token, id);
		setUserInfo(res);
	};

	const getPosts = async () => {
		await fetchPosts(user?.token, dispatch, uri);
		setLoading(false);
	};

	const handleDelete = async (id) => {
		await deletePost(id, user?.token);
		await getPosts();
	};
	const handleLikePost = async () => {
		await likePost({ uri: uri, token: user?.token });
		await getPosts();
	};

	useEffect(() => {
		setLoading(true);
		getUser();
		getPosts();
	}, [id]);

	return (
		<>
			<div className="home w-full px-0 lg:px-10 pb-5 2xl:px-40 bg-bgColor lg:rounded-2xl min-h-screen relative">
				{/* subtle animated overlay (UI only) */}
				<div className="pointer-events-none absolute inset-0 opacity-[0.12] profile-grid-mask" />

				<TopBar />

				<div className="w-full flex gap-3 lg:gap-6 md:pl-4 pt-5 pb-5 relative">
					{/* LEFT */}
					<div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 pr-1 animate-profileIn sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
						<div className="profile-cardLift">
							<ProfileCard user={userInfo} />
						</div>

						<div className="block lg:hidden profile-cardLift">
							<FriendsCard friends={userInfo?.friends} />
						</div>
					</div>

					{/* CENTER */}
					<div className="flex-1 bg-primary px-4 sm:px-5 flex flex-col gap-6 rounded-2xl border border-[#66666630] shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm animate-profileIn profile-cardLift pb-10">
						{loading ?
							<div className="profile-softPop">
								<Loading />
							</div>
						: posts?.length > 0 ?
							posts?.map((post) => (
								<div
									key={post?._id}
									className="profile-softPop profile-cardLift">
									<PostCard
										post={post}
										user={user}
										deletePost={handleDelete}
										likePost={handleLikePost}
									/>
								</div>
							))
						:	<div className="flex w-full h-full items-center justify-center profile-cardLift rounded-2xl">
								<p className="text-lg text-ascent-2">No Post Available</p>
							</div>
						}
					</div>

					{/* RIGHT */}
					<div className="hidden w-1/4 lg:flex flex-col gap-8 pl-1 animate-profileIn sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">
						<div className="profile-cardLift">
							<FriendsCard friends={userInfo?.friends} />
						</div>
					</div>
				</div>

				{/* UI-only animations */}
				<style>{`
          .profile-grid-mask{
            background:
              radial-gradient(circle at 18% 12%, rgba(4,68,164,0.14), transparent 42%),
              radial-gradient(circle at 84% 30%, rgba(15,82,182,0.10), transparent 45%),
              radial-gradient(circle at 50% 92%, rgba(4,68,164,0.08), transparent 55%);
            animation: profileBg 18s ease-in-out infinite;
          }

          .profile-cardLift{ transition: transform .25s ease, box-shadow .25s ease; }
          .profile-cardLift:hover{ transform: translateY(-2px); box-shadow: 0 18px 50px rgba(0,0,0,.14); }

          .animate-profileIn{ animation: profileIn .55s ease-out both; }
          .profile-softPop{ animation: softPop .45s ease-out both; }

          @keyframes profileIn{
            from{ opacity:0; transform: translateY(10px); }
            to{ opacity:1; transform: translateY(0); }
          }

          @keyframes softPop{
            from{ opacity:0; transform: translateY(8px) scale(.99); }
            to{ opacity:1; transform: translateY(0) scale(1); }
          }

          @keyframes profileBg{
            0%{ filter: hue-rotate(0deg); transform: scale(1); }
            50%{ filter: hue-rotate(10deg); transform: scale(1.03); }
            100%{ filter: hue-rotate(0deg); transform: scale(1); }
          }
        `}</style>
			</div>
		</>
	);
};

export default Profile;
