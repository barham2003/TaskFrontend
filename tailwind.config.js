/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			height: {
				100: "35rem",
			},
			minWidth: {
				"1/2": "50%",
				full: "94%",
			},
			colors: {
				new: "rgba(0, 0, 0, 0.538)",
			},
		},
	},
	plugins: [],
}
