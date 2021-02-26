<template>
  <n-link
    :to="to"
    class="btn ml-2 d-inline-flex align-items-center justify-content-center pt-0 pb-0"
    :class="type(btnClass)"
  >
    <span
      v-if="label"
      class="d-lg-inline-block"
      :class="[icon ? 'ml-2 d-none' : '']"
      v-text="label"
    />
    <span v-if="icon" class="ml-auto">
      <fa :icon="['fas', `${icon}`]" />
    </span>
  </n-link>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    btnClass: {
      type: String,
      default: 'success',
    },
    to: {
      type: [String, Object],
      default: '#',
    },
  },

  methods: {
    type(value) {
      switch (value) {
        case 'success':
          return 'btn-green'
        case 'danger':
          return 'btn-red'
        case 'secondary':
          return 'btn-bordered'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/stylesheets/default';
@import '~/assets/stylesheets/button';
@import '~/assets/stylesheets/media';
</style>
