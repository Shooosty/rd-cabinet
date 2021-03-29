export default {
  ssr: false,

  head: {
    title: 'rhino-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src: '~/plugins/vue-tabs', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-kindergarten', ssr: false },
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faPlus',
              'faEdit',
              'faUser',
              'faLock',
              'faPhone',
              'faCheck',
              'faTrash',
              'faEnvelope',
              'faMoneyBillWave',
              'faWindowClose',
              'faCartArrowDown',
              'faShoppingCart',
              'faQuestionCircle',
              'faSave',
              'faBars',
            ],
          },
        ],
      },
    ],
  ],

  loading: {
    color: '#00908c',
    failedColor: '#ff2c61',
    height: '2px',
  },

  router: {
    middleware: ['auth', 'vue-kindergarten'],
  },

  auth: {
    cookie: {
      options: {
        expires: 365,
        secure: process.env.NODE_ENV === 'production',
      },
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/sign-in',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
        },
        autoFetchUser: false,
        tokenType: false,
      },
    },

    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      home: '/my_orders',
    },

    resetOnError: true,

    rewriteRedirects: false,
  },

  axios: {},

  build: {},
}
