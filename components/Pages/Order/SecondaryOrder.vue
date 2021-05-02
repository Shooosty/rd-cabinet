<template>
  <div class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Заметка: </b>
        <span> {{ description }} </span>
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
    description() {
      return this.resource?.description
    },
  },
}
</script>
