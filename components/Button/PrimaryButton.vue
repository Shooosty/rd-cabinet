<template>
  <button class="btn">
    <span> {{ label }} </span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';
@import '~/assets/stylesheets/button';
@import '~/assets/stylesheets/media';
</style>
