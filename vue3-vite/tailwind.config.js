module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extends: {
      spacing: {
        '48': "12rem"
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [],
}