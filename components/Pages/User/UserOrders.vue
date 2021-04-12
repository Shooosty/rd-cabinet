<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCard
      :items="orders"
      :resource-name="resourceName"
      is-card-page
      card-title="Заказы пользователя"
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

  props: {
    resource: {
      type: Object,
      required: true,
    },
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

    id() {
      return this.resource?.ID
    },
  },

  methods: {
    async fetchOrders() {
      if (this.resource?.owner === 'photographer') {
        await this.$store.dispatch('order/GET_ALL_FOR_PHOTOGRAPHER', this.id)
      } else if (this.resource?.owner === 'designer') {
        await this.$store.dispatch('order/GET_ALL_FOR_DESIGNER', this.id)
      } else {
        await this.$store.dispatch('order/GET_ALL_FOR_USER', this.id)
      }
    },
  },
}
</script>
