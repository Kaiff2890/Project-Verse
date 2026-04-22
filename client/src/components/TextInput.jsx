/** @format */
import React from "react";

const TextInput = ({
	type = "text",
	placeholder,
	styles = "",
	register,
	error,
	rightIcon,
	onRightIconClick,
	disabled = false,
}) => {
	const base =
		"w-full bg-bgColor/60 backdrop-blur outline-none border rounded-full px-5 py-3 " +
		"text-ascent-1 placeholder:text-ascent-2/70 " +
		"transition-all duration-200 " +
		"focus:ring-2 focus:ring-[#0444a4]/30 focus:border-[#0444a4]/60 " +
		"hover:border-[#66666670]";

	const disabledCls = "opacity-60 cursor-not-allowed";
	const errorCls =
		"border-red-500/60 focus:border-red-500 focus:ring-red-500/20";
	const normalCls = "border-[#66666645]";

	return (
		<div className="w-full">
			<div className="relative w-full">
				<input
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					className={`${base} ${rightIcon ? "pr-16" : "pr-5"} ${
						error ? errorCls : normalCls
					} ${disabled ? disabledCls : ""} ${styles}`}
					{...register}
				/>

				{rightIcon && (
					<button
						type="button"
						onClick={onRightIconClick}
						disabled={disabled}
						aria-label="Generate"
						className={[
							// ✅ PERFECT CENTER (no magic numbers)
							"absolute right-3 top-14  -translate-y-1/2",
							// ✅ size matches input height nicely (works for py-3, py-5)
							"h-11 w-11 rounded-full grid place-items-center",
							// ✅ glass button look
							"border border-[#66666645] bg-primary/60 backdrop-blur",
							"text-ascent-2 transition-all duration-200",
							"hover:text-ascent-1 hover:border-[#66666670] hover:scale-[1.04]",
							"active:scale-95",
							disabled ? "opacity-50 cursor-not-allowed" : "",
						].join(" ")}>
						{rightIcon}
					</button>
				)}
			</div>

			{error && (
				<p
					role="alert"
					className="mt-1 ml-2 text-xs text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

export default TextInput;
