/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Design tokens — single source of truth
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        'surface-2': '#F1F5F9',
        border: '#E2E8F0',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        brand: '#4F6FE8',
        'brand-2': '#7C5CE7',
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        info: '#2563EB',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'card-md': '0 4px 12px rgba(15, 23, 42, 0.08)',
        'brand': '0 4px 14px rgba(79, 111, 232, 0.25)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
