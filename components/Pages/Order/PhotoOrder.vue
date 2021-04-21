<template>
  <div>
    <div
      v-for="(form, index) in peoplePhotos"
      :key="index"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <div class="d-flex justify-content-end">
            <IconButton
              v-b-toggle="`collapse-${index}`"
              icon="chevron-down"
              class="collapse-button mr-3"
            />
          </div>
        </b-card-header>
        <b-collapse
          :id="`collapse-${index}`"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <b-row>
                <b-col xl="4" lg="4" md="12" sm="12" class="mt-1">
                  <div>
                    <b-form-input
                      v-model="form.sureName"
                      type="text"
                      :name="`surename-${index}`"
                      placeholder="Фамилия"
                    />
                  </div>
                </b-col>
                <b-col xl="4" lg="4" md="12" sm="12" class="mt-1">
                  <div>
                    <b-form-input
                      v-model="form.name"
                      type="text"
                      :name="`name-${index}`"
                      placeholder="Имя"
                    />
                  </div>
                </b-col>
                <b-col xl="4" lg="4" md="12" sm="12" class="mt-1">
                  <div>
                    <b-form-input
                      v-model="form.middleName"
                      type="text"
                      :name="`middlename-${index}`"
                      placeholder="Отчество"
                    />
                  </div>
                </b-col>
              </b-row>

              <div class="mt-3">
                <FileDropzone
                  :ref="`photos-${index}`"
                  :options="options"
                  :name="`photos-${index}`"
                />
              </div>

              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex justify-content-start mt-3">
                  <IconButton icon="save" @click.native="savePeople(index)" />
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <IconButton icon="trash" @click.native="removeCard(index)" />
                </div>
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
import FileDropzone from '@/components/Inputs/FileDropzone'
import IconButton from '~/components/Button/IconButton'

export default {
  components: { FileDropzone, IconButton },

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

      options: {
        acceptedFiles: 'image/*',
        url: `#`,
        maxFiles: 30,
        icon: 'file-download',
        autoProcessQueue: false,
        addRemoveLinks: true,
        sendFile: this.uploadPhotos,
        dictRemoveFile: 'удалить',
      },
    }
  },

  methods: {
    addCard() {
      this.peoplePhotos.push(Object.assign({}, this.defaultFormModels))
    },

    removeCard(index) {
      this.peoplePhotos.splice(index, 1)
    },
  },
}
</script>

<style scoped lang="scss">
.collapse-button {
  &:active {
    transition: transform 0.2s ease-out;
    transform: rotate(90deg);
  }
}

.collapsed > .collapse-button {
  transform: rotate(90deg);
}
</style>
