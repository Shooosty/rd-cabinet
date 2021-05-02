<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :actions="actions"
    is-user-page
    is-edit-page
    :card-title="resource.email"
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

              await this.update(Object.assign({}, updatedUser))
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
          label: 'Удалить',
          btnClass: 'danger',
          to: `/admins/all_users/${this.$route.params.id}`,
          icon: 'trash',
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
    }),

    async fetchUser() {
      await this.$store.dispatch('user/GET', this.$route.params.id)
    },
  },
}
</script>
