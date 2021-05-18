<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCardDetail
      v-if="resource"
      :resource.sync="resource"
      :clients.sync="clients"
      :designers.sync="designers"
      :photographers.sync="photographers"
      :persons="persons"
      :actions="actions"
      :card-title="orderNumber"
      is-order-page
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin, UsersGroupByRoleMixin],
  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchOrder()
    await this.fetchUsers()
    await this.fetchPersons()
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
        {
          label: 'К списку',
          btnClass: 'black',
          to: '/admins/all_orders',
          icon: 'arrow-left',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getResource: 'order/itemById',
      users: 'user/items',
      persons: 'person/items',
    }),

    orderNumber() {
      return `Заказ № ${this.resource.number}`
    },

    ...ResourceHelper,
  },

  methods: {
    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },

    async fetchPersons() {
      await this.$store.dispatch(
        'person/GET_ALL_BY_ORDER_ID',
        this.$route.params.id
      )
    },
  },
}
</script>
