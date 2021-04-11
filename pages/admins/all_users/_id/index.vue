<template>
  <PageCardDetail
    :resource="user"
    :actions="actions"
    :card-title="user.email"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'

export default {
  components: { PageCardDetail },

  async fetch() {
    await this.fetchUser()
  },

  data() {
    return {
      actions: [
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          to: `${this.$route.path}/edit`,
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
      await this.$store.dispatch('user/GET', this.$route.params.id)
    },
  },
}
</script>
