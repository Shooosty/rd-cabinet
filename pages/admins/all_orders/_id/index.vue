<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :clients.sync="clients"
    :designers.sync="designers"
    :photographers.sync="photographers"
    :actions="actions"
    card-title="Заказ №1"
    is-order-page
  />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin, UsersGroupByRoleMixin],

  async fetch() {
    await this.fetchOrder()
    await this.fetchUsers()
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
    }),

    ...ResourceHelper,
  },

  methods: {
    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>
