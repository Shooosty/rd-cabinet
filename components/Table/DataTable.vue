<template>
  <b-table
    small
    hover
    :items="items"
    :fields="fields"
    borderless
    striped
    :responsive="true"
  >
    <template #cell(id)="data">
      <nuxt-link :to="`${pageName}/${data.value}`" class="table-link">{{
        data.value
      }}</nuxt-link>
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
}
</script>

<style scoped lang="scss">
.table-link {
  text-decoration: none;
}
</style>
