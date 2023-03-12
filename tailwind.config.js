module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      blur: {
        filter: 'blur(0px)',
      },
      colors: {
        prim: '#DB731E',
        'prim-2': '#CE3F27',
        'prim-3': '',
        sec: 'var(--link-color-4)',
        primh: '#ee964b',
        second: '#3b9bea',
        primride: '#942525',
      },
    }
  },
  variants: {
    width: ['responsive', 'hover', 'focus']
  },
  plugins: []
}
