<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <page-header card-title="Список пользователей" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div class="d-flex">
        <DataTable :items="users" :fields="fields" :page-name="pageName" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import DataTable from '~/components/Table/DataTable'

export default {
  components: { DataTable, PageHeader },

  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchUsers()
  },

  data() {
    return {
      fields: [
        { key: 'name', label: 'Имя', sortable: true },
        { key: 'surname', label: 'Фамилия', sortable: true },
        { key: 'email', label: 'Логин', sortable: true },
        { key: 'phone', label: 'Телефон', sortable: true },
        { key: 'role', label: 'Роль', sortable: true },
        { key: 'createdAt', label: 'Дата создания' },
      ],

      pageName: 'all_users',

      actions: [
        {
          label: 'Добавить',
          btnClass: 'success',
          to: '/admins/all_users/new',
          icon: 'plus',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/items',
      pagination: 'user/pagination',
    }),
  },

  methods: {
    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
