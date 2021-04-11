<template>
  <div>
    <div>info</div>
    <div
      v-for="(form, index) in peoplePhotos"
      :key="index"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            v-b-toggle="`collapse-${index}`"
            class="photo-container-button"
          ></b-button>
        </b-card-header>
        <b-collapse
          :id="`collapse-${index}`"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <input v-model="form.name" type="text" :name="`name-${index}`" />
              <input
                v-model="form.sureName"
                type="text"
                :name="`surename-${index}`"
              />
              <input
                v-model="form.middleName"
                type="text"
                :name="`middlename-${index}`"
              />
              <div class="d-flex justify-content-end">
                <IconButton icon="trash" @click.native="removeCard(index)" />
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <IconButton icon="plus" @click.native="addCard" />
    </div>
  </div>
</template>

<script>
import IconButton from '~/components/Button/IconButton'

export default {
  components: { IconButton },

  data() {
    return {
      defaultFormModels: {
        name: '',
        sureName: '',
        middleName: '',
        type: '',
        photos: '',
        description: '',
      },
      peoplePhotos: [],
    }
  },

  methods: {
    addCard() {
      this.peoplePhotos.push(Object.assign({}, this.defaultFormModels))
    },

    removeCard(i) {
      this.peoplePhotos.splice(i - 1, i)
    },
  },
}
</script>

<style scoped lang="scss">
.photo-container-button {
  width: 100%;
}
</style>
