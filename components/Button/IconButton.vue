<template>
  <n-link
    :to="to"
    class="d-inline-flex align-items-center justify-content-center icon mr-3 p-0"
  >
    <span>
      <fa :icon="['fas', `${icon}`]" />
    </span>
  </n-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: '#',
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.icon {
  color: $secondary-color;
  transform-origin: center;
  transform: scale(1.2);
  transition: transform 0.2s ease-out;
  &:hover {
    color: $success-color;
    transform: scale(1.6);
    transition: transform 0.2s ease-in;
  }
}
</style>
