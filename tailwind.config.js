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
        countAnimation: 'countAnimation 10s infinite',
        handAnimation: 'handAnimation 2s linear infinite',
        waitingLoader1: 'waitingLoader1 2s linear infinite',
        waitingLoader2: 'waitingLoader2 3s linear infinite',
        waitingLoader3: 'waitingLoader3 4s linear infinite',
      },
      keyframes: {
        handAnimation: {
          '0%': { transform: 'rotate( 0.0deg)' },
          '10%': {
            transform: 'rotate(14.0deg)',
          },
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg) ' },
          '40%': { transform: 'rotate(-4.0deg) ' },
          '50%': { transform: 'rotate(10.0deg) ' },
          '60%': {
            transform: 'rotate(0.0deg)',
          },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        countAnimation: {
          '10%': {
            transform: 'translateY(-110%)',
          },
          '25%': {
            transform: 'translateY(-110%)',
          },
          '35%': {
            transform: 'translateY(-210%)',
          },
          '50%': {
            transform: 'translateY(-210%)',
          },
          '60%': {
            transform: 'translateY(-310%)',
          },
          '75%': {
            transform: 'translateY(-310%)',
          },
          '85%': {
            transform: 'translateY(-410%)',
          },
          '100%': {
            transform: 'translateY(-410%)',
          },
        },
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
