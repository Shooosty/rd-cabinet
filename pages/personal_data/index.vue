<template>
  <div>
    <page-header card-title="Мои данные" />
    <div class="mt-3 card-body bg-white">
      <b-list-group>
        <b-list-group-item>
          <b> Имя:</b>
        </b-list-group-item>
        <b-list-group-item>
          <b> E-mail: </b>
        </b-list-group-item>
      </b-list-group>
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
