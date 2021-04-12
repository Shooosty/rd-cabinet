<template>
  <div class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Имя: </b>
        <span> {{ resource.name }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> E-mail: </b>
        <span> {{ resource.email }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Телефон: </b>
        <span> {{ resource.phone }} </span>
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
