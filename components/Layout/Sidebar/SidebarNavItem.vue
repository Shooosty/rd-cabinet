<template>
  <div v-show="$isAllowed(govern)">
    <li class="nav-item d-flex user-select-none">
      <n-link
        class="nav-link d-flex align-items-center"
        active-class="active"
        :to="route"
      >
        <span class="nav-item-label ml-3 text-nowrap">
          {{ title }}
        </span>
      </n-link>
    </li>
  </div>
</template>

<script>
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  props: {
    route: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    govern: {
      type: String,
      default: null,
    },
  },

  perimeters: [ViewPerimeter],
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/default';

.nav-item {
  width: 100%;
}

.nav-link {
  font-weight: $font-weight-normal;
  color: $secondary-color;
  font-size: $font-size-md;
  height: 52px;
  width: 100%;

  &.active {
    background-color: #f6f7f9;
    color: $success-color;
    border-right: solid 4px $success-color;
  }

  &:hover {
    background-color: #f6f7f9;
    color: $success-color;
  }
}
</style>
