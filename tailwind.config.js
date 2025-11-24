/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FDF9F3',
        ink: '#1a1a1a',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['SF Mono', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
