<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :actions="actions"
    is-order-page
    is-edit-page
    card-title="Заказ №1"
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
    }),

    ...ResourceHelper,
  },

  methods: {
    ...mapActions({
      update: 'order/UPDATE',
    }),

    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },
  },
}
</script>
