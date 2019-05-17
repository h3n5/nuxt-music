const pkg = require('./package')

module.exports = {
  mode: 'universal',
  server: {
    port: 8000 // default: 3000
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '网易云音乐',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['assets/main.css', { src: 'swiper/dist/css/swiper.css' }],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/audio/install.js', ssr: false },
    { src: '~/plugins/iview.js', ssr: true }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    middleware: ['visit', 'user-agent']
  },
  /*
   ** Build configuration
   */
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'iview',
          libraryDirectory: 'src/components'
        }
      ]
    ]
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
