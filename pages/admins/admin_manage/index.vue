<template>
  <div v-show="$isAllowed('viewSidebarMenuItemForSuperAdmin')">
    <page-header card-title="Администрирование" />
    <div class="mt-3 card-body bg-white">
      <span> adm/manage </span>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Pages/Card/PageHeader'
import SidebarMenuPerimeter from '~/perimeters/sidebarMenuPerimeter'

export default {
  components: { PageHeader },

  perimeters: [SidebarMenuPerimeter],
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
