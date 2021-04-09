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
.btn {
  min-width: 82px;
}
</style>
