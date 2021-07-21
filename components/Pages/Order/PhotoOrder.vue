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
                      <span
                        v-if="form.name || form.surname"
                        :name="index"
                        class="ml-2"
                      >
                        {{ form.surname }} {{ form.name }} {{ form.middleName }}
                      </span>
                      <span
                        v-else-if="
                          section === 'pupils' || section === 'teachers'
                        "
                        :name="index"
                        class="ml-2 red"
                      >
                        Раскройте и заполните!
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
                                <span v-text="image.name" />
                                <div class="download-btn-container">
                                  <IconButton
                                    icon="download"
                                    class="download-btn"
                                    :href="image.url"
                                    download
                                  />
                                </div>
                                <div
                                  v-b-toggle="`collapse-${index}-${form.type}`"
                                  class="delete-btn-container"
                                >
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
                            :help-text="'Выберите или перетащите фотографии.  Максимальный размер файла - 25мб.'"
                            :error-text="{
                              type: 'Неправильный тип файла',
                              size: 'Недопустимый размер файла',
                            }"
                            :accept="'image/*'"
                            :max-size="'25MB'"
                            :max-files="10"
                            :name="`photos-${index}`"
                            @beforedelete="deletePhoto($event, section, index)"
                          />
                        </div>

                        <div class="mt-3 d-flex justify-content-center">
                          <PrimaryButton
                            v-b-toggle="`collapse-${index}-${form.type}`"
                            label="Сохранить"
                            @click.native="
                              updatePerson(section, index, form.ID)
                            "
                          />
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
import PrimaryButton from '~/components/Button/PrimaryButton'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import LocalizeMixin from '~/mixins/localize-mixin'

export default {
  components: { IconButton, PrimaryButton },

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
      pupils: [],
      teachers: [],
      cover: [],
      group: [],
      reportage: [],

      error: null,
    }
  },

  computed: {
    ...mapGetters({
      photos: 'photo/items',
      personsV: 'person/items',
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
      })
    },
  },

  methods: {
    ...mapActions({
      update: 'person/UPDATE',
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
      }
    },

    async fetchPhotos(id) {
      this.clearPhotos()
      if (id) {
        await this.$store.dispatch('photo/GET_ALL_BY_PERSON_ID', id)
      }
    },

    deletePhoto(fileRecord, name, index) {
      if (this.$refs[name][index]) {
        this.$refs[name][index].deleteFileRecord(fileRecord)
      }
    },

    async savePhotos(name, i, id, fileName) {
      const fileRecs = this.$refs[name][i].fileRecords
      this.clearPhotos()
      for (const [index, file] of fileRecs.entries()) {
        try {
          this.error = null
          const newFile = {
            file: file.file,
            personId: id,
            orderId: this.$route.params.id,
            fileName: `${this.localizeSections(name)}_${fileName || ''}_${
              index + 1
            }`,
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
          } else {
            this.$notification.error('Не удалось сохранить фото', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },

    async updatePerson(name, index, id) {
      try {
        this.error = null
        const section = this.folder(name)
        const newPerson = section[index]
        newPerson.orderId = this.resource.ID

        if (id) {
          const fileRecs = this.$refs[name][index].fileRecords
          if (fileRecs) {
            await this.savePhotos(
              name,
              index,
              id,
              newPerson.surname + '_' + newPerson.name
            )
            newPerson.photosCount = fileRecs.length + newPerson.photosCount
            await this.update(Object.assign({}, newPerson))
            this.$refs[name][index].fileRecords = []
          }
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
