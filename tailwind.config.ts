import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PingFang: ['"PingFang SC",sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config
