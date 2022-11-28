module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'false',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      animation: {
        waitingLoader1: 'waitingLoader1 2s linear infinite',
        waitingLoader2: 'waitingLoader2 3s linear infinite',
        waitingLoader3: 'waitingLoader3 4s linear infinite',
      },
      keyframes: {
        waitingLoader1: {
          '0%': { opacity: 1 },
          '45%': { opacity: 0 },
          '95%': { opacity: 1 },
        },
        waitingLoader2: {
          '0%': { opacity: 1 },
          '45%': { opacity: 0 },
          '95%': { opacity: 1 },
        },
        waitingLoader3: {
          '0%': { opacity: 1 },
          '45%': { opacity: 0 },
          '95%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
