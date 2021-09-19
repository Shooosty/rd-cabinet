<template>
  <div class="navbar-nav flex-row align-items-center justify-content-end w-100">
    <ul class="d-flex align-items-top p-0 m-0 list-unstyled">
      <li
        v-if="this.$auth.user.role === 'user'"
        class="
          nav-item
          user-select-none
          mr-3
          d-none d-lg-flex d-sm-flex d-xl-flex
        "
      >
        <IconButton icon="question-circle" to="/faq" />
      </li>
      <!--      <li-->
      <!--        v-if="this.$auth.user.role === 'user'"-->
      <!--        class="nav-item user-select-none mr-3 d-none d-lg-flex d-sm-flex d-xl-flex"-->
      <!--      >-->
      <!--        <IconButton icon="shopping-cart" to="/my_cart" />-->
      <!--      </li>-->
      <li
        class="
          nav-item
          user-select-none
          p-0
          m-0
          mr-3
          d-none d-lg-flex d-sm-flex d-xl-flex
        "
      >
        <SidebarUserMenu class="pr-3" />
      </li>
    </ul>
    <MobileSidebar class="d-block d-lg-none d-sm-none d-xl-none" />
  </div>
</template>

<script>
import SidebarUserMenu from '~/components/Layout/Sidebar/SidebarUserMenu'
import IconButton from '~/components/Button/IconButton'
import MobileSidebar from '~/components/Layout/Sidebar/SidebarMobile'

export default {
  components: { IconButton, MobileSidebar, SidebarUserMenu },
}
</script>
