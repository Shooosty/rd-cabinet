<template>
  <div v-if="isEditPage">
    <div
      v-for="(form, index) in persons"
      :key="index"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          v-b-toggle="`collapse-${index}`"
          header-tag="header"
          class="d-flex align-content-center justify-content-between collapse-header p-1"
          role="tab"
        >
          <div class="d-flex justify-content-start align-items-center ml-2">
            <span :name="index" class="type-icon">
              <fa
                v-if="form.type === 'teacher'"
                :icon="['fas', 'user-graduate']"
              />
              <fa v-if="form.type === 'pupil'" :icon="['fas', 'user']" />
            </span>
            <span :name="index" class="ml-2">
              {{ form.surname }} {{ form.name }} {{ form.middleName }}
            </span>
            <span
              v-if="form.middleName && form.type"
              :name="index"
              class="ml-3"
              :class="{
                green: form.photos.length > 0,
                red: form.photos.length === 0,
              }"
            >
              {{ form.photos.length }}
            </span>
          </div>
          <div class="d-flex justify-content-end">
            <IconButton icon="chevron-down" class="collapse-button mr-3" />
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
                      v-model="form.surname"
                      type="text"
                      :name="`surname-${index}`"
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

              <div class="mt-2">
                <multiselect
                  v-model="form.type"
                  selected-label="выбран"
                  deselect-label="убрать"
                  select-label="выбрать"
                  :options="types"
                  placeholder="тип модели"
                />
              </div>

              <div class="mt-3">
                <VueFileAgent
                  ref="photos"
                  v-model="photoFiles"
                  :multiple="true"
                  :deletable="true"
                  :meta="false"
                  :average-color="false"
                  :help-text="'Выберите или перетащите фотографии'"
                  :error-text="{
                    type: 'Неправильный тип файла',
                    size: 'Недопустимый размер файла',
                  }"
                  :accept="'image/*'"
                  :max-size="'10MB'"
                  :max-files="10"
                  :name="`photos-${index}`"
                  @select="showButton"
                  @beforedelete="deletePhoto($event, index)"
                />
                <div
                  v-if="isSavePhotosButtonShow"
                  class="d-flex justify-content-center mt-2"
                >
                  <PrimaryButton
                    label="Загрузить фотографии"
                    :name="`button-${index}`"
                    @click.native="savePhotos(index)"
                  />
                </div>
              </div>

              <div class="mt-3">
                <b-form-textarea
                  v-model="form.description"
                  placeholder="Поле для заметок.."
                  rows="3"
                  max-rows="8"
                />
              </div>

              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex justify-content-start mt-3">
                  <IconButton
                    v-b-toggle="`collapse-${index}`"
                    icon="save"
                    @click.native="savePerson(index)"
                  />
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <IconButton
                    icon="trash"
                    @click.native="removePerson(index)"
                  />
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

  <div v-else>
    <div
      v-for="(person, index) in persons"
      :key="index"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          v-b-toggle="`collapse-${index}`"
          header-tag="header"
          class="d-flex align-content-center justify-content-between collapse-header p-1"
          role="tab"
        >
          <div class="d-flex justify-content-start align-items-center ml-2">
            <span :name="index" class="type-icon">
              <fa
                v-if="person.type === 'teacher'"
                :icon="['fas', 'user-graduate']"
              />
              <fa v-if="person.type === 'pupil'" :icon="['fas', 'user']" />
            </span>
            <span class="ml-2" :name="index">
              {{ person.surname }} {{ person.name }} {{ person.middleName }}
            </span>
            <span
              class="ml-3"
              :class="{
                green: person.photos.length > 0,
                red: person.photos.length === 0,
              }"
            >
              <span>
                {{ person.photos.length }}
              </span>
            </span>
          </div>
          <div class="d-flex justify-content-end">
            <IconButton icon="chevron-down" class="collapse-button mr-3" />
          </div>
        </b-card-header>
        <b-collapse
          :id="`collapse-${index}`"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <div>
                <b-img
                  v-for="(image, i) in person.photos"
                  :key="i"
                  v-bind="imgProps"
                  class="d-inline-flex align-content-center p-1 m-1"
                  fluid
                  :src="image"
                />
              </div>

              <div v-if="person.description">
                <b> Заметка: </b>
                <span> {{ person.description }} </span>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import IconButton from '~/components/Button/IconButton'
import PrimaryButton from '~/components/Button/PrimaryButton'

export default {
  components: { PrimaryButton, IconButton, Multiselect },

  props: {
    resource: {
      type: Object,
      required: true,
    },
    isEditPage: {
      type: Boolean,
      default: false,
    },
    persons: {
      type: [Array],
      default: () => [],
    },
  },

  data() {
    return {
      defaultFormModels: {
        name: '',
        surname: '',
        orderId: '',
        middleName: '',
        type: '',
        photos: [],
        description: '',
      },

      photoFiles: [],

      types: ['teacher', 'pupil'],

      imgProps: { width: 75, height: 75 },

      error: null,
      isSavePhotosButtonShow: false,
    }
  },

  computed: {
    ...mapState('file', {
      files: (state) => {
        return state.items.map((r) => r.url)
      },
    }),
  },

  mounted() {
    this.persons.forEach((person) => {
      if (person.photos.length) {
        person.photos.forEach((photo) => {
          this.photoFiles.push({
            name: 'Загружен ранее',
            type: 'image/*',
            size: 1,
            url: photo,
          })
        })
      }
    })
  },

  methods: {
    ...mapActions({
      create: 'person/CREATE',
      update: 'person/UPDATE',
      delete: 'person/DELETE',
      updatePhotos: 'file/POST_FILES',
      clearFiles: 'file/CLEAR_FILES',
    }),

    showButton() {
      this.isSavePhotosButtonShow = true
    },

    addCard() {
      this.persons.push(Object.assign({}, this.defaultFormModels))
    },

    deletePhoto(fileRecord, index) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.photos[index].deleteFileRecord(fileRecord)
        this.persons[index].photos.pop(fileRecord.url)
      }
    },

    async savePhotos(index) {
      await this.clearFiles()
      for (const file of this.$refs.photos[index].fileRecords) {
        if (file) {
          try {
            this.error = null
            await this.updatePhotos(file.file)
          } catch (e) {
            this.error = e.response
          } finally {
            await this.clearFiles()
            this.isSavePhotosButtonShow = false
            if (this.error == null) {
              this.$notification.success(
                `${file.file.name} сохранено на сервере`,
                {
                  timer: 2,
                  position: 'bottomCenter',
                }
              )
            } else {
              this.$notification.error('Не удалось сохранить фотографию', {
                timer: 3,
                position: 'bottomCenter',
              })
            }
          }
        }
      }
    },

    async savePerson(index) {
      try {
        this.error = null
        const newPerson = this.persons[index]

        newPerson.orderId = this.resource.ID
        newPerson.photos = this.files.concat(this.persons[index].photos)

        if (this.persons[index].ID) {
          await this.update(Object.assign({}, newPerson))
        } else {
          await this.create(Object.assign({}, newPerson))
        }
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearFiles()
        if (this.error == null) {
          this.$notification.success('Данные сохранены', {
            timer: 3,
            position: 'bottomCenter',
          })
        } else {
          this.$notification.error('Не удалось сохранить данные', {
            timer: 3,
            position: 'bottomCenter',
          })
        }
      }
    },

    removePerson(index) {
      this.persons.splice(index, 1)
      if (this.persons[index].ID) {
        try {
          this.error = null
          this.delete(this.persons[index].ID)
        } catch (e) {
          this.error = e.response
        } finally {
          this.clearFiles()
          if (this.error == null) {
            this.$notification.success('Данные удалены', {
              timer: 3,
              position: 'bottomCenter',
            })
          } else {
            this.$notification.error('Не удалось удалить данные', {
              timer: 3,
              position: 'bottomCenter',
            })
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.collapse-header {
  cursor: pointer;
}

.collapse-button {
  &:active {
    transition: transform 0.2s ease-out;
    transform: rotate(90deg);
  }
}

.type-icon {
  font-size: 12px;
}

.green {
  color: $success-color;
}

.red {
  color: $danger-color;
}

.collapsed > .collapse-button {
  transform: rotate(90deg);
}
</style>
