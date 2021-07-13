<template>
  <div v-if="!isEditPage" class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Имя: </b>
        <span class="ml-1"> {{ resource.name }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Фамилия: </b>
        <span class="ml-1"> {{ resource.surname }} </span>
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
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">имя</div>
              <div class="d-flex">
                <input
                  v-model="resource.name"
                  class="form-control width-email"
                  required
                  type="text"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'user']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">фамилия</div>
              <div class="d-flex">
                <input
                  v-model="resource.surname"
                  class="form-control width-email"
                  required
                  type="text"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'user']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">телефон</div>
              <div class="d-flex">
                <input
                  v-model="resource.phone"
                  v-phone
                  placeholder="(555)555-55-55"
                  class="form-control width-email"
                  autocomplete="tel"
                  maxlength="12"
                  required
                  type="tel"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'phone']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>
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
@import '~/assets/stylesheets/auth-page';

.card-body {
  border-radius: 5px;
}
</style>
