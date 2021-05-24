<template>
  <div v-if="!isEditPage" class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Имя: </b>
        <span class="ml-1"> {{ resource.name }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> E-mail: </b>
        <span class="ml-1"> {{ resource.email }} </span>
      </b-list-group-item>
      <b-list-group-item v-show="$isAllowed('viewForEmployerAndAdmins')">
        <b> Роль: </b>
        <span> {{ localizeRoles(resource.role) }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Телефон: </b>
        <span class="ml-1"> {{ resource.phone }} </span>
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Имя: </b>
        <b-form-input v-model="resource.name"></b-form-input>
      </b-list-group-item>
      <b-list-group-item>
        <b> Телефон: </b>
        <b-form-input v-model="resource.phone"></b-form-input>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import ViewPerimeter from '~/perimeters/viewPerimeter'
import LocalizeMixin from '~/mixins/localize-mixin'

export default {
  perimeters: [ViewPerimeter],
  mixins: [LocalizeMixin],

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

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
