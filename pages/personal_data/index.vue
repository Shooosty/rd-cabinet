<template>
  <div>
    <page-header card-title="Мои данные" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <b-list-group>
        <b-list-group-item>
          <b> Имя: </b>
          <span> {{ user.name }} </span>
        </b-list-group-item>
        <b-list-group-item>
          <b> E-mail: </b>
          <span> {{ user.email }} </span>
        </b-list-group-item>
        <b-list-group-item>
          <b> Телефон: </b>
          <span> {{ user.phone }} </span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'

export default {
  components: { PageHeader },

  async fetch() {
    await this.fetchUser()
  },

  data() {
    return {
      userId: this.$auth.user.ID,
      actions: [
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          to: '/personal_data/edit',
          icon: 'edit',
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
