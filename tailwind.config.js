/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#159FE3', // Primary Service Blue
          600: '#0E88C6',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          DEFAULT: '#159FE3',
        },
        surface: {
          bg: '#F4F7FB', // Light Lavender/Blue-gray Canvas
          card: '#FFFFFF',
          sidebar: '#FFFFFF',
          border: '#E2E8F0',
          subtle: '#F8FAFC',
        },
        status: {
          coral: '#FF6B4A',
          amber: '#F59E0B',
          green: '#10B981',
          red: '#EF4444',
          blue: '#159FE3',
          purple: '#8B5CF6',
        }
      },
      borderRadius: {
        'card': '18px',
        'button': '10px',
        'badge': '9999px',
        'modal': '20px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 4px 12px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
        'modal': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'drawer': '-10px 0 30px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
