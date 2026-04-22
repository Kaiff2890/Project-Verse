/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, fetchPosts } from "../utils";

const EditProfile = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [errMsg, setErrMsg] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			...user,
			socialLinks: {
				instagram: user?.socialLinks?.instagram || "",
				github: user?.socialLinks?.github || "",
				facebook: user?.socialLinks?.facebook || "",
			},
		},
	});

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		setErrMsg("");

		try {
			const { firstName, lastName, location, profession, socialLinks } = data;

			const res = await apiRequest({
				method: "PUT",
				url: "/users/update-user",
				data: {
					firstName,
					lastName,
					location,
					profession,
					socialLinks,
				},
				token: user?.token,
			});

			if (res?.status === "failed") {
				setErrMsg(res);
			} else {
				const newUser = { token: res?.token, ...res?.user };

				dispatch(UserLogin(newUser));

				setTimeout(() => {
					dispatch(UpdateProfile(false));
				}, 2000);

				setErrMsg("");
				await fetchPost();
			}

			setIsSubmitting(false);
		} catch (error) {
			console.log("error in EditProfile.jsx :", error);
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		dispatch(UpdateProfile(false));
	};

	return (
		<>
			<div className="fixed z-50 inset-0 overflow-y-auto">
				<div className="flex items-center justify-center min-h-screen pt-6 px-4 pb-24 text-center sm:block sm:p-0">
					{/* Overlay */}
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] animate-modalFade"></div>
					</div>
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
					&#8203;
					<div
						className="inline-block align-bottom bg-primary rounded-2xl text-left overflow-hidden border border-[#66666630] shadow-[0_22px_80px_rgba(0,0,0,0.25)] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modalIn modal-lift"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline">
						{/* Header */}
						<div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-[#66666625]">
							<label
								htmlFor="name"
								className="block font-bold text-xl text-ascent-1 text-left tracking-tight">
								Edit Profile
							</label>

							<button
								className="h-10 w-10 rounded-full grid place-items-center border border-[#66666630] hover:bg-bgColor/40 hover:border-[#66666670] hover:scale-[1.03] active:scale-95 transition-all duration-200"
								onClick={handleClose}
								aria-label="Close">
								<MdClose
									size={20}
									className="text-ascent-1"
								/>
							</button>
						</div>

						{/* Form */}
						<form
							className="px-4 sm:px-6 py-5 flex flex-col gap-3 2xl:gap-6"
							onSubmit={handleSubmit(onSubmit)}>
							<TextInput
								name="firstName"
								label="First Name"
								placeholder="First Name"
								type="text"
								styles="w-full"
								register={register("firstName", {
									required: "First Name is required!",
								})}
								error={errors.firstName ? errors.firstName?.message : ""}
							/>

							<TextInput
								label="Last Name"
								placeholder="Last Name"
								type="text"
								styles="w-full"
								register={register("lastName", {
									required: "Last Name is required!",
								})}
								error={errors.lastName ? errors.lastName?.message : ""}
							/>

							<TextInput
								name="profession"
								label="Profession"
								placeholder="Profession"
								type="text"
								styles="w-full"
								register={register("profession", {
									required: "Profession is required!",
								})}
								error={errors.profession ? errors.profession?.message : ""}
							/>

							<TextInput
								label="Location"
								placeholder="Location"
								type="text"
								styles="w-full"
								register={register("location", {
									required: "Location is required!",
								})}
								error={errors.location ? errors.location?.message : ""}
							/>

							{/* ✅ Social Media Links */}
							<TextInput
								name="instagram"
								label="Instagram"
								placeholder="Instagram profile link"
								type="text"
								styles="w-full"
								register={register("socialLinks.instagram")}
								error={errors?.socialLinks?.instagram?.message || ""}
							/>

							<TextInput
								name="github"
								label="GitHub"
								placeholder="GitHub profile link"
								type="text"
								styles="w-full"
								register={register("socialLinks.github")}
								error={errors?.socialLinks?.github?.message || ""}
							/>

							<TextInput
								name="facebook"
								label="Facebook"
								placeholder="Facebook profile link"
								type="text"
								styles="w-full"
								register={register("socialLinks.facebook")}
								error={errors?.socialLinks?.facebook?.message || ""}
							/>

							{errMsg?.message && (
								<span
									role="alert"
									className={`text-sm ${
										errMsg?.status === "failed" ?
											"text-[#f64949fe]"
										:	"text-[#2ba150fe]"
									} mt-1 inline-block animate-softPop`}>
									{errMsg?.message}
								</span>
							)}

							{/* Footer */}
							<div className="pt-5 sm:flex sm:flex-row-reverse border-t border-[#66666625]">
								{isSubmitting ?
									<Loading />
								:	<CustomButton
										type="submit"
										containerStyles={`relative inline-flex justify-center rounded-full bg-blue px-8 py-3 text-sm font-semibold text-white outline-none shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 modal-btnShine`}
										title="Submit"
									/>
								}
							</div>
						</form>

						{/* UI-only CSS */}
						<style>{`
              .animate-modalFade{ animation: modalFade .25s ease-out both; }
              .animate-modalIn{ animation: modalIn .35s ease-out both; }

              @keyframes modalFade{
                from{ opacity: 0; }
                to{ opacity: 1; }
              }

              @keyframes modalIn{
                from{ opacity:0; transform: translateY(10px) scale(.99); }
                to{ opacity:1; transform: translateY(0) scale(1); }
              }

              .modal-lift{ transition: transform .25s ease, box-shadow .25s ease; }
              .modal-lift:hover{ transform: translateY(-2px); box-shadow: 0 26px 90px rgba(0,0,0,0.28); }

              .modal-btnShine{ overflow:hidden; }
              .modal-btnShine::after{
                content:"";
                position:absolute; inset:-2px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
                transform: translateX(-120%);
                transition: transform .55s ease;
              }
              .modal-btnShine:hover::after{ transform: translateX(120%); }

              .animate-softPop{ animation: softPop .4s ease-out both; }
              @keyframes softPop{
                from{ opacity:0; transform: translateY(6px) scale(.99); }
                to{ opacity:1; transform: translateY(0) scale(1); }
              }
            `}</style>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
