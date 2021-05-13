<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageCardDetail
      v-if="resource"
      :resource.sync="resource"
      :actions="actions"
      :card-title="resource.email"
      is-user-page
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'
import ResourceHelper from '~/helpers/resource-helper'
import ResourceMixin from '~/mixins/resource-mixin'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageCardDetail },

  mixins: [ResourceMixin],
  perimeters: [ViewPerimeter],

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
          govern: 'viewForSuperAdmin',
          icon: 'edit',
        },
        {
          label: 'К списку',
          btnClass: 'black',
          to: '/admins/all_users',
          icon: 'arrow-left',
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
    async fetchUser() {
      await this.$store.dispatch('user/GET', this.$route.params.id)
    },
  },
}
</script>
