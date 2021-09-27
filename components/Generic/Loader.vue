<template>
  <div>
    <div v-if="loading" class="loading-page">
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-if="percent" class="loading-page">
      <b-progress
        :value="percent"
        :max="100"
        class="progress-rd"
        variant="success"
        striped
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',

  data() {
    return {
      loading: false,

      percent: null,
    }
  },

  methods: {
    start() {
      // С помощью this.$nuxt.$loading.start() можно вызвать лоадер
      this.loading = true
    },

    progress(value) {
      // С помощью this.$nuxt.$loading.progress() можно вызвать лоадер
      this.percent = value
    },

    finish() {
      // С помощью this.$nuxt.$loading.finish() можно прервать лоадер
      this.loading = false
      this.percent = null
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

.progress-rd {
  margin: 20rem;
}
</style>
