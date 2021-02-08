<template>
  <div>
    <page-header :card-title="cardTitle" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <vue-tabs>
        <v-tab v-for="tab in tabs" :key="tab.title" :title="tab.title">
          <card :cards="tab.card" :resource-name="tab.resourceName" />
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
    tabs: {
      type: Array[Object],
      required: true,
    },
    actions: {
      type: Array[Object],
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
