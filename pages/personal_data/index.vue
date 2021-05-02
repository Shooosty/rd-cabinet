<template>
  <div v-if="resource">
    <page-header card-title="Мои данные" :actions="actions" />
    <UserGeneral :resource.sync="resource" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      getResource: 'user/itemById',
    }),

    resourceComputed() {
      return Object.assign({}, this.getResource(this.userId))
    },
  },

  methods: {
    async fetchUser() {
      await this.$store.dispatch('user/GET', this.userId)
    },
  },
}
</script>
