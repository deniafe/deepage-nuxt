module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#0c0715',
        secondary: '#221f2e',
        primary: '#f32756',
        text: '#777c85',
        card: '#242232',
        headingText: '#d5d4de',
        input: '#181625',
        appBlue: '#00a2ff',
        success: '#00f2c3',
        info: '#1d8cf8',
        warning: '#ff8d72',
        error: '#fd5d93',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
