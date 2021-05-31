<template>
  <div>
    <page-header card-title="Мои данные" :actions="actions" />
    <UserGeneral :resource.sync="user" is-edit-page />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import UserGeneral from '~/components/Pages/User/UserGeneral'

export default {
  components: { UserGeneral, PageHeader },

  data() {
    return {
      error: null,

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/personal_data',
          icon: 'save',
          click: async () => {
            try {
              this.error = null
              await this.update(this.user)
            } catch (e) {
              this.error = e.response
            } finally {
              if (this.error == null) {
                setTimeout(
                  () => this.$router.push({ path: '/personal_data' }),
                  2000
                )
                this.$notification.success('Данные успешно изменены', {
                  timer: 3,
                  position: 'topRight',
                })
              } else {
                this.$notification.error('Не удалось сохранить данные', {
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
          to: '/personal_data',
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapState('auth', {
      ...mapState('auth', {
        user: (state) => state.user,
      }),
    }),
  },

  methods: {
    ...mapActions({
      update: 'user/UPDATE',
    }),
  },
}
</script>
