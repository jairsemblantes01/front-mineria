const BACKEND = process.env.BACKEND || 'http://localhost:5001'
// const BACKEND_HELP = process.env.BACKEND_HELP || 'https://api-tocdesk-firmas-dev.toc.com.ec'
const BACKEND_HELP = process.env.BACKEND_HELP || 'http://localhost:3005'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // fix
  publicRuntimeConfig: {
    BACKEND_HELP
  },
  server: {
    port: process.env.PORT || 3009,
    host: '0.0.0.0'
  },
  /* router: {
    middleware: 'check-auth'
  }, */
  head: {
    title: 'Firmaselectrónicas.ec',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '~/assets/style/main.less',
      lang: 'less'
    },
    // 'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/antd-ui', mode: 'client' },
    { src: '@/plugins/axios.js', mode: 'client' },
    { src: '@/plugins/vuesax.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /* devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ], */

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  axios: { proxy: true },
  proxy: {
    '/api/': {
      target: BACKEND,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
    },
    loaders: {
      less: {
        javascriptEnabled: true,
      }
    },
    transpile: ['vee-validate/dist/rules']
  }

}
