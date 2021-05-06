<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :actions="actions"
    is-order-page
    card-title="Заказ №1"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin],

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
          govern: 'viewForEmployerAndUser',
          icon: 'edit',
        },
        {
          label: 'Оплатить',
          to: '#',
          icon: 'money-bill-wave',
          govern: 'viewForUser',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getResource: 'order/itemById',
    }),

    ...ResourceHelper,
  },

  methods: {
    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },
  },
}
</script>
