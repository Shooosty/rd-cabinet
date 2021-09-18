export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    store._vm.$nuxt.$loading.start()
  })

  $axios.onResponse(() => {
    store._vm.$nuxt.$loading.finish()
  })

  $axios.onError(() => {
    store._vm.$nuxt.$loading.finish()
  })
}
