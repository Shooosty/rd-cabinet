<template>
  <li class="nav-item d-flex user-select-none">
    <n-link
      class="nav-link d-flex align-items-center"
      active-class="active"
      :to="route"
    >
      <span v-if="icon !== null" class="icon-muted">
        <icon :icon="['fal', icon]" />
      </span>
      <span class="nav-item-label ml-3 text-nowrap">
        {{ title }}
      </span>
    </n-link>
  </li>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped>
.nav-item {
  width: 100%;
}

.nav-link {
  font-weight: normal;
  color: #232424;
  font-size: 18px;
  height: 52px;
  width: 100%;

  &.active {
    background-color: #f6f7f9;
    color: #00908c;
    border-right: solid 4px #00908c;
  }

  &:hover {
    background-color: #f6f7f9;
    color: #00908c;
  }
}
</style>
