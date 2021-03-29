<template>
  <div>
    <BurgerButton v-b-toggle.sidebar-mobile />
    <b-sidebar
      id="sidebar-mobile"
      aria-labelledby="Меню"
      backdrop-variant="light"
      backdrop
      right
    >
      <div class="p-3">
        <nav class="mb-3">
          <SidebarMenu :menu="menu" />
        </nav>
        <nuxt-link to="#" @click.native="$nuxt.$auth.logout"> Выйти </nuxt-link>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import SidebarMenu from '~/components/Layout/Sidebar/SidebarMenu'
import BurgerButton from '~/components/Button/BurgerButton'

export default {
  components: { SidebarMenu, BurgerButton },

  data() {
    return {
      menu: [
        { title: 'Дашборд', route: '/user/dashboard', icon: 'user' },
        { title: 'Мои авто', route: '/user/cars', icon: 'user' },
      ],
    }
  },
}
</script>
