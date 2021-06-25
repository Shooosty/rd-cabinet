<template>
  <div v-if="items.length" class="table">
    <b-row>
      <b-col lg="12" class="my-1">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Поиск в таблице.."
        />
        <IconButton icon="envelop" :disabled="!filter" @click="filter = ''" />
      </b-col>
    </b-row>

    <div>
      <b-table
        ref="selectableTable"
        small
        hover
        selectable
        select-mode="single"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
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

        <template #cell(dateTime)="data">
          <span> {{ parseDateTime(data.value[0]) }} </span>
        </template>

        <template #cell(createdAt)="data">
          <span> {{ parseCreatedAt(data.value) }} </span>
        </template>

        <template #cell(design)="data">
          <span> {{ localizeDesigns(data.value) }} </span>
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
    </div>
  </div>
</template>

<script>
import localizeMixin from '~/mixins/localize-mixin'
import IconButton from '~/components/Button/IconButton'

export default {
  components: { IconButton },
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

  data() {
    return {
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },

  methods: {
    onRowSelected(item) {
      this.$router.push(`/admins/${this.pageName}/${item[0].ID}`)
    },

    parseCreatedAt(value) {
      return this.$dayjs(value).format('DD.MM.YYYY')
    },

    parseDateTime(value) {
      return this.$dayjs(value).format('DD.MM.YYYY')
    },
  },
}
</script>

<style scoped lang="scss">
.table {
  display: block !important;
}

.table-link {
  text-decoration: none;
}
</style>
