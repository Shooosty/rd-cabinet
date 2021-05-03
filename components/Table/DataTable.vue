<template>
  <b-table
    ref="selectableTable"
    small
    hover
    selectable
    select-mode="single"
    :items="items"
    :fields="fields"
    borderless
    striped
    :responsive="true"
    @row-selected="onRowSelected"
  >
    <template #cell(id)="data">
      <nuxt-link :to="`${pageName}/${data.value}`" class="table-link">{{
        data.value
      }}</nuxt-link>
    </template>

    <template #cell(datetime)="data">
      <i> {{ parseDateTime(data.value) }} </i>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },

  methods: {
    onRowSelected(item) {
      this.$router.push(`/admins/${this.pageName}/${item[0].ID}`)
    },

    parseDateTime(value) {
      return this.$dayjs(value).format('DD.MM.YYYY')
    },
  },
}
</script>

<style scoped lang="scss">
.table-link {
  text-decoration: none;
}
</style>
