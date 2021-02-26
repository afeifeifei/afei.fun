

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'afei.fun',
    htmlAttrs: {
      lang: 'zh-cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      {
        src: 'http://connect.qq.com/qc_jssdk.js',
        'data-appid': '101935222',
        'data-redirecturi': 'http://afei.fun/user'
      }
    ]
  },

  // Progress loading
  loading: {
    color: "#00b7ff"
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~static/css/reset.css',
    '~static/css/font.css',
    '~static/css/font/iconfont.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV==="production"?"http://afei.fun/":"http://localhost:3000/",
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  //配置express
  serverMiddleware: [
    '@/server/index.js'
  ]


}
