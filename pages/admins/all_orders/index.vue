<template>
  <div v-show="$isAllowed('viewForAdminAndDesigner')">
    <div>
      <PageHeader card-title="Все заказы" :actions="actions" />
      <div class="mt-3 card-body bg-white">
        <div class="d-flex">
          <DataTable
            v-if="this.$auth.user.role === 'designer'"
            :items="ordersForDesigner"
            :fields="fields"
            :users="users"
            :page-name="pageName"
          />
          <DataTable
            v-else
            :items="orders"
            :fields="fields"
            :users="users"
            :page-name="pageName"
          />
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
    await this.fetchUsers()
  },

  data() {
    return {
      fields: [
        { key: 'number', label: '№', sortable: true },
        { key: 'dateTimes', label: 'Дата первой съемки' },
        { key: 'design', label: 'Дизайн обложки', sortable: true },
        { key: 'userId', label: 'Клиент' },
        { key: 'status', label: 'Статус', sortable: true },
        { key: 'createdAt', label: 'Дата создания' },
      ],
      pageName: 'all_orders',
      actions: [
        {
          label: 'Создать',
          btnClass: 'success',
          govern: 'viewForAdmin',
          to: '/admins/all_orders/new',
          icon: 'plus',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      orders: 'order/items',
      users: 'user/items',
      pagination: 'order/pagination',
    }),

    ordersForDesigner() {
      return this.orders.filter(
        (order) => order.status === 'onDesign' && !order.designerId
      )
    },
  },

  methods: {
    async fetchOrders() {
      await this.$store.dispatch('order/GET_ALL')
    },

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
