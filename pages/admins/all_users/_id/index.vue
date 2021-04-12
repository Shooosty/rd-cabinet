<template>
  <PageCardDetail :resource="user" :card-title="user.email" is-user-page />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'

export default {
  components: { PageCardDetail },

  async fetch() {
    await this.fetchUser()
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
