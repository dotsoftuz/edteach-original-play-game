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
        waitingLoader: 'waitingLoader .9s linear infinite',
      },
      keyframes: {
        waitingLoader: {
          '0%': { opacity: 1 },
          '45%': { opacity: 0 },
          '95%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
