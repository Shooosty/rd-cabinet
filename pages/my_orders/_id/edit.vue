<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :comments="comments"
    :managers.sync="managers"
    :designers.sync="designers"
    :photographers.sync="photographers"
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
import Model from '~/models/order'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin, UsersGroupByRoleMixin],

  async fetch() {
    await this.fetchOrder()
    await this.fetchUsers()
    await this.fetchPersons()
  },

  data() {
    return {
      error: null,

      ...Model,

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          icon: 'save',
          click: async () => {
            try {
              this.error = null
              const updatedOrder = this.resource

              if (this.$store.state.layout.file !== '') {
                updatedOrder.layout = this.$store.state.layout.file
              }

              if (this.$store.state.layoutCover.file !== '') {
                updatedOrder.layoutCover = this.$store.state.layoutCover.file
              }

              if (this.$store.state.photoContract.file !== '') {
                updatedOrder.photoContract = this.$store.state.photoContract.file
              }

              if (this.$store.state.file.file !== '') {
                const arr = []
                this.resource.tz.forEach((t) => {
                  arr.push(t)
                })
                arr.push(this.$store.state.file.file)
                updatedOrder.tz = arr
              }

              await this.update(Object.assign({}, updatedOrder))
              this.allFilesClear()
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () =>
                    this.$router.push({
                      path: `/my_orders/${this.$route.params.id}`,
                    }),
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
          label: 'Отмена',
          btnClass: 'secondary',
          to:
            this.$auth.user.role === 'user'
              ? `/my_orders/edit`
              : `/my_orders/${this.$route.params.id}`,
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
      clearContract: 'contract/CLEAR',
      clearAttachContract: 'attachContract/CLEAR',
      clearAdditionalContract: 'additionalContract/CLEAR',
      clearPhotoContract: 'photoContract/CLEAR',
      clearFile: 'file/CLEAR',
      clearLayout: 'layout/CLEAR',
      clearLayoutCover: 'layoutCover/CLEAR',
    }),

    async fetchOrder() {
      await this.$store.dispatch('order/GET', this.$route.params.id)
    },

    allFilesClear() {
      this.clearContract()
      this.clearAttachContract()
      this.clearAdditionalContract()
      this.clearPhotoContract()
      this.clearFile()
      this.clearLayout()
      this.clearLayoutCover()
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
