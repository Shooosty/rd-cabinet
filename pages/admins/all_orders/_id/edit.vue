<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCardDetail
      v-if="resource"
      :clients.sync="clients"
      :designers.sync="designers"
      :photographers.sync="photographers"
      :managers.sync="managers"
      :resource.sync="resource"
      :persons="persons"
      :actions="actions"
      is-order-page
      is-edit-page
      :card-title="orderNumber"
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
      error: null,
      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/admins/all_orders',
          icon: 'save',
          click: async () => {
            try {
              this.error = null
              const updatedOrder = this.resource
              updatedOrder.designerId = updatedOrder.designerId.ID
              updatedOrder.photographerId = updatedOrder.photographerId.ID
              updatedOrder.userId = updatedOrder.userId.ID
              updatedOrder.managerId = updatedOrder.managerId.ID

              await this.update(Object.assign({}, updatedOrder))
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/admins/all_orders' }),
                  2000
                )
                this.$notification.success('Данные заказа обновлены', {
                  timer: 3,
                  position: 'topRight',
                })
              } else {
                this.$notification.error('Не удалось обновить данные', {
                  timer: 3,
                  position: 'topRight',
                })
              }
            }
          },
        },
        {
          label: 'Удалить',
          btnClass: 'danger',
          govern: 'viewForSuperAdmin',
          icon: 'trash',
          click: async () => {
            if (confirm('Подтверждаете удаление?')) {
              try {
                this.error = null
                await this.delete(this.resource.ID)
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  setTimeout(
                    () =>
                      this.$router.push({
                        path: '/admins/all_orders',
                      }),
                    2000
                  )
                  this.$notification.success('Заказ успешно удален', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось удалить заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                }
              }
            }
          },
        },
        {
          label: 'Отмена',
          btnClass: 'secondary',
          to: `/admins/all_orders/${this.$route.params.id}`,
          icon: 'window-close',
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
      delete: 'order/DELETE',
    }),

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },

    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
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
