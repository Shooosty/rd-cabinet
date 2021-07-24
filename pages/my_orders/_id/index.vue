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
      ...Model,

      actions: [
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          to: `${this.$route.path}/edit`,
          govern: 'viewForEmployerAndUser',
          icon: 'edit',
        },
        {
          label: 'На сверку',
          btnClass: 'black',
          icon: 'user-check',
          govern: 'viewForDesigner',
          click: async () => {
            if (confirm('Отправить клиенту?')) {
              try {
                this.error = null
                const updatedOrder = this.resource
                updatedOrder.status = 'onTheClientApprove'

                await this.update(Object.assign({}, updatedOrder))
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  setTimeout(
                    () => this.$router.push({ path: '/my_orders' }),
                    2000
                  )
                  this.$notification.success('Заказ передан на сверку', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось передать заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                }
              }
            }
          },
        },
        {
          label: 'На формирование',
          btnClass: 'black',
          icon: 'user-check',
          govern: 'viewForPhotographer',
          click: async () => {
            if (
              confirm(
                'Я подтверждаю, что произвёл фотосъёмку в соответствии с техническим заданием и передаю весь материал по списку, указанном в заказ наряде на съёмку'
              )
            ) {
              try {
                this.error = null
                const updatedOrder = this.resource
                updatedOrder.status = 'onTheFormation'
                updatedOrder.preFormDate = this.$dayjs(new Date()).format(
                  'YYYY-MM-DD HH:mm'
                )

                await this.update(Object.assign({}, updatedOrder))
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  setTimeout(
                    () => this.$router.push({ path: '/my_orders' }),
                    2000
                  )
                  this.$notification.success('Заказ передан на сверку', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось передать заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                }
              }
            }
          },
        },
        // {
        //   label: 'Оплатить',
        //   to: '#',
        //   icon: 'money-bill-wave',
        //   govern: 'viewForUser',
        // },
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
