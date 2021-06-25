<template>
  <div>
    <page-header :card-title="cardTitle" :actions="actions" />
    <div v-if="this.$auth.user.role === 'user'" class="mt-3 card-body bg-white">
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

    <div
      v-else-if="this.$auth.user.role === 'designer'"
      class="mt-3 card-body bg-white"
    >
      <vue-tabs>
        <v-tab title="Ретушь и верстка">
          <Card :cards="activeDesignerItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Правки">
          <Card :cards="editDesignerItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Все">
          <Card :cards="items" :resource-name="resourceName" />
        </v-tab>
      </vue-tabs>
    </div>

    <div
      v-else-if="this.$auth.user.role === 'photographer'"
      class="mt-3 card-body bg-white"
    >
      <vue-tabs>
        <v-tab title="Съемка">
          <Card :cards="photoDateItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Выгрузка фото">
          <Card :cards="photoUploadItems" :resource-name="resourceName" />
        </v-tab>
        <v-tab title="Назначить доп съемку">
          <Card :cards="addPhotoDateItems" :resource-name="resourceName" />
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

    activeDesignerItems() {
      return this.items.filter((order) => order.status === 'onDesign')
    },

    editDesignerItems() {
      return this.items.filter((order) => order.status === 'onEdits')
    },

    addPhotoDateItems() {
      return this.items.filter(
        (order) => order.status === 'needAnotherPhotoDate'
      )
    },

    photoUploadItems() {
      return this.items.filter((order) => order.status === 'photoDateChecked')
    },

    photoDateItems() {
      return this.items.filter(
        (order) =>
          order.status === 'anotherPhotoDateApproved' ||
          order.status === 'photoDateApproved'
      )
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
