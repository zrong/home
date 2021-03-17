const path = require('path')

module.exports = {
  title: "ZRONG's HOME",
  description: '曾嵘的网站',
  // theme: require.resolve('../theme')
  markdown: {
    anchor: {permalink: false}
  },
  themeConfig: {
    nav: [
      {name:'阅读', path: '/read/'},
      {name: '生涯', path: '/career/'},
      {name: '推荐', path: '/recommend/'},
      {name: '关于', path: '/about/'}
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@theme': path.resolve( __dirname, 'theme'),
        '@docs': path.resolve(__dirname, '..'),
        '@public': path.resolve(__dirname, 'public'),
      },
    },
  },
}