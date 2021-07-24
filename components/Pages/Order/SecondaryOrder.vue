<template>
  <div
    v-if="isEditPage && $isAllowed('viewForEmployerAndAdmins')"
    class="mt-3 card-body bg-white"
  >
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

      <b-list-group-item v-show="$isAllowed('viewForAdmin')">
        <label for="initial-description">Внутренняя заметка</label>
        <b-form-textarea
          id="initial-description"
          v-model="resource.initialDescription"
          placeholder="Поле для внутренних заметок.."
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

      <b-list-group-item v-show="$isAllowed('viewForEmployerAndAdmins')">
        <b> Внутренняя заметка: </b>
        <span class="ml-1"> {{ resource.initialDescription }} </span>
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
}
</script>
