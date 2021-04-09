<template>
  <div v-show="$isAllowed('viewForEmployerAndUser')">
    <PageCard
      :items="orders"
      :resource-name="resourceName"
      is-card-page
      card-title="Мои заказы"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageCard from '~/components/Pages/Card/PageCard'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: {
    PageCard,
  },

  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchOrders()
  },

  data() {
    return {
      resourceName: 'my_orders',
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
      if (this.$auth.user.role === 'user') {
        await this.$store.dispatch('order/GET_ALL_FOR_USER', this.$auth.user.ID)
      } else if (this.$auth.user.role === 'photographer') {
        await this.$store.dispatch(
          'order/GET_ALL_FOR_PHOTOGRAPHER',
          this.$auth.user.ID
        )
      } else if (this.$auth.user.role === 'designer') {
        await this.$store.dispatch(
          'order/GET_ALL_FOR_DESIGNER',
          this.$auth.user.ID
        )
      }
    },
  },
}
</script>
