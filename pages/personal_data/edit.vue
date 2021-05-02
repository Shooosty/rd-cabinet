<template>
  <div v-if="resource">
    <page-header card-title="Мои данные" :actions="actions" />
    <UserGeneral :resource.sync="resource" is-edit-page />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ResourceMixin from '~/mixins/resource-mixin'
import UserGeneral from '~/components/Pages/User/UserGeneral'

export default {
  components: { UserGeneral, PageHeader },

  mixins: [ResourceMixin],

  async fetch() {
    await this.fetchUser()
  },

  data() {
    return {
      error: null,
      userId: this.$auth.user.ID,

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/personal_data',
          icon: 'save',
          click: async () => {
            try {
              this.error = null
              await this.update(this.resource)
            } catch (e) {
              this.error = e
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/personal_data' }),
                  2000
                )
                this.$notification.success('Данные успешно изменены', {
                  timer: 3,
                  position: 'bottomCenter',
                })
              } else {
                this.$notification.error('Не удалось сохранить данные', {
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
          to: '/personal_data',
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getResource: 'user/itemById',
    }),

    resourceComputed() {
      return Object.assign({}, this.getResource(this.userId))
    },
  },

  methods: {
    ...mapActions({
      update: 'user/UPDATE',
    }),

    async fetchUser() {
      await this.$store.dispatch('user/GET', this.userId)
    },
  },
}
</script>
