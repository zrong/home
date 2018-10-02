const pkg = require('./package')
const util = require('util')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '曾嵘的主页',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
  /*
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      // ['markdown-it-container', 'md'],
      // 'markdown-it-attrs'
    ],
    preprocess (markdownIt, source) {
      // 为 table 加入 class
      markdownIt.renderer.rules.table_open = function(tokens, idx) {
        return '<table class="table is-striped is-fullwidth is-bordered is-responsive">\n'
      }
      // 为 H 加入class
      markdownIt.renderer.rules.heading_open = function(tokens, idx, options, env, slf) {
        let token = tokens[idx]
        let fmt = '<%s class="%s">'
        if (token.tag === 'h1')
        {
          return util.format(fmt, token.tag, 'title')
        } else if (token.tag === 'h2') {
          return util.format(fmt, token.tag, 'subtitle')
        }
        return util.format('<%s>', token.tag)
      }
      return source
    }
  },
  */
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
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
