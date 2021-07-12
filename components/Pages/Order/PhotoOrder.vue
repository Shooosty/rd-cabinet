<template>
  <div v-if="isEditPage">
    <div
      v-for="section in resource.sections"
      :key="`section-${section}`"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          v-b-toggle="`collapse-${section}`"
          header-tag="header"
          class="d-flex align-content-center justify-content-between collapse-header"
          role="tab"
        >
          <div class="d-flex justify-content-start align-items-center ml-2">
            <span class="type-icon mr-1">
              <fa
                v-if="section === 'teachers'"
                :icon="['fas', 'user-graduate']"
              />
              <fa v-if="section === 'pupils'" :icon="['fas', 'user']" />
              <fa v-if="section === 'cover'" :icon="['fas', 'building']" />
              <fa v-if="section === 'group'" :icon="['fas', 'users']" />
              <fa v-if="section === 'reportage'" :icon="['fas', 'images']" />
              <fa v-if="section === 'text'" :icon="['fas', 'file-alt']" />
            </span>
            <span
              :name="section"
              class="ml-2"
              v-text="localizeSections(section)"
            />
          </div>
          <div class="d-flex justify-content-end">
            <IconButton icon="chevron-down" class="collapse-button mr-3" />
          </div>
        </b-card-header>
        <b-collapse
          :id="`collapse-${section}`"
          accordion="falder"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <div
                v-for="(form, index) in folder(section)"
                :key="`accordion-${section}-${index}-${form.type}`"
                class="accordion"
                role="tablist"
              >
                <b-card no-body class="mb-1">
                  <b-card-header
                    v-b-toggle="`collapse-${index}-${form.type}`"
                    header-tag="header"
                    class="d-flex align-content-center justify-content-between collapse-header"
                    role="tab"
                    @click="fetchPhotos(form.ID)"
                  >
                    <div
                      class="d-flex justify-content-start align-items-center ml-2"
                    >
                      <span :name="index" class="ml-2">
                        {{ form.surname }} {{ form.name }} {{ form.middleName }}
                      </span>
                      <span
                        v-if="section !== 'text'"
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
                      <div v-if="form.willBuy === 'accepted'" class="ml-3">
                        <fa :icon="['fas', 'money-bill']" class="icon-money" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <IconButton
                        icon="chevron-down"
                        class="collapse-button mr-3"
                      />
                    </div>
                  </b-card-header>
                  <b-collapse
                    :id="`collapse-${index}-${form.type}`"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-card-text>
                        <b-row
                          v-if="section === 'pupils' || section === 'teachers'"
                        >
                          <b-col xl="4" lg="4" md="12" sm="12" class="mt-1">
                            <div>
                              <b-form-input
                                v-model="form.surname"
                                :disabled="
                                  resource.status !== 'photoDateApproved' &&
                                  resource.status !== 'onTheFormation' &&
                                  form.changesAgree !== 'accepted'
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
                                  resource.status !== 'photoDateApproved' &&
                                  resource.status !== 'onTheFormation' &&
                                  form.changesAgree !== 'accepted'
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
                                  resource.status !== 'photoDateApproved' &&
                                  resource.status !== 'onTheFormation' &&
                                  form.changesAgree !== 'accepted'
                                "
                                required
                                type="text"
                                :name="`middlename-${index}`"
                                placeholder="Отчество"
                              />
                            </div>
                          </b-col>
                        </b-row>

                        <div v-if="section === 'teachers'" class="mt-3">
                          <div>
                            <b-form-input
                              v-model="form.role"
                              :disabled="
                                resource.status !== 'photoDateApproved' &&
                                resource.status !== 'onTheFormation' &&
                                form.changesAgree !== 'accepted'
                              "
                              required
                              type="text"
                              :name="`role-${index}`"
                              placeholder="Должность"
                            />
                          </div>
                        </div>

                        <div
                          v-if="
                            photos.length &&
                            $isAllowed('viewForEmployerAndAdmins')
                          "
                          class="mt-3"
                        >
                          <div class="gallery">
                            <div
                              v-for="image in photos"
                              :key="image.id"
                              class="gallery-panel"
                            >
                              <div class="photo">
                                <b-img class="image" :src="image.url" />
                                <span v-text="image.name" />
                                <div class="download-btn-container">
                                  <IconButton
                                    icon="download"
                                    class="download-btn"
                                    :href="image.url"
                                    download
                                  />
                                </div>
                                <div class="delete-btn-container">
                                  <IconButton
                                    icon="trash"
                                    class="delete-btn"
                                    @click.native="
                                      deleteLoadedPhoto(
                                        section,
                                        index,
                                        image.ID,
                                        image.nameS3
                                      )
                                    "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="photos.length && $isAllowed('viewForUser')"
                          class="mt-3"
                        >
                          <div class="gallery-for-user">
                            <div
                              v-for="image in photos"
                              :key="image.id"
                              class="gallery-panel-for-user"
                            >
                              <b-img class="image locked" :src="image.url" />
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="resource.status === 'onTheClientApprove'"
                          v-show="$isAllowed('viewForUser')"
                          class="mt-3"
                        >
                          <b-form-checkbox
                            v-model="form.changesAgree"
                            :name="`checkbox-${index}`"
                            value="accepted"
                            unchecked-value="not_accepted"
                          >
                            Я хочу внести изменения и согласен с условиями
                            договора
                          </b-form-checkbox>
                        </div>

                        <div v-if="form.tz">
                          <a :href="form.tz">
                            <fa :icon="['fas', 'file-pdf']" />
                            <span> Текстовый файл </span>
                          </a>
                        </div>

                        <div
                          v-show="
                            $isAllowed('viewForUser') && section === 'pupils'
                          "
                          class="mt-3"
                        >
                          <b-form-checkbox
                            v-if="resource.status === 'photoDateApproved'"
                            v-model="form.willBuy"
                            :name="`checkbox-${index}`"
                            value="accepted"
                            unchecked-value="not_accepted"
                          >
                            Этот альбом будет куплен
                          </b-form-checkbox>
                        </div>

                        <div
                          v-if="
                            ($isAllowed('viewForUser') &&
                              resource.status === 'onTheFormation' &&
                              section !== 'text') ||
                            (form.changesAgree === 'accepted' &&
                              section !== 'text') ||
                            ($isAllowed('viewForEmployerAndAdmins') &&
                              section !== 'text')
                          "
                          class="mt-5"
                        >
                          <h6>Загрузите фотографии</h6>
                          <VueFileAgent
                            :ref="section"
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
                            @beforedelete="deletePhoto($event, section, index)"
                          />
                        </div>

                        <div v-if="section === 'text' && !form.tz" class="mt-5">
                          <h6>Загрузите текстовый файл</h6>
                          <VueFileAgent
                            ref="text"
                            :multiple="true"
                            :deletable="true"
                            :meta="true"
                            :average-color="false"
                            :help-text="'Выберите или перетащите текстовый файл'"
                            :error-text="{
                              type: 'Неправильный тип файла',
                              size: 'Недопустимый размер файла',
                            }"
                            :accept="'.pdf, .doc'"
                            :max-size="'10MB'"
                            :max-files="1"
                            :name="`photos-${index}`"
                            @select="saveTz(index)"
                            @beforedelete="deletePhoto($event, section, index)"
                          />
                        </div>

                        <div class="mt-3">
                          <b-form-textarea
                            v-model="form.description"
                            placeholder="Поле для заметок.."
                            rows="3"
                            max-rows="8"
                          />
                        </div>

                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <div class="d-flex justify-content-start mt-4">
                            <IconButton
                              v-b-toggle="`collapse-${index}-${form.type}`"
                              icon="save"
                              @click.native="
                                savePerson(section, index, form.ID)
                              "
                            />
                          </div>
                          <div class="d-flex justify-content-end mt-4">
                            <IconButton
                              icon="trash"
                              class="remove-person-btn"
                              @click.native="
                                removePerson(section, index, form.ID)
                              "
                            />
                          </div>
                        </div>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
              <div
                v-if="
                  ($isAllowed('viewForUserAndPhotographer') &&
                    resource.status === 'photoDateApproved' &&
                    text.length <= 0) ||
                  ($isAllowed('viewForUserAndPhotographer') &&
                    resource.status === 'photoDateChecked' &&
                    text.length <= 0)
                "
                class="d-flex justify-content-center mt-3"
              >
                <IconButton icon="plus" @click.native="addCard(section)" />
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>

  <div v-else>
    <div
      v-for="section in resource.sections"
      :key="`section-${section}`"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          v-b-toggle="`collapse-${section}`"
          header-tag="header"
          class="d-flex align-content-center justify-content-between collapse-header"
          role="tab"
        >
          <div class="d-flex justify-content-start align-items-center ml-2">
            <span class="type-icon mr-1">
              <fa
                v-if="section === 'teachers'"
                :icon="['fas', 'user-graduate']"
              />
              <fa v-if="section === 'pupils'" :icon="['fas', 'user']" />
              <fa v-if="section === 'cover'" :icon="['fas', 'building']" />
              <fa v-if="section === 'group'" :icon="['fas', 'users']" />
              <fa v-if="section === 'reportage'" :icon="['fas', 'images']" />
              <fa v-if="section === 'text'" :icon="['fas', 'file-alt']" />
            </span>
            <span
              :name="section"
              class="ml-2"
              v-text="localizeSections(section)"
            />
          </div>
          <div class="d-flex justify-content-end">
            <IconButton icon="chevron-down" class="collapse-button mr-3" />
          </div>
        </b-card-header>
        <b-collapse
          :id="`collapse-${section}`"
          accordion="falder"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <div
                v-for="(form, index) in folder(section)"
                :key="`accordion-${section}-${index}-${form.type}`"
                class="accordion"
                role="tablist"
              >
                <b-card no-body class="mb-1">
                  <b-card-header
                    v-b-toggle="`collapse-${index}-${form.type}`"
                    header-tag="header"
                    class="d-flex align-content-center justify-content-between collapse-header"
                    role="tab"
                    @click="fetchPhotos(form.ID)"
                  >
                    <div
                      class="d-flex justify-content-start align-items-center ml-2"
                    >
                      <span :name="index" class="ml-2">
                        {{ form.surname }} {{ form.name }} {{ form.middleName }}
                      </span>
                      <span
                        v-if="section !== 'text'"
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
                      <div v-if="form.willBuy === 'accepted'" class="ml-3">
                        <fa :icon="['fas', 'money-bill']" class="icon-money" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <IconButton
                        icon="chevron-down"
                        class="collapse-button mr-3"
                      />
                    </div>
                  </b-card-header>
                  <b-collapse
                    :id="`collapse-${index}-${form.type}`"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-card-text>
                        <div
                          v-if="
                            photos.length &&
                            $isAllowed('viewForEmployerAndAdmins')
                          "
                          class="mt-3"
                        >
                          <div class="gallery">
                            <div
                              v-for="image in photos"
                              :key="image.id"
                              class="gallery-panel"
                            >
                              <div class="photo">
                                <b-img class="image" :src="image.url" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="form.tz">
                          <a :href="form.tz">
                            <fa :icon="['fas', 'file-pdf']" />
                            <span> Текстовый файл </span>
                          </a>
                        </div>

                        <div
                          v-if="photos.length && $isAllowed('viewForUser')"
                          class="mt-3"
                        >
                          <div class="gallery-for-user">
                            <div
                              v-for="image in photos"
                              :key="image.id"
                              class="gallery-panel-for-user"
                            >
                              <b-img class="image locked" :src="image.url" />
                            </div>
                          </div>
                        </div>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
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
import IconButton from '~/components/Button/IconButton'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import LocalizeMixin from '~/mixins/localize-mixin'

export default {
  components: { IconButton },

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

  data() {
    return {
      defaultFormModels: {
        name: '',
        surname: '',
        orderId: '',
        middleName: '',
        role: '',
        type: '',
        willBuy: 'not_accepted',
        description: '',
        photosCount: null,
        changesAgree: 'not_accepted',
      },

      pupils: [],
      teachers: [],
      cover: [],
      group: [],
      reportage: [],
      text: [],

      error: null,
    }
  },

  computed: {
    ...mapGetters({
      photos: 'photo/items',
      personsV: 'person/items',
      newPersonId: 'person/personId',
    }),

    personsComputed() {
      return this.personsV
    },

    userRole() {
      return this.$auth.user.role
    },
  },

  watch: {
    personsComputed() {
      const personsArray = JSON.parse(JSON.stringify(this.personsComputed))
      personsArray.forEach((p) => {
        if (p.type === 'pupils') {
          if (!this.pupils.includes(p)) {
            this.pupils.push(p)
          }
        }
        if (p.type === 'teachers') {
          if (!this.teachers.includes(p)) {
            this.teachers.push(p)
          }
        }
        if (p.type === 'cover') {
          if (!this.cover.includes(p)) {
            this.cover.push(p)
          }
        }
        if (p.type === 'group') {
          if (!this.group.includes(p)) {
            this.group.push(p)
          }
        }
        if (p.type === 'reportage') {
          if (!this.reportage.includes(p)) {
            this.reportage.push(p)
          }
        }
        if (p.type === 'text') {
          if (!this.text.includes(p)) {
            this.text.push(p)
          }
        }
      })
    },
  },

  methods: {
    ...mapActions({
      create: 'person/CREATE',
      update: 'person/UPDATE',
      delete: 'person/DELETE',
      uploadPhoto: 'photo/CREATE',
      removePhoto: 'photo/DELETE',
      removeOnS3: 'photo/DELETE_ON_S3',
      clearPhotos: 'photo/CLEAR',
      createFile: 'file/CREATE',
      clearFiles: 'file/CLEAR',
    }),

    folder(name) {
      switch (name) {
        case 'pupils':
          return this.pupils
        case 'teachers':
          return this.teachers
        case 'cover':
          return this.cover
        case 'group':
          return this.group
        case 'reportage':
          return this.reportage
        case 'text':
          return this.text
      }
    },

    addCard(name) {
      this.clearPhotos()
      const newForm = this.defaultFormModels
      newForm.type = name

      if (name === 'cover') {
        newForm.name = 'Фото учебного заведения'
      } else if (name === 'group') {
        newForm.name = 'Общегрупповая фотография'
      } else if (name === 'reportage') {
        newForm.name = 'Репортаж'
      } else if (name === 'text') {
        newForm.name = 'Текстовая информация'
      } else {
        newForm.name = ''
      }

      this.folder(name).push(Object.assign({}, newForm))
    },

    async fetchPhotos(id) {
      this.clearPhotos()
      if (id) {
        await this.$store.dispatch('photo/GET_ALL_BY_PERSON_ID', id)
      }
    },

    deletePhoto(fileRecord, name, index) {
      if (this.$refs.text[index]) {
        this.$refs.text[index].deleteFileRecord(fileRecord)
      }
      if (this.$refs[name][index]) {
        this.$refs[name][index].deleteFileRecord(fileRecord)
      }
    },

    async savePhotos(name, index, id) {
      const fileRecs = this.$refs[name][index].fileRecords
      if (confirm('Сохранить изменения?')) {
        this.clearPhotos()
        for (const file of fileRecs) {
          try {
            this.error = null
            const newFile = {
              file: file.file,
              personId: id,
              orderId: this.$route.params.id,
            }
            await this.uploadPhoto(Object.assign({}, newFile))
          } catch (e) {
            this.error = e.response.data
          } finally {
            if (this.error == null) {
              this.$notification.success(
                `${file.file.name} сохранено на сервере`,
                {
                  timer: 2,
                  position: 'topRight',
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
                  position: 'topRight',
                }
              )
            }
          }
        }
      }
    },

    async savePerson(name, index, id) {
      try {
        this.error = null
        const section = this.folder(name)
        const newPerson = section[index]
        newPerson.orderId = this.resource.ID

        if (name === 'text') {
          newPerson.tz = this.$store.state.file.file
        }

        if (id) {
          const fileRecs = this.$refs[name][index].fileRecords
          if (fileRecs) {
            await this.savePhotos(name, index, id)
            newPerson.photosCount = fileRecs.length + newPerson.photosCount
            this.$refs[name][index].fileRecords = []
          }
          await this.update(Object.assign({}, newPerson))
        } else {
          await this.create(Object.assign({}, newPerson))
        }
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearPhotos()
        if (this.error == null) {
          this.$notification.success('Данные сохранены', {
            timer: 3,
            position: 'topRight',
          })
        } else {
          this.$notification.error('Не удалось сохранить данные', {
            timer: 3,
            position: 'topRight',
          })
        }
      }
    },

    async deleteAllPersonPhotos(id) {
      const arr = this.photos.filter((p) => p.personId === id)
      for (const i of arr) {
        await this.removePhoto(i.ID)
        await this.removeOnS3(i.nameS3)
      }
    },

    async removePerson(name, index, id) {
      if (id) {
        if (confirm('Подтверждаете удаление?')) {
          try {
            this.error = null
            await this.deleteAllPersonPhotos(id)
            this.delete(id)
          } catch (e) {
            this.error = e.response
          } finally {
            this.folder(name).splice(index, 1)
            this.clearPhotos()
            if (this.error == null) {
              this.$notification.success('Данные удалены', {
                timer: 3,
                position: 'topRight',
              })
            } else {
              this.$notification.error('Не удалось удалить данные', {
                timer: 3,
                position: 'topRight',
              })
            }
          }
        }
      } else {
        this.folder(name).splice(index, 1)
      }
    },

    async deleteLoadedPhoto(name, index, id, nameS3) {
      if (confirm('Подтверждаете удаление?')) {
        const i = this.photos.findIndex((p) => p.ID === id)
        if (i > -1) {
          this.photos.splice(i, 1)
        }
        const section = this.folder(name)
        const newPerson = section[index]
        newPerson.photosCount = newPerson.photosCount - 1
        await this.update(Object.assign({}, newPerson))
        try {
          this.error = null
          await this.removePhoto(id)
          await this.removeOnS3(nameS3)
        } catch (e) {
          this.error = e.response.data
        } finally {
          if (this.error == null) {
            this.$notification.success('Фотография удалена', {
              timer: 2,
              position: 'topRight',
            })
          } else {
            this.$notification.error('Не удалось удалить фото', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },

    saveTz(index) {
      try {
        this.error = null
        const file = this.$refs.text[index].fileRecords[0].file
        this.createFile(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearFiles()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.text[index].fileRecords[0].file.name} сохранен на сервере`,
            {
              timer: 2,
              position: 'topRight',
            }
          )
        } else {
          this.$notification.error('Не удалось сохранить макет', {
            timer: 3,
            position: 'topRight',
          })
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

.card-header {
  border-bottom: none;
}

.card {
  border: none;
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
}

.gallery-panel .image {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}

.gallery-for-user {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  grid-gap: 1rem;
  max-width: 40rem;
  margin: 5rem auto;
}

.gallery-panel-for-user .image {
  width: 100%;
  height: 11vw;
  object-fit: cover;
  border-radius: 0.75rem;
}

.icon-money {
  color: $success-color;
}

.locked {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  pointer-events: none;
}
</style>
