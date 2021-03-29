<template>
  <b-navbar
    fixed="top"
    variant="white shadow"
    type="light"
    class="d-flex align-items-center p-3"
  >
    <div>
      <b-img v-bind="mainProps" src="~@/assets/images/logo.svg"></b-img>
    </div>
    <NavbarMenu />
  </b-navbar>
</template>

<script>
import NavbarMenu from '~/components/Layout/Navbar/NavbarMenu'

export default {
  components: { NavbarMenu },

  data() {
    return {
      mainProps: { width: 165, height: 55, class: 'd-flex m2' },
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 4rem;
}
</style>
