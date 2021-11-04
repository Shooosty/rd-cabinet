<template>
  <div>
    <div v-if="loading" class="loading-page">
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-if="progressPercent" class="loading-page">
      <b-progress
        :value="progressPercent"
        :max="max"
        show-progress
        animated
        class="progress-rd"
        variant="success"
        striped
      />
    </div>

    <div v-if="loader && percent" class="loading-page">
      <b-progress
        :value="percent"
        :max="max"
        show-progress
        animated
        class="progress-rd"
        variant="success"
        striped
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loader',

  data() {
    return {
      loading: false,

      loader: false,

      max: null,

      percent: null,
    }
  },

  computed: {
    ...mapGetters({
      progressPercent: 'photo/progress',
    }),
  },

  methods: {
    start() {
      // С помощью this.$nuxt.$loading.start() можно вызвать лоадер
      this.loading = true
    },

    progress(percent, max) {
      // С помощью this.$nuxt.$loading.progress() можно вызвать лоадер
      this.loader = true
      this.percent = percent
      this.max = max
    },

    finish() {
      // С помощью this.$nuxt.$loading.finish() можно прервать лоадер
      this.loading = false
      this.loader = false
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
