<template>
  <PageCardDetail
    :resource="order"
    :actions="actions"
    is-order-page
    card-title="Заказ №1"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'

export default {
  components: { PageCardDetail },

  async fetch() {
    await this.fetchOrder()
  },

  data() {
    return {
      actions: [
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          to: `${this.$route.path}/edit`,
          icon: 'edit',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      order: 'order/item',
    }),
  },

  methods: {
    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },
  },
}
</script>
