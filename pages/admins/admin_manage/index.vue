<template>
  <div v-show="$isAllowed('viewForSuperAdmin')">
    <page-header card-title="Администрирование" />
    <div class="mt-3 card-body bg-white">
      <span> adm/manage </span>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageHeader },

  perimeters: [ViewPerimeter],
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
