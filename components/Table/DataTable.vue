<template>
  <b-table
    v-if="items.length"
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

    <template #cell(status)="data">
      <span> {{ localizeStatuses(data.value) }} </span>
    </template>

    <template #cell(owner)="data">
      <span> {{ localizeOwners(data.value) }} </span>
    </template>

    <template #cell(role)="data">
      <span> {{ localizeRoles(data.value) }} </span>
    </template>
  </b-table>
</template>

<script>
import localizeMixin from '~/mixins/localize-mixin'

export default {
  mixins: [localizeMixin],

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
