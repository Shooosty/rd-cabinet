<template>
  <div>
    <page-header card-title="Мои данные" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <b-list-group>
        <b-list-group-item>
          <b> Имя: </b>
          <b-form-input
            v-model="editedUser.name"
            :placeholder="user.name"
          ></b-form-input>
        </b-list-group-item>
        <b-list-group-item>
          <b> Телефон: </b>
          <b-form-input
            v-model="editedUser.phone"
            :placeholder="user.phone"
          ></b-form-input>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'

export default {
  components: { PageHeader },

  async fetch() {
    await this.fetchUser()
  },

  data() {
    return {
      userId: this.$auth.user.ID,
      editedUser: {
        id: localStorage.getItem('userId'),
        name: '',
        phone: '',
      },

      actions: [
        {
          label: 'Отмена',
          btnClass: 'danger',
          to: '/personal_data',
          icon: 'window-close',
        },
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/personal_data',
          icon: 'check',
          click: () => {
            this.update(this.editedUser).then(() => {
              this.$router.push({ path: '/personal_data' })
            })
          },
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/item',
    }),
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

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
