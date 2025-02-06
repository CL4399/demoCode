module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extends: {
      spacing: {
        '48': "12rem"
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
    keyframes: {
      wiggle: {
        '0%': {
          transform: 'rotate(30deg)'
        },

        '100%': {
          transform: 'rotate(3600deg)'
        }
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}