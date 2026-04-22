/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export const content = ["./src/**/*.{html,js,jsx}"];

export const theme = {
	screens: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},

	extend: {
		colors: {
			bgColor: "rgb(var(--color-bg) / <alpha-value>)",
			primary: "rgb(var(--color-primary) / <alpha-value>)",
			secondary: "rgb(var(--color-secondary) / <alpha-value>)",
			blue: "rgb(var(--color-blue) / <alpha-value>)",
			white: "rgb(var(--color-white) / <alpha-value>)",
			ascent: {
				1: "rgb(var(--color-ascent1) / <alpha-value>)",
				2: "rgb(var(--color-ascent2) / <alpha-value>)",
			},
		},

		borderRadius: {
			xl: "1rem",
			"2xl": "1.25rem",
			"3xl": "1.75rem",
		},

		boxShadow: {
			soft: "0 12px 40px rgba(0,0,0,0.10)",
			lift: "0 18px 60px rgba(0,0,0,0.14)",
			glowBlue: "0 0 0 6px rgba(6, 90, 216, 0.16)",
		},

		keyframes: {
			fadeUp: {
				"0%": { opacity: "0", transform: "translateY(10px) scale(.99)" },
				"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
			},
			softPop: {
				"0%": { opacity: "0", transform: "translateY(8px) scale(.99)" },
				"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
			},
			shimmer: {
				"0%": { transform: "translateX(-120%)" },
				"100%": { transform: "translateX(120%)" },
			},
			floaty: {
				"0%,100%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-3px)" },
			},
		},

		animation: {
			fadeUp: "fadeUp .45s ease-out both",
			softPop: "softPop .35s ease-out both",
			shimmer: "shimmer .8s ease-in-out",
			floaty: "floaty 3s ease-in-out infinite",
		},
	},
};

export const plugins = [];
