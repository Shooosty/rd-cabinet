<template>
  <div v-if="isEditPage && $isAllowed('viewForEmployerAndAdmins')">
    <b-list-group>
      <b-list-group-item>
        <label for="address">Адрес фотосъемки</label>
        <b-form-input
          id="address"
          v-model="resource.address"
          placeholder="Введите адрес"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="datetime">Дата и время фотосъемки</label>
        <date-picker
          id="datetime"
          v-model="resource.datetime"
          type="datetime"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="contract">Загрузите копию договора</label>
        <b-form-file
          id="contract"
          placeholder="file.xls"
          drop-placeholder="Перетащите файл сюда..."
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Адрес: </b>
        <span> {{ resource.address }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дата: </b>
        <span> {{ date }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Время: </b>
        <span> {{ time }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Статус: </b>
        <span> {{ status }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Договор: </b>
        <span> file.xls </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  perimeters: [ViewPerimeter],

  props: {
    resource: {
      type: Object,
      required: true,
    },
    isEditPage: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    date() {
      return this.$dayjs(this.resource?.datetime).format('DD.MM.YYYY')
    },

    time() {
      return this.$dayjs(this.resource?.datetime).format('HH:mm')
    },

    status() {
      switch (this.resource?.status) {
        case 'new':
          return 'новый'
        case 'active':
          return 'в работе'
        case 'close':
          return 'закрыт'
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
.mx-datepicker {
  width: 100%;
  .mx-input {
    height: 38px;
  }
}
</style>
