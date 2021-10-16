<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCardDetail
      v-if="resource"
      :resource.sync="resource"
      :actions="actions"
      is-user-page
      is-edit-page
      :card-title="resource.email"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin],
  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchUser()
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
              const updatedUser = this.resource

              await this.update(updatedUser)
            } catch (e) {
              this.error = e.response.data
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/admins/all_users' }),
                  2000
                )
                this.$notification.success('Данные пользователя обновлены', {
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
                        path: '/admins/all_users',
                      }),
                    2000
                  )
                  this.$notification.success('Пользователь успешно удален', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось удалить пользователя', {
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
          to: `/admins/all_users/${this.$route.params.id}`,
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getResource: 'user/itemById',
    }),

    ...ResourceHelper,
  },

  methods: {
    ...mapActions({
      update: 'user/UPDATE',
      delete: 'user/DELETE',
    }),

    async fetchUser() {
      await this.$store.dispatch('user/GET', this.$route.params.id)
    },
  },
}
</script>
