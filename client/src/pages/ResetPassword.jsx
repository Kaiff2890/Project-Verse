import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
import { apiRequest } from "../utils";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        method: "POST",
        url: "/users/request-passwordreset",
        data: data,
      });

      if (res?.status === "404") {
        setErrMsg(res);
      } else {
        setErrMsg("");
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log("error in password reset page", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bgColor flex items-center justify-center p-6 relative overflow-hidden">
      {/* UI-only animated overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] reset-grid-mask" />

      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-7 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.12)] rounded-2xl border border-[#66666630] backdrop-blur-sm animate-resetIn reset-cardLift">
        <div className="mb-6">
          <p className="text-ascent-1 text-xl font-bold tracking-tight">
            Reset Password
          </p>

          <span className="text-sm text-ascent-2 block mt-1 leading-relaxed">
            Enter the email address you used during registration. We’ll send a
            reset link if it exists.
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-5"
        >
          <TextInput
            name="email"
            placeholder="email@example.com"
            type="email"
            register={register("email", {
              required: "Email Address is required!",
            })}
            styles="w-full rounded-2xl transition-all duration-200 focus-within:scale-[1.01]"
            labelStyle="ml-2"
            error={errors.email ? errors.email.message : ""}
          />

          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              } mt-0.5 inline-block animate-softPop`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`relative inline-flex justify-center rounded-2xl bg-blue px-8 py-3.5 text-sm font-semibold text-white outline-none shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 reset-btnShine`}
              title="Submit"
            />
          )}
        </form>

        {/* UI-only styles */}
        <style>{`
          .reset-grid-mask{
            background:
              radial-gradient(circle at 18% 12%, rgba(4,68,164,0.14), transparent 42%),
              radial-gradient(circle at 84% 30%, rgba(15,82,182,0.10), transparent 45%),
              radial-gradient(circle at 50% 92%, rgba(4,68,164,0.08), transparent 55%);
            animation: resetBg 18s ease-in-out infinite;
          }

          .animate-resetIn{ animation: resetIn .55s ease-out both; }

          .reset-cardLift{ transition: transform .25s ease, box-shadow .25s ease; }
          .reset-cardLift:hover{ transform: translateY(-2px); box-shadow: 0 18px 50px rgba(0,0,0,.14); }

          .reset-btnShine{ position: relative; overflow: hidden; }
          .reset-btnShine::after{
            content:"";
            position:absolute; inset:-2px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
            transform: translateX(-120%);
            transition: transform .55s ease;
          }
          .reset-btnShine:hover::after{ transform: translateX(120%); }

          .animate-softPop{ animation: softPop .45s ease-out both; }

          @keyframes resetIn{
            from{ opacity:0; transform: translateY(10px); }
            to{ opacity:1; transform: translateY(0); }
          }

          @keyframes softPop{
            from{ opacity:0; transform: translateY(8px) scale(.99); }
            to{ opacity:1; transform: translateY(0) scale(1); }
          }

          @keyframes resetBg{
            0%{ filter: hue-rotate(0deg); transform: scale(1); }
            50%{ filter: hue-rotate(10deg); transform: scale(1.03); }
            100%{ filter: hue-rotate(0deg); transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ResetPassword;