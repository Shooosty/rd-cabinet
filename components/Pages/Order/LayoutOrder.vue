<template>
  <div v-if="isEditPage && $isAllowed('viewForAdminAndDesigner')">
    <b-list-group>
      <b-list-group-item>
        <label for="layoutCover">Загрузите обложку макета</label>
        <VueFileAgent
          ref="layoutCover"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :theme="'list'"
          :average-color="false"
          :help-text="'Выберите или перетащите обложку макета. Максимальный размер файла - 20мб'"
          :error-text="{
            type: 'Неправильный тип файла',
            size: 'Недопустимый размер файла',
          }"
          :accept="'.pdf, .doc'"
          :max-size="'25MB'"
          :max-files="1"
          @select="saveLayoutCover"
          @beforedelete="deleteLayoutCover($event)"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="layout">Загрузите макет</label>
        <VueFileAgent
          ref="layout"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :theme="'list'"
          :average-color="false"
          :help-text="'Выберите или перетащите макет. Максимальный размер файла - 20мб.'"
          :error-text="{
            type: 'Неправильный тип файла',
            size: 'Недопустимый размер файла',
          }"
          :accept="'.pdf, .doc'"
          :max-size="'25MB'"
          :max-files="1"
          @select="saveLayout"
          @beforedelete="deleteLayout($event)"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="other">Ссылка на яндекс Диск для остальных файлов</label>
        <b-input id="other" v-model="resource.yandexDisc" />
      </b-list-group-item>
      <b-list-group-item>
        <label for="description">Заметка от Дизайнера</label>
        <b-form-textarea
          id="description"
          v-model="resource.designerDescription"
          placeholder="Поле для заметок дизайнера.."
          rows="3"
          max-rows="8"
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Обложка макета: </b>
        <a
          v-if="resource.layoutCover !== ''"
          class="layout ml-1"
          :href="resource.layoutCover"
        >
          <fa :icon="['fas', 'file-pdf']" />
          <span> Обложка макета </span>
        </a>
        <span v-else class="yellow"> формируется </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Макет: </b>
        <a
          v-if="resource.layout !== ''"
          class="layout ml-1"
          :href="resource.layout"
        >
          <fa :icon="['fas', 'file-pdf']" />
          <span> Макет </span>
        </a>
        <span v-else class="yellow"> формируется </span>
      </b-list-group-item>
      <b-list-group-item v-if="resource.yandexDisc">
        <b> Ссылка на яндекс Диск (остальные файлы): </b>
        <a target="_blank" :href="resource.yandexDisc">ссылка на файлы</a>
      </b-list-group-item>
      <b-list-group-item v-if="resource.layoutFormDate">
        <b> Дата формирования макета: </b>
        <span v-text="dateTimeFormatted(resource.layoutFormDate)" />
      </b-list-group-item>
      <b-list-group-item v-if="resource.designerDescription">
        <b>Заметка от дизайнера:</b>
        <span v-text="resource.designerDescription" />
      </b-list-group-item>
      <b-list-group-item
        v-if="
          ($isAllowed('viewForEmployerAndAdmins') && photos.length) ||
          ($isAllowed('viewForUser') &&
            photos.length &&
            resource.status === 'onProduction')
        "
      >
        <a href="#" @click="generateZip(resource.number)">Скачать архив фото</a>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
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
    await this.fetchPhotos()
  },

  computed: {
    ...mapGetters({
      photos: 'photo/items',
    }),
  },

  methods: {
    ...mapActions({
      createLayout: 'layout/CREATE',
      clearLayout: 'layout/CLEAR',
      createLayoutCover: 'layoutCover/CREATE',
      clearLayoutCover: 'layoutCover/CLEAR',
    }),

    urlToPromise(url) {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    },

    generateZip(name) {
      const zip = new JSZip()

      this.photos.forEach((p) => {
        zip.file(p.nameS3, this.urlToPromise(p.url), { binary: true })
      })

      if (this.resource) {
        zip.generateAsync({ type: 'blob' }).then(function callback(blob) {
          saveAs(blob, `${name}.zip`)
        })
      }
    },

    dateTimeFormatted(dateTime) {
      return this.$dayjs(dateTime).format('DD.MM.YYYY HH:mm')
    },

    deleteLayout(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.layout.deleteFileRecord(fileRecord)
      }
    },

    deleteLayoutCover(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.layoutCover.deleteFileRecord(fileRecord)
      }
    },

    async fetchPhotos() {
      await this.$store.dispatch(
        'photo/GET_ALL_BY_ORDER_ID',
        this.$route.params.id
      )
    },

    saveLayoutCover() {
      try {
        this.error = null
        const file = this.$refs.layoutCover._data.fileRecords[0].file
        this.createLayout(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearLayout()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.layoutCover._data.fileRecords[0].file.name} сохранен на сервере`,
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

    saveLayout() {
      try {
        this.error = null
        const file = this.$refs.layout._data.fileRecords[0].file
        this.createLayoutCover(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.resource.layoutFormDate = this.$dayjs(new Date()).format(
          'YYYY-MM-DDTHH:mm'
        )
        this.clearLayoutCover()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.layout._data.fileRecords[0].file.name} сохранен на сервере`,
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

.layout {
  padding: 0.2rem;
  color: $secondary-color;
  font-size: $font-size-xs;
  font-weight: $font-weight-light;
  text-decoration: none;
  border: 2px solid $success-color;
  border-radius: 3px;
}

.red {
  color: $danger-color;
}

.yellow {
  color: $warning-color;
}
</style>
