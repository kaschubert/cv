// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './index.html', // if you have one
  ],

  theme: {
    extend: {
      // ────── Your exact dark gradient colors (never purged) ──────
      colors: {
        'cv-dark-start': '#020917',
        'cv-dark-end': '#101725',
      },

      // ────── Reusable gradient (optional but super clean) ──────
      backgroundImage: {
        'cv-gradient': 'linear-gradient(to bottom, #020917, #101725)',
      },

      // ────── Optional: nice defaults for your CV/playground ──────
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },

  plugins: [],
} satisfies Config;