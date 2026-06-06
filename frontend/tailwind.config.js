/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dde6ff',
          200: '#b3c6ff',
          400: '#6695ff',
          500: '#3d6eff',
          600: '#2550e8',
          800: '#1a35a3',
          900: '#0f1f6b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp:  { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseDot: { '0%,80%,100%': { transform: 'scale(0.6)', opacity: 0.4 }, '40%': { transform: 'scale(1)', opacity: 1 } },
      },
    },
  },
  plugins: [],
}
