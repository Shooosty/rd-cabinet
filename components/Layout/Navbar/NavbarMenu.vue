<template>
  <div class="navbar-nav flex-row align-items-center justify-content-end w-100">
    <ul class="d-flex align-items-top p-0 m-0 list-unstyled">
      <li
        v-show="$isAllowed('viewSidebarMenuItemForUser')"
        class="nav-item user-select-none mr-3"
      >
        <icon-button icon="question-circle" to="/faq" />
      </li>
      <li
        v-show="$isAllowed('viewSidebarMenuItemForUser')"
        class="nav-item user-select-none mr-3"
      >
        <icon-button icon="shopping-cart" to="/my_cart" />
      </li>
      <li class="nav-item user-select-none p-0 m-0 mr-3">
        <sidebar-user-menu class="pr-3" />
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarUserMenu from '~/components/Layout/Sidebar/SidebarUserMenu'
import IconButton from '~/components/Button/IconButton'
import SidebarMenuPerimeter from '~/perimeters/sidebarMenuPerimeter'

export default {
  components: { IconButton, SidebarUserMenu },

  perimeters: [SidebarMenuPerimeter],
}
</script>
