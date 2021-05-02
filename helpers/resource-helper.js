export default {
  resourceComputed() {
    return Object.assign({}, this.getResource(this.$route.params.id))
  },
}
