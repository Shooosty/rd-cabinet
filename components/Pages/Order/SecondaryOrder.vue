<template>
  <div v-if="isEditPage" class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <label for="description">Заметка</label>
        <b-form-textarea
          id="description"
          v-model="resource.description"
          placeholder="Поле для заметок.."
          rows="3"
          max-rows="8"
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Заметка: </b>
        <span class="ml-1"> {{ resource.description }} </span>
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
    isEditPage: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
