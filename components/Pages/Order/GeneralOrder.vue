<template>
  <div class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Адрес: </b>
        <span> {{ resource.address }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дата: </b>
        <span> {{ resource.datetime }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Время: </b>
        <span> {{ resource.datetime }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Статус: </b>
        <span> {{ resource.status }} </span>
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
}
</script>
