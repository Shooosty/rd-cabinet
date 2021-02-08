<template>
  <div class="sidebar-container d-none d-lg-block">
    <div class="sidebar-main">
      <div
        class="sidebar-menu-container bg-white align-content-start pl-2 pt-3"
      >
        <sidebar-menu :menu="menu" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '~/components/Layout/Sidebar/SidebarMenu'
export default {
  components: { SidebarMenu },
  data() {
    return {
      menu: [
        { title: 'Мои заказы', route: '/my_orders' },
        { title: 'Мои проекты', route: '/my_projects' },
        { title: 'Мои бонусы', route: '/my_bonuses' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 200px;
  position: relative;
  height: 100%;
}
.sidebar-main {
  width: 200px;
  position: fixed;
  z-index: 100;
  top: 56px;
  bottom: 0;
  left: 0;
  padding: 0;
}
.sidebar-menu-container {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
</style>
