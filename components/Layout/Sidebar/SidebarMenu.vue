<template>
  <ul class="pt-2">
    <NavItem
      v-for="item in menu"
      :key="item.route"
      :govern="item.govern"
      :title="item.title"
      :route="item.route"
      :icon="item.icon"
      class="nav-item"
    />
  </ul>
</template>

<script>
import NavItem from '~/components/Layout/Sidebar/SidebarNavItem'

export default {
  components: {
    NavItem,
  },

  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
