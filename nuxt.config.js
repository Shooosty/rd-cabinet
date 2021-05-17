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

  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    '~/assets/stylesheets/app.scss',
  ],

  plugins: [
    { src: '~/plugins/vue-tabs', mode: 'client' },
    { src: '~/plugins/vuex-persisted-state', mode: 'client' },
    { src: '~/plugins/vue-kindergarten', mode: 'client' },
    { src: '~/plugins/vue2-datepicker', mode: 'client' },
    { src: '~/plugins/vue-notification', mode: 'client' },
    { src: '~/plugins/vuelidate', mode: 'client' },
    { src: '~/plugins/vue-file-agent', mode: 'client' },
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dayjs',
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
              'faCalendar',
              'faUser',
              'faLock',
              'faClock',
              'faInfoCircle',
              'faPhone',
              'faCheck',
              'faUserGraduate',
              'faFilePdf',
              'faTrash',
              'faPrint',
              'faMagic',
              'faDownload',
              'faFileDownload',
              'faEnvelope',
              'faMoneyBillWave',
              'faWindowClose',
              'faCartArrowDown',
              'faShoppingCart',
              'faQuestionCircle',
              'faSave',
              'faBars',
              'faChevronDown',
              'faChevronUp',
              'faArrowLeft',
            ],
          },
        ],
      },
    ],
  ],

  dayjs: {
    locales: ['ru'],
    defaultLocale: 'ru',
    defaultTimeZone: 'Europe/Moscow',
    plugins: ['utc', 'timezone'],
  },

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
      home: '/',
    },

    resetOnError: true,

    rewriteRedirects: false,
  },

  axios: {},

  build: {},
}
