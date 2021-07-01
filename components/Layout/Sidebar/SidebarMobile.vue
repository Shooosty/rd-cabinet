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
        <nav class="d-flex justify-content-center">
          <PrimaryButton label="Выйти" @click.native="$nuxt.$auth.logout" />
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import SidebarMenu from '~/components/Layout/Sidebar/SidebarMenu'
import BurgerButton from '~/components/Button/BurgerButton'
import PrimaryButton from '~/components/Button/PrimaryButton'

export default {
  components: { PrimaryButton, SidebarMenu, BurgerButton },

  data() {
    return {
      menu: [
        // users && all
        {
          title: 'Мои заказы',
          route: '/my_orders',
          govern: 'viewForEmployerAndUser',
        },
        // {
        //   title: 'Мои бонусы',
        //   route: '/my_bonuses',
        //   govern: 'viewForUser',
        // },
        {
          title: 'Мои профиль',
          route: '/personal_data',
          govern: 'viewForAll',
        },
        {
          title: 'F.A.Q.',
          route: '/faq',
          govern: 'viewForUser',
        },
        // {
        //   title: 'Корзина',
        //   route: '/my_cart',
        //   govern: 'viewForUser',
        // },
        {
          title: 'Пароль и безопасноть',
          route: '/security',
          govern: 'viewForAll',
        },
        // admins
        {
          title: 'Все клиенты',
          route: '/admins/all_users',
          govern: 'viewForAdmin',
        },
        {
          title: 'Все заказы',
          route: '/admins/all_orders',
          govern: 'viewForAdmin',
        },
        // super-admins
        {
          title: 'Управление',
          route: '/admins/admin_manage',
          govern: 'viewForSuperAdmin',
        },
      ],
    }
  },
}
</script>
