<template>
  <div v-if="isEditPage" class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <label>Выберите клиента</label>
        <multiselect
          v-model="resource.userId"
          :options="clients"
          selected-label="выбран"
          select-label="нажмите, чтобы выбрать"
          placeholder="email"
          label="email"
          track-by="email"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label>Выберите фотографа</label>
        <multiselect
          v-model="resource.photographerId"
          :options="photographers"
          selected-label="выбран"
          select-label="нажмите, чтобы выбрать"
          placeholder="фотограф"
          label="email"
          track-by="email"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label>Выберите дизайнера</label>
        <multiselect
          v-model="resource.designerId"
          :options="designers"
          selected-label="выбран"
          select-label="нажмите, чтобы выбрать"
          placeholder="дизайнер"
          label="email"
          track-by="email"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label>Ответственный</label>
        <multiselect
          v-model="resource.owner"
          :searchable="false"
          selected-label="выбран"
          deselect-label="убрать"
          select-label="выбрать"
          :custom-label="localizeOwners"
          :options="owners"
          placeholder="ответственный"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label>Статус</label>
        <multiselect
          v-model="resource.status"
          :searchable="false"
          selected-label="выбран"
          deselect-label="убрать"
          select-label="выбрать"
          :custom-label="localizeStatuses"
          :options="statuses"
          placeholder="статус заказа"
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div
    v-else-if="chosenClient && chosenDesigner && chosenPhotographer"
    class="mt-3 card-body bg-white"
  >
    <b-list-group>
      <b-list-group-item>
        <b> Клиент: </b>
        <span class="ml-1"> {{ chosenClient.name }} </span>
        <span>&bull;</span>
        <span> {{ chosenClient.email }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Фотограф: </b>
        <span class="ml-1"> {{ chosenPhotographer.name }} </span>
        <span>&bull;</span>
        <span> {{ chosenPhotographer.email }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дизайнер: </b>
        <span class="ml-1"> {{ chosenDesigner.name }} </span>
        <span>&bull;</span>
        <span> {{ chosenDesigner.email }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Ответственный: </b>
        <span class="ml-1"> {{ localizeOwners(resource.owner) }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Статус заказа: </b>
        <span class="ml-1"> {{ localizeStatuses(resource.status) }} </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import localizeMixin from '~/mixins/localize-mixin'

export default {
  components: { Multiselect },

  mixins: [localizeMixin],

  props: {
    resource: {
      type: Object,
      required: true,
    },
    clients: {
      type: [Array],
      default: () => [],
    },
    photographers: {
      type: [Array],
      default: () => [],
    },
    designers: {
      type: [Array],
      default: () => [],
    },
    isEditPage: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      owners: ['photographer', 'manager', 'designer'],
      statuses: ['active', 'close', 'inDesign', 'inPrint'],
    }
  },

  computed: {
    chosenClient() {
      return this.clients.filter(
        (value) => value.ID === this.resource.userId
      )[0]
    },

    chosenPhotographer() {
      return this.photographers.filter(
        (value) => value.ID === this.resource.photographerId
      )[0]
    },

    chosenDesigner() {
      return this.designers.filter(
        (value) => value.ID === this.resource.designerId
      )[0]
    },
  },
}
</script>
