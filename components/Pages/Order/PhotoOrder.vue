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
          class="d-flex align-content-center justify-content-between collapse-header"
          role="tab"
          @click="fetchPhotos(form.ID)"
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
              class="ml-3"
              :class="{
                green: form.photosCount > 0,
                red: form.photosCount === 0,
              }"
            >
              <span>
                {{ form.photosCount }}
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
              <b-row>
                <b-col xl="4" lg="4" md="12" sm="12" class="mt-1">
                  <div>
                    <b-form-input
                      v-model="form.surname"
                      :disabled="
                        userRole === 'user' && form.changesAgree !== 'accepted'
                      "
                      required
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
                      :disabled="
                        userRole === 'user' && form.changesAgree !== 'accepted'
                      "
                      required
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
                      :disabled="
                        userRole === 'user' && form.changesAgree !== 'accepted'
                      "
                      required
                      type="text"
                      :name="`middlename-${index}`"
                      placeholder="Отчество"
                    />
                  </div>
                </b-col>
              </b-row>

              <div class="mt-3">
                <multiselect
                  v-model="form.type"
                  :searchable="false"
                  :disabled="
                    userRole === 'user' && form.changesAgree !== 'accepted'
                  "
                  selected-label="выбран"
                  deselect-label="убрать"
                  select-label="выбрать"
                  :custom-label="localizeTypes"
                  :options="types"
                  placeholder="тип модели"
                />
              </div>

              <div class="mt-5">
                <div class="gallery">
                  <div
                    v-for="image in photos"
                    :key="image.id"
                    class="gallery-panel"
                  >
                    <div class="photo">
                      <b-img class="image" :src="image.url" />
                      <div class="download-btn-container">
                        <IconButton
                          v-if="$isAllowed('viewForEmployerAndAdmins')"
                          icon="download"
                          class="download-btn"
                          :href="image.url"
                          download
                        />
                      </div>
                      <div class="delete-btn-container">
                        <IconButton
                          v-if="$isAllowed('viewForEmployerAndAdmins')"
                          icon="trash"
                          class="delete-btn"
                          @click.native="deleteLoadedPhoto(image.ID, index)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-show="$isAllowed('viewForUser')" class="mt-3">
                <b-form-checkbox
                  v-model="form.changesAgree"
                  :name="`checkbox-${index}`"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Я хочу внести изменения и согласен с условиями договора
                </b-form-checkbox>
              </div>

              <div
                v-show="
                  $isAllowed('viewForEmployerAndAdmins') ||
                  form.changesAgree === 'accepted'
                "
                class="mt-5"
              >
                <VueFileAgent
                  ref="photos"
                  :multiple="true"
                  :deletable="true"
                  :meta="true"
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
                  @beforedelete="deletePhoto($event, index)"
                />
              </div>

              <div class="mt-5">
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
                    v-if="
                      userRole !== 'user' || form.changesAgree === 'accepted'
                    "
                    v-b-toggle="`collapse-${index}`"
                    icon="save"
                    @click.native="savePerson(index)"
                  />
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <IconButton
                    v-if="$isAllowed('viewForEmployerAndAdmins')"
                    icon="trash"
                    class="remove-person-btn"
                    @click.native="removePerson(index)"
                  />
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div
      v-if="$isAllowed('viewForEmployerAndAdmins')"
      class="d-flex justify-content-center mt-3"
    >
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
          @click="fetchPhotos(person.ID)"
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
                green: person.photosCount > 0,
                red: person.photosCount === 0,
              }"
            >
              <span>
                {{ person.photosCount }}
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
              <div class="gallery">
                <div
                  v-for="image in photos"
                  :key="image.id"
                  class="gallery-panel"
                >
                  <b-img class="image" :src="image.url" />
                </div>
              </div>
              <div v-if="person.description" class="mt-1">
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
import { mapActions, mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'
import IconButton from '~/components/Button/IconButton'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { IconButton, Multiselect },

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

  async fetch() {
    await this.fetchPersons()
  },

  data() {
    return {
      defaultFormModels: {
        name: '',
        surname: '',
        orderId: '',
        middleName: '',
        type: '',
        description: '',
        photosCount: null,
        changesAgree: 'not_accepted',
      },

      types: ['teacher', 'pupil'],

      error: null,
    }
  },

  computed: {
    ...mapGetters({
      photos: 'photo/items',
      persons: 'person/items',
      newPersonId: 'person/personId',
    }),

    userRole() {
      return this.$auth.user.role
    },
  },

  methods: {
    ...mapActions({
      create: 'person/CREATE',
      update: 'person/UPDATE',
      delete: 'person/DELETE',
      uploadPhoto: 'photo/CREATE',
      removePhoto: 'photo/DELETE',
      clearPhotos: 'photo/CLEAR',
    }),

    addCard() {
      this.clearPhotos()
      this.persons.push(Object.assign({}, this.defaultFormModels))
    },

    localizeTypes(type) {
      switch (type) {
        case 'pupil':
          return 'Ученик'
        case 'teacher':
          return 'Учитель'
      }
    },

    deletePhoto(fileRecord, index) {
      this.$refs.photos[index].deleteFileRecord(fileRecord)
    },

    async deleteLoadedPhoto(id, index) {
      if (confirm('Подтверждаете удаление?')) {
        const i = this.photos.findIndex((p) => p.ID === id)
        if (i > -1) {
          this.photos.splice(i, 1)
        }
        const newPerson = this.persons[index]
        newPerson.photosCount = this.persons[index].photosCount - 1
        await this.update(Object.assign({}, newPerson))
        await this.removePhoto(id)
      }
    },

    async savePhotos(index, personId) {
      this.clearPhotos()
      for (const file of this.$refs.photos[index].fileRecords) {
        try {
          this.error = null
          const newFile = { file: file.file, personId }
          await this.uploadPhoto(Object.assign({}, newFile))
        } catch (e) {
          this.error = e.response.data
        } finally {
          if (this.error == null) {
            this.$notification.success(
              `${file.file.name} сохранено на сервере`,
              {
                timer: 2,
                position: 'bottomCenter',
              }
            )
          } else if (
            this.error.message ===
            'pq: duplicate key value violates unique constraint \\"photos_name_uindex\\"'
          ) {
            this.$notification.error(
              'Фотография с таким именем уже загружена',
              {
                timer: 3,
                position: 'bottomCenter',
              }
            )
          }
        }
      }
    },

    async fetchPhotos(id) {
      this.clearPhotos()
      if (id) {
        await this.$store.dispatch('photo/GET_ALL_BY_PERSON_ID', id)
      }
    },

    async fetchPersons() {
      await this.$store.dispatch(
        'person/GET_ALL_BY_ORDER_ID',
        this.$route.params.id
      )
    },

    async savePerson(index) {
      try {
        this.error = null
        const newPerson = this.persons[index]
        newPerson.orderId = this.resource.ID
        const personId = this.persons[index].ID

        if (personId) {
          await this.savePhotos(index, personId)
          newPerson.photosCount =
            this.$refs.photos[index].fileRecords.length +
            this.persons[index].photosCount
          await this.update(Object.assign({}, newPerson))
          await this.fetchPersons()
        } else {
          newPerson.photosCount = this.$refs.photos[index].fileRecords.length
          await this.create(Object.assign({}, newPerson))
          this.savePhotos(index, this.newPersonId)
          await this.fetchPersons()
        }
      } catch (e) {
        this.error = e.response.data
      } finally {
        this.$refs.photos[index].fileRecords = []
        await this.clearPhotos()
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
      if (confirm('Подтверждаете удаление?')) {
        if (this.persons.length) {
          try {
            this.error = null
            this.delete(this.persons[index].ID)
          } catch (e) {
            this.error = e.response
          } finally {
            this.persons.splice(index, 1)
            this.clearPhotos()
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
        } else {
          this.persons.splice(index, 1)
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

.card-body {
  min-height: 180px;
}

.collapse-button {
  &:active {
    transition: transform 0.2s ease-out;
    transform: rotate(90deg);
  }
}

.delete-btn-container {
  display: none;
  position: absolute;
  bottom: 50%;
  left: 55%;
}

.download-btn-container {
  display: none;
  position: absolute;
  bottom: 50%;
  left: 45%;
}

.delete-btn {
  font-size: $font-size-md;
  color: $danger-color;

  &:hover {
    color: $danger-color;
    transform: rotate(10deg);
  }
}

.download-btn {
  font-size: $font-size-md;
  color: $success-color;

  &:hover {
    color: $success-color;
    transform: rotate(10deg);
  }
}

.link {
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  -ms-line-clamp: 2;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
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

.photo {
  position: relative;

  &:hover {
    div {
      display: block;
    }
    img {
      opacity: 65%;
    }
  }
}

.remove-person-btn {
  &:hover {
    color: $danger-color;
  }
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel .image {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
