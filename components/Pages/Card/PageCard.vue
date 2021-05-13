<template>
  <div>
    <page-header :card-title="cardTitle" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <vue-tabs>
        <v-tab title="Активные">
          <Card :cards="activeItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Закрытые">
          <Card :cards="closedItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Все">
          <Card :cards="items" :resource-name="resourceName" />
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card/Card'
import PageHeader from '~/components/Pages/Card/PageHeader'

export default {
  components: {
    PageHeader,
    Card,
  },

  props: {
    cardTitle: {
      type: String,
      required: true,
    },
    resourceName: {
      type: String,
      required: true,
    },
    items: {
      type: Array[Object],
      default() {
        return []
      },
    },
    actions: {
      type: Array[Object],
      default() {
        return []
      },
    },
  },

  computed: {
    activeItems() {
      return this.items.filter((order) => order.status !== 'closed')
    },

    closedItems() {
      return this.items.filter((order) => order.status === 'closed')
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
