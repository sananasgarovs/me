/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      colors: {
        midnight: '#050811',
        obsidian: '#090d16',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'portal-glow': 'portal 3s ease-in-out infinite alternate',
      },
      keyframes: {
        portal: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(57, 255, 20, 0.7))' },
        },
      },
    },
  },
  plugins: [],
};
