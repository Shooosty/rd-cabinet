<template>
  <div class="mt-3 card-body bg-white">
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
export default {
  props: {
    resource: {
      type: Object,
      required: true,
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
