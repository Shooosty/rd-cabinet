<template>
  <div>
    <page-header card-title="Мои данные" />
    <div class="mt-3 card-body bg-white">
      <span> данные </span>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Pages/Card/PageHeader'

export default {
  components: { PageHeader },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
