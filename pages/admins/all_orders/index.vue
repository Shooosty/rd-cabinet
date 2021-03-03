<template>
  <div v-show="$isAllowed('viewSidebarMenuItemForAdmin')">
    <page-header card-title="Все заказы" />
    <div class="mt-3 card-body bg-white">
      <div class="d-flex">
        <DataTable :items="orders" :fields="fields" :page-name="pageName" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import SidebarMenuPerimeter from '~/perimeters/sidebarMenuPerimeter'
import DataTable from '~/components/Table/DataTable'

export default {
  components: { DataTable, PageHeader },

  perimeters: [SidebarMenuPerimeter],

  async fetch() {
    await this.fetchOrders()
  },

  data() {
    return {
      fields: ['id', 'name', 'user_id'],
      pageName: 'all_orders',
    }
  },

  computed: {
    ...mapGetters({
      items: 'order/all',
      pagination: 'order/pagination',
    }),

    orders() {
      return this.items.data
    },
  },

  methods: {
    async fetchOrders() {
      await this.$store.dispatch('order/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
