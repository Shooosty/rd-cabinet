export default {
  data() {
    return {
      resource: null,
    }
  },

  watch: {
    resourceComputed() {
      this.resource = JSON.parse(JSON.stringify(this.resourceComputed))
    },
  },
}
