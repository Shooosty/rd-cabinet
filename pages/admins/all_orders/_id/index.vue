<template>
  <div v-show="$isAllowed('viewForAdminAndDesigner')">
    <PageCardDetail
      v-if="resource"
      :resource.sync="resource"
      :managers.sync="managers"
      :clients.sync="clients"
      :comments="comments"
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
import { mapActions, mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import Model from '~/models/order'

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
      ...Model,

      actions: [
        {
          label: 'К списку',
          btnClass: 'black',
          to: '/admins/all_orders',
          icon: 'arrow-left',
        },
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          govern: 'viewForAdmin',
          to: `${this.$route.path}/edit`,
          icon: 'edit',
        },
        {
          label: 'Взять заказ',
          btnClass: 'success',
          govern: 'viewForDesigner',
          icon: 'hand-paper',
          click: async () => {
            if (confirm('Взять этот заказ на выполнение?')) {
              try {
                this.error = null
                const updatedOrder = this.resource
                updatedOrder.designerId = this.$auth.user.ID

                await this.update(updatedOrder)
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  setTimeout(
                    () =>
                      this.$router.push({
                        path: '/my_orders',
                      }),
                    2000
                  )
                  this.$notification.success('Заказ успешно взят в работу', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось взять заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                }
              }
            }
          },
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
    ...mapActions({
      update: 'order/UPDATE',
    }),

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
