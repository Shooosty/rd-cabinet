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
          :help-text="'Выберите или перетащите обложку макета. Максимальный размер файла - 25мб'"
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
          :help-text="'Выберите или перетащите макет. Максимальный размер файла - 25мб.'"
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
        <b-input
          id="other"
          v-model="resource.yandexDisc"
          placeholder="https://www.site.ru"
        />
      </b-list-group-item>
      <b-list-group-item v-if="resource.designerDescription.length">
        <b>Заметки от дизайнера:</b>
        <div
          v-for="(item, index) in resource.designerDescription"
          :key="index"
          class="mt-3"
        >
          <span> &bull; </span>
          <span v-text="item" />
        </div>
      </b-list-group-item>
      <b-list-group-item v-if="resource.layoutClientDescription.length">
        <b>Правки от клиента:</b>
        <div
          v-for="(item, index) in resource.layoutClientDescription"
          :key="index"
          class="mt-3"
        >
          <span> &bull; </span>
          <span v-text="item" />
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <label for="description">Заметка от Дизайнера</label>
        <b>Добавить заметку</b>
        <b-form-textarea
          v-model="designerText"
          placeholder="Поле для заметок дизайнеру.."
          rows="3"
          class="mt-3"
          max-rows="8"
        />
        <PrimaryButton
          class="mt-2"
          label="Сохранить заметку"
          @click.native="orderUpdate"
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
        <!--        <span v-else class="yellow"> формируется </span>-->
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
        <!--        <span v-else class="yellow"> формируется </span>-->
      </b-list-group-item>
      <b-list-group-item v-if="resource.yandexDisc">
        <b> Ссылка на яндекс Диск (остальные файлы): </b>
        <a target="_blank" :href="resource.yandexDisc">ссылка на файлы</a>
      </b-list-group-item>
      <b-list-group-item v-if="resource.layoutFormDate">
        <b> Дата формирования макета: </b>
        <span v-text="dateTimeFormatted(resource.layoutFormDate)" />
      </b-list-group-item>
      <b-list-group-item v-if="resource.designerDescription.length">
        <b>Заметки от дизайнера:</b>
        <div
          v-for="(item, index) in resource.designerDescription"
          :key="index"
          class="mt-3"
        >
          <span> &bull; </span>
          <span v-text="item" />
        </div>
      </b-list-group-item>
      <b-list-group-item v-if="resource.layoutClientDescription.length">
        <b>Правки от клиента:</b>
        <div
          v-for="(item, index) in resource.layoutClientDescription"
          :key="index"
          class="mt-3"
        >
          <span> &bull; </span>
          <span v-text="item" />
        </div>
      </b-list-group-item>
      <b-list-group-item
        v-if="
          $isAllowed('viewForUser') && resource.status === 'onTheClientApprove'
        "
      >
        <b>Добавить правки</b>
        <b-form-textarea
          v-model="clientText"
          placeholder="Поле для заметок дизайнеру.."
          rows="3"
          class="mt-3"
          max-rows="8"
        />
        <PrimaryButton
          class="mt-2"
          label="Сохранить заметку"
          @click.native="orderUpdate"
        />
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
import PrimaryButton from '~/components/Button/PrimaryButton'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PrimaryButton },
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

  data() {
    return {
      clientText: '',
      designerText: '',
      error: null,
    }
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
      updateOrder: 'order/UPDATE',
      createLayoutCover: 'layoutCover/CREATE',
      clearLayoutCover: 'layoutCover/CLEAR',
    }),

    urlToPromise(url, percent, max) {
      return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url + '?not-from-cache-please', {
          callback(err, data) {
            if (err) {
              reject(err)
            } else {
              window.$nuxt.$root.$loading.progress(percent, max)
              resolve(data)
            }
          },
        })
      })
    },

    async generateZip(name) {
      const zip = new JSZip()

      this.photos.forEach(async (p, index) => {
        const max = this.photos.length
        await zip.file(p.nameS3, this.urlToPromise(p.url, index, max), {
          binary: true,
        })
      })

      if (this.resource) {
        zip.generateAsync({ type: 'blob' }).then(function callback(blob) {
          saveAs(blob, `${name}.zip`)
          window.$nuxt.$root.$loading.finish()
        })
      }
    },

    async orderUpdate() {
      const updatedOrder = this.resource
      const today = this.$dayjs(new Date()).format('YYYY-MM-DD, HH:mm')
      if (updatedOrder.layoutClientDescription.length && this.clientText) {
        updatedOrder.layoutClientDescription.push(
          `${this.clientText} - ${today}`
        )
      } else if (this.clientText) {
        updatedOrder.layoutClientDescription = []
        updatedOrder.layoutClientDescription.push(
          `${this.clientText} - ${today}`
        )
      }

      if (updatedOrder.designerDescription.length && this.designerText) {
        updatedOrder.designerDescription.push(`${this.designerText} - ${today}`)
      } else if (this.designerText) {
        updatedOrder.designerDescription = []
        updatedOrder.designerDescription.push(`${this.designerText} - ${today}`)
      }
      try {
        await this.updateOrder(updatedOrder)
      } catch (e) {
        this.error = e.response
      } finally {
        if (this.error == null) {
          this.$notification.success('Заметка добавлена', {
            timer: 3,
            position: 'topRight',
          })
          if (this.$auth.user.role === 'user') {
            this.$router.app.refresh()
          }
        } else {
          this.$notification.error('Не удалось добавить заметку', {
            timer: 3,
            position: 'topRight',
          })
        }
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
        this.createLayoutCover(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearLayoutCover()

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
        this.createLayout(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.resource.layoutFormDate = this.$dayjs(new Date()).format(
          'YYYY-MM-DDTHH:mm'
        )
        this.clearLayout()

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
