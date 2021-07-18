<template>
  <div v-if="isEditPage">
    <div
      v-for="section in defaultSections"
      :key="`section-${section}`"
      class="accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header
          v-b-toggle="`models-collapse-${section}`"
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
          :id="`models-collapse-${section}`"
          accordion="folder"
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
                    v-b-toggle="`models-collapse-${index}-${form.type}`"
                    header-tag="header"
                    class="d-flex align-content-center justify-content-between collapse-header"
                    role="tab"
                  >
                    <div
                      class="d-flex justify-content-start align-items-center ml-2"
                    >
                      <span v-if="form.name" :name="index" class="ml-2">
                        {{ form.surname }} {{ form.name }} {{ form.middleName }}
                      </span>
                      <span v-else :name="index" class="ml-2 red">
                        Раскройте и заполните!
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
                    :id="`models-collapse-${index}-${form.type}`"
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
                                  resource.status !== 'photoDateApproved' &&
                                  resource.status !== 'onTheFormation' &&
                                  form.changesAgree !== 'accepted' &&
                                  userRole === 'user'
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
                                  form.changesAgree !== 'accepted' &&
                                  userRole === 'user'
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
                                  form.changesAgree !== 'accepted' &&
                                  userRole === 'user'
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
                                form.changesAgree !== 'accepted' &&
                                userRole === 'user'
                              "
                              required
                              type="text"
                              :name="`role-${index}`"
                              placeholder="Должность"
                            />
                          </div>
                        </div>

                        <div
                          v-show="
                            ($isAllowed('viewForUser') &&
                              section === 'pupils' &&
                              resource.status === 'photoDateApproved') ||
                            ($isAllowed('viewForUser') &&
                              section === 'pupils' &&
                              resource.status === 'onTheFormation') ||
                            ($isAllowed('viewForAdmin') && section === 'pupils')
                          "
                          class="mt-3"
                        >
                          <b-form-checkbox
                            v-model="form.willBuy"
                            :name="`checkbox-${index}`"
                            value="accepted"
                            unchecked-value="not_accepted"
                          >
                            Этот альбом будет куплен
                          </b-form-checkbox>
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
                  ($isAllowed('viewForPhotographer') &&
                    resource.status === 'photoDateApproved') ||
                  ($isAllowed('viewForPhotographer') &&
                    resource.status === 'photoDateChecked') ||
                  $isAllowed('viewForAdmin') ||
                  ($isAllowed('viewForUser') &&
                    resource.status === 'photoDateApproved' &&
                    section === 'pupils') ||
                  ($isAllowed('viewForUser') &&
                    resource.status === 'photoDateChecked' &&
                    section === 'pupils') ||
                  ($isAllowed('viewForUser') &&
                    resource.status === 'photoDateApproved' &&
                    section === 'teachers') ||
                  ($isAllowed('viewForUser') &&
                    resource.status === 'photoDateChecked' &&
                    section === 'teachers')
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
    <div class="mt-5">
      <h6>Загрузите текстовые файлы</h6>
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
        :accept="'.pdf, .doc, .txt'"
        :max-size="'10MB'"
        :max-files="10"
        name="text"
        @select="saveTz"
        @beforedelete="deleteTz($event)"
      />
    </div>
  </div>

  <div v-else>
    <div
      v-for="section in defaultSections"
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
          accordion="folder"
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
                  >
                    <div
                      class="d-flex justify-content-start align-items-center ml-2"
                    >
                      <span :name="index" class="ml-2">
                        {{ form.surname }} {{ form.name }} {{ form.middleName }}
                      </span>
                      <div v-if="form.willBuy === 'accepted'" class="ml-3">
                        <fa :icon="['fas', 'money-bill']" class="icon-money" />
                      </div>
                    </div>
                  </b-card-header>
                </b-card>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div
      v-for="(doc, index) in resource.tz"
      :key="index"
      class="mt-3 ml-1 d-inline-flex"
    >
      <div class="ml-2">
        <a v-if="doc" class="contract ml-1" :href="doc">
          <fa :icon="['fas', 'file-pdf']" />
          <span> ТЗ № </span> <span v-text="index + 1" />
        </a>
      </div>
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
      defaultSections: ['teachers', 'pupils'],

      pupils: [],
      teachers: [],

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
      })
    },
  },

  methods: {
    ...mapActions({
      create: 'person/CREATE',
      update: 'person/UPDATE',
      removePhoto: 'photo/DELETE',
      removeOnS3: 'photo/DELETE_ON_S3',
      delete: 'person/DELETE',
      createFile: 'file/CREATE',
      clearFiles: 'file/CLEAR',
    }),

    folder(name) {
      switch (name) {
        case 'pupils':
          return this.pupils
        case 'teachers':
          return this.teachers
      }
    },

    addCard(name) {
      const newForm = this.defaultFormModels
      newForm.type = name

      this.folder(name).push(Object.assign({}, newForm))
    },

    deleteTz(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.text.deleteFileRecord(fileRecord)
      }
    },

    async savePerson(name, index, id) {
      if (confirm('Сохранить изменения?')) {
        try {
          this.error = null
          const section = this.folder(name)
          const newPerson = section[index]
          newPerson.orderId = this.resource.ID

          if (id) {
            await this.update(Object.assign({}, newPerson))
          } else {
            await this.create(Object.assign({}, newPerson))
          }
        } catch (e) {
          this.error = e.response
        } finally {
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

    async saveTz() {
      this.error = null
      const file = this.$refs.text.fileRecords[0].file
      try {
        await this.createFile(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearFiles()

        if (this.error == null) {
          this.$notification.success(`${file.name} сохранен на сервере`, {
            timer: 2,
            position: 'topRight',
          })
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

.remove-person-btn {
  &:hover {
    color: $danger-color;
  }
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
