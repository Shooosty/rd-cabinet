<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <div class="mt-3 card-body bg-white">
      <div class="d-flex">
        <DataTable :items="orders" :fields="fields" :page-name="pageName" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import DataTable from '~/components/Table/DataTable'

export default {
  components: {
    DataTable,
  },

  props: {
    resource: {
      type: Object,
      default: () => {},
    },
  },

  perimeters: [ViewPerimeter],

  async fetch() {
    if (this.resource.role === 'photographer') {
      await this.$store.dispatch('order/GET_ALL_FOR_PHOTOGRAPHER', this.id)
    } else if (this.resource.role === 'designer') {
      await this.$store.dispatch('order/GET_ALL_FOR_DESIGNER', this.id)
    } else {
      await this.$store.dispatch('order/GET_ALL_FOR_USER', this.id)
    }
  },

  data() {
    return {
      fields: [
        { key: 'datetime', label: 'Дата съемки' },
        { key: 'owner', label: 'Ответственный' },
        { key: 'status', label: 'Статус' },
      ],
      pageName: 'all_orders',
    }
  },

  computed: {
    ...mapGetters({
      orders: 'order/items',
      pagination: 'order/pagination',
    }),

    id() {
      return this.resource?.ID
    },
  },
}
</script>
