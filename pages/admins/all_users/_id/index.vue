<template>
  <PageCardDetail
    v-if="resource"
    :resource.sync="resource"
    :card-title="resource.email"
    is-user-page
  />
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin],

  async fetch() {
    await this.fetchUser()
  },

  computed: {
    ...mapGetters({
      getResource: 'user/itemById',
    }),

    ...ResourceHelper,
  },

  methods: {
    async fetchUser() {
      await this.$store.dispatch('user/GET', this.$route.params.id)
    },
  },
}
</script>
