<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCardDetail
      v-if="resource"
      :clients.sync="clients"
      :designers.sync="designers"
      :photographers.sync="photographers"
      :managers.sync="managers"
      :comments="comments"
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
import Model from '~/models/order'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin, UsersGroupByRoleMixin],
  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchOrder()
    await this.fetchUsers()
    await this.fetchPersons()
    await this.fetchPhotos()
  },

  data() {
    return {
      ...Model,

      error: null,

      defaultFormModels: {
        name: '',
        surname: '',
        orderId: '',
        middleName: '',
        role: '',
        type: '',
        willBuy: 'not_accepted',
        description: '',
        photosCount: null,
        changesAgree: 'not_accepted',
      },

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

              if (
                updatedOrder.photographerId &&
                updatedOrder.address &&
                updatedOrder.status === 'new'
              ) {
                updatedOrder.status = 'photoDateApproved'
              }

              if (this.$store.state.contract.file !== '') {
                updatedOrder.contract = this.$store.state.contract.file
              }

              if (this.$store.state.layoutCover.file !== '') {
                updatedOrder.layoutCover = this.$store.state.layoutCover.file
              }

              if (this.$store.state.layout.file !== '') {
                updatedOrder.layout = this.$store.state.layout.file
              }

              if (this.$store.state.attachContract.file !== '') {
                updatedOrder.attachmentContract = this.$store.state.attachContract.file
              }

              if (this.$store.state.additionalContract.file !== '') {
                updatedOrder.additionalContract = this.$store.state.additionalContract.file
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

              const cover = this.persons.filter((p) => p.type === 'cover')[0]
              const group = this.persons.filter((p) => p.type === 'group')[0]
              const reportage = this.persons.filter(
                (p) => p.type === 'reportage'
              )[0]

              await this.update(Object.assign({}, updatedOrder))
              this.allFilesClear()
              if (updatedOrder.sections.includes('cover') && !cover) {
                this.savePerson(
                  this.resource.ID,
                  'cover',
                  'Фото учебного заведения'
                )
              }
              if (updatedOrder.sections.includes('group') && !group) {
                this.savePerson(
                  this.resource.ID,
                  'group',
                  'Общегрупповая фотография'
                )
              }
              if (updatedOrder.sections.includes('reportage') && !reportage) {
                this.savePerson(this.resource.ID, 'reportage', 'Репортаж')
              }
            } catch (e) {
              this.error = e.response
            } finally {
              if (this.error == null) {
                setTimeout(
                  () =>
                    this.$router.push({
                      path: `/admins/all_orders/${this.$route.params.id}`,
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
          label: 'Удалить',
          btnClass: 'danger',
          govern: 'viewForSuperAdmin',
          icon: 'trash',
          click: async () => {
            if (confirm('Подтверждаете удаление?')) {
              try {
                this.error = null
                await this.deleteAllOrderPhotos
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
      photos: 'photo/items',
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
      createPerson: 'person/CREATE',
      clearContract: 'contract/CLEAR',
      clearAttachContract: 'attachContract/CLEAR',
      clearAdditionalContract: 'additionalContract/CLEAR',
      clearPhotoContract: 'photoContract/CLEAR',
      clearFile: 'file/CLEAR',
      clearLayout: 'layout/CLEAR',
      clearLayoutCover: 'layoutCover/CLEAR',
      removeOnS3: 'photo/DELETE_ON_S3',
      removePhoto: 'photo/DELETE',
    }),

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },

    async deleteAllOrderPhotos() {
      const arr = this.photos
      for (const i of arr) {
        await this.removePhoto(i.ID)
        await this.removeOnS3(i.nameS3)
      }
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

    async savePerson(id, type, name) {
      const newPerson = this.defaultFormModels
      newPerson.orderId = id
      newPerson.surname = name
      newPerson.type = type
      await this.createPerson(Object.assign({}, newPerson))
    },

    async fetchPhotos() {
      await this.$store.dispatch(
        'photo/GET_ALL_BY_ORDER_ID',
        this.$route.params.id
      )
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
