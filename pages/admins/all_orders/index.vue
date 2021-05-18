<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <div>
      <PageHeader card-title="Все заказы" :actions="actions" />
      <div class="mt-3 card-body bg-white">
        <div class="d-flex">
          <DataTable :items="orders" :fields="fields" :page-name="pageName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import DataTable from '~/components/Table/DataTable'

export default {
  components: { DataTable, PageHeader },

  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchOrders()
  },

  data() {
    return {
      fields: [
        { key: 'number', label: '№' },
        { key: 'datetime', label: 'Дата съемки' },
        { key: 'owner', label: 'Ответственный' },
        { key: 'status', label: 'Статус' },
      ],
      pageName: 'all_orders',
      actions: [
        {
          label: 'Создать',
          btnClass: 'success',
          to: '/admins/all_orders/new',
          icon: 'plus',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      orders: 'order/items',
      pagination: 'order/pagination',
    }),
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
