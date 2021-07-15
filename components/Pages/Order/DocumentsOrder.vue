<template>
  <div v-if="isEditPage && $isAllowed('viewForAdmin')">
    <b-list-group>
      <b-list-group-item>
        <label for="contract">Загрузите копию договора</label>
        <VueFileAgent
          ref="contract"
          :deletable="true"
          :meta="true"
          :theme="'list'"
          :average-color="false"
          :help-text="'Выберите или перетащите договор'"
          :error-text="{
            type: 'Неправильный тип файла',
            size: 'Недопустимый размер файла',
          }"
          :accept="'.pdf, .doc, .jpg, .jpeg'"
          :max-size="'10MB'"
          :max-files="1"
          @select="saveContract"
          @beforedelete="deleteContract($event)"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="attContract">Загрузите приложение к договору</label>
        <VueFileAgent
          ref="attContract"
          :deletable="true"
          :meta="true"
          :theme="'list'"
          :average-color="false"
          :help-text="'Выберите или перетащите приложение'"
          :error-text="{
            type: 'Неправильный тип файла',
            size: 'Недопустимый размер файла',
          }"
          :accept="'.pdf, .doc, .jpg, .jpeg'"
          :max-size="'10MB'"
          :max-files="1"
          @select="saveAttachmentContract"
          @beforedelete="deleteAttachmentContract($event)"
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Договор: </b>
        <a
          v-if="resource.contract !== ''"
          class="contract ml-1"
          :href="resource.contract"
        >
          <fa :icon="['fas', 'file-pdf']" />
          <span> Договор </span>
        </a>
        <span v-else class="red"> нет договора </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Приложение к договору: </b>
        <a
          v-if="resource.attachmentContract !== ''"
          class="contract ml-1"
          :href="resource.attachmentContract"
        >
          <fa :icon="['fas', 'file-pdf']" />
          <span> Приложение </span>
        </a>
        <span v-else class="red"> нет приложения </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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

  methods: {
    ...mapActions({
      createContract: 'contract/CREATE',
      clearContract: 'contract/CLEAR',
      createAttachContract: 'attachContract/CREATE',
      clearAttachContract: 'attachContract/CLEAR',
    }),

    deleteContract(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.contract.deleteFileRecord(fileRecord)
      }
    },

    deleteAttachmentContract(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.attContract.deleteFileRecord(fileRecord)
      }
    },

    saveAttachmentContract() {
      try {
        this.error = null
        const file = this.$refs.attContract._data.fileRecords[0].file
        this.createAttachContract(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearAttachContract()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.attContract._data.fileRecords[0].file.name} сохранен на сервере`,
            {
              timer: 2,
              position: 'topRight',
            }
          )
        } else {
          this.$notification.error('Не удалось сохранить договор', {
            timer: 3,
            position: 'topRight',
          })
        }
      }
    },

    saveContract() {
      try {
        this.error = null
        const file = this.$refs.contract._data.fileRecords[0].file
        this.createContract(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearContract()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.contract._data.fileRecords[0].file.name} сохранен на сервере`,
            {
              timer: 2,
              position: 'topRight',
            }
          )
        } else {
          this.$notification.error('Не удалось сохранить договор', {
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

.contract {
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
