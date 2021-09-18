<template>
  <div v-if="loading" class="loading-page">
    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'Loader',

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    start() {
      // С помощью this.$nuxt.$loading.start() можно вызвать лоадер
      this.loading = true
    },

    finish() {
      // С помощью this.$nuxt.$loading.finish() можно прервать лоадер
      this.loading = false
    },
  },
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
}
</style>
