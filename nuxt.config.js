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

  plugins: [{ src: '~/plugins/vue-tabs', ssr: false }],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
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
              'faTrash',
              'faMoneyBillWave',
              'faWindowClose',
              'faCartArrowDown',
              'faShoppingCart',
              'faQuestionCircle',
            ],
          },
        ],
      },
    ],
  ],

  axios: {},

  build: {},
}
