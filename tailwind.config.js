/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        skeleton:
          "linear-gradient(270deg, hsl(var(--secondary)), hsl(var(--secondary) / 80%), hsl(var(--secondary) / 70%), hsl(var(--secondary) / 50%))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGlow: {
          from: { boxShadow: "0 0 0 0 hsl(var(--primary) / 30%)" },
          to: { boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)" },
        },
        spinner: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        skeleton: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        text: {
          "0%, 100%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
        rainbow: {
          "0%": { backgroundPosition: "0%" },
          "100%": { backgroundPosition: "200%" },
        },
        "fade-word": {
          "0%, 15%": {
            transform: "rotateX(90deg)",
            opacity: "0",
          },
          "25%, 40%": {
            transform: "rotateX(0deg)",
            opacity: "1",
          },
          "50%": {
            transform: "rotateX(-90deg)",
            opacity: "0",
          },
          "100%": {
            transform: "rotateX(-90deg)",
            opacity: "0",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        draw: {
          from: { strokeDasharray: "0, 200" },
          to: { strokeDasharray: "200, 200" },
        },
      },
      animation: {
        shine: "shine 5s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulseGlow: "pulseGlow 1.75s infinite cubic-bezier(0.66, 0, 0, 1)",
        spinner: "spinner 1.2s linear infinite",
        skeleton: "skeleton 8s ease-in-out infinite",
        text: "text 5s ease forwards",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        "fade-word": "fade-word 8s infinite",
        shimmer: "shimmer 5s linear infinite",
        draw: "draw 1s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
