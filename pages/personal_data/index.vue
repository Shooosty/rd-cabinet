<template>
  <div>
    <page-header card-title="Мои данные" :actions="actions" />
    <UserGeneral :resource.sync="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import UserGeneral from '~/components/Pages/User/UserGeneral'

export default {
  components: { UserGeneral, PageHeader },

  data() {
    return {
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
    ...mapState('auth', {
      ...mapState('auth', {
        user: (state) => state.user,
      }),
    }),
  },
}
</script>
