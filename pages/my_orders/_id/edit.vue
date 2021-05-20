<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :actions="actions"
    :persons.sync="persons"
    is-order-page
    is-edit-page
    :card-title="orderNumber"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin],

  async fetch() {
    await this.fetchOrder()
    await this.fetchPersons()
  },

  data() {
    return {
      error: null,
      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          icon: 'save',
          click: async () => {
            try {
              this.error = null
              const updatedOrder = this.resource

              await this.update(Object.assign({}, updatedOrder))
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/my_orders' }),
                  2000
                )
                this.$notification.success('Данные заказа обновлены', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              } else {
                this.$notification.error('Не удалось обновить данные', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              }
            }
          },
        },
        {
          label: 'В дизайн',
          btnClass: 'black',
          icon: 'magic',
          isShow: this.$auth.user.role === 'photographer',
          govern: 'viewForPhotographer',
          click: async () => {
            try {
              this.error = null
              const updatedOrder = this.resource
              updatedOrder.owner = 'designer'
              updatedOrder.status = 'inDesign'

              await this.update(Object.assign({}, updatedOrder))
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/my_orders' }),
                  2000
                )
                this.$notification.success('Заказ передан дизайнеру', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              } else {
                this.$notification.error('Не удалось передать заказ', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              }
            }
          },
        },
        {
          label: 'В печать',
          btnClass: 'black',
          icon: 'print',
          isShow: this.$auth.user.role === 'designer',
          govern: 'viewForDesigner',
          click: async () => {
            try {
              this.error = null
              const updatedOrder = this.resource
              updatedOrder.owner = 'manager'
              updatedOrder.status = 'inPrint'

              await this.update(Object.assign({}, updatedOrder))
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/my_orders' }),
                  2000
                )
                this.$notification.success('Заказ передан в печать', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              } else {
                this.$notification.error('Не удалось передать заказ', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              }
            }
          },
        },
        {
          label: 'Отмена',
          btnClass: 'secondary',
          to: `/my_orders/${this.$route.params.id}`,
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getResource: 'order/itemById',
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

    async fetchPersons() {
      await this.$store.dispatch(
        'person/GET_ALL_BY_ORDER_ID',
        this.$route.params.id
      )
    },
  },
}
</script>
