import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
    "./lib/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1E3A",
        accent: "#FFC300",
        surface: "#E5E7EB",
        ink: "#111827",
        info: "#0EA5E9"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, rgba(11,30,58,0) 60%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(11,30,58,0.95) 0%, rgba(14,165,233,0.35) 100%)"
      },
      boxShadow: {
        soft: "0 10px 30px -20px rgba(11, 30, 58, 0.5)"
      }
    }
  },
  plugins: []
};

export default config;
