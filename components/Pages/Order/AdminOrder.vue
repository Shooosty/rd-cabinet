<template>
  <div class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Клиент: </b>
        <span> ? </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Фотограф: </b>
        <span> ? </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дизайнер: </b>
        <span> ? </span>
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
