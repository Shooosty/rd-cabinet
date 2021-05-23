<template>
  <div v-if="isEditPage && $isAllowed('viewForEmployerAndAdmins')">
    <b-list-group>
      <b-list-group-item>
        <label for="address">Адрес фотосъемки</label>
        <b-form-input
          id="address"
          v-model="resource.address"
          placeholder="Введите адрес"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="datetime">Дата и время фотосъемки</label>
        <date-picker
          id="datetime"
          v-model="resource.datetime"
          type="datetime"
          value-type="format"
          :open.sync="open"
          format="YYYY-MM-DDTHH:mm"
          placeholder="Выберите дату и время"
          @change="dateTimeChange"
        />
      </b-list-group-item>
      <b-list-group-item>
        <label for="contract">Загрузите копию договора</label>
        <VueFileAgent
          ref="contract"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :theme="'list'"
          :average-color="false"
          :help-text="'Выберите или перетащите договор'"
          :error-text="{
            type: 'Неправильный тип файла',
            size: 'Недопустимый размер файла',
          }"
          :accept="'.pdf, .doc'"
          :max-size="'10MB'"
          :max-files="1"
          @select="saveContract"
          @beforedelete="deleteContract($event)"
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Адрес: </b>
        <span class="ml-1"> {{ resource.address }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дата: </b>
        <span class="ml-1"> {{ date }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Время: </b>
        <span class="ml-1"> {{ time }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Статус: </b>
        <span class="ml-1"> {{ status }} </span>
      </b-list-group-item>
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
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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

  data() {
    return {
      open: false,
    }
  },

  computed: {
    ...mapState('contract', {
      contractFile: (state) => state.items[0].url,
    }),

    date() {
      return this.$dayjs(this.resource?.datetime).format('DD.MM.YYYY')
    },

    time() {
      return this.$dayjs(this.resource?.datetime).format('HH:mm')
    },

    status() {
      switch (this.resource?.status) {
        case 'new':
          return 'Новый'
        case 'active':
          return 'В работе'
        case 'closed':
          return 'Закрыт'
        case 'inDesign':
          return 'У дизайнера'
        case 'inPrint':
          return 'В печати'
        default:
          return ''
      }
    },
  },

  methods: {
    ...mapActions({
      uploadContract: 'contract/CREATE',
      clearContract: 'contract/CLEAR',
    }),

    dateTimeChange(value, type) {
      if (type === 'minute') {
        this.open = false
      }
    },

    deleteContract(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.contract.deleteFileRecord(fileRecord)
      }
    },

    async saveContract() {
      try {
        this.error = null
        const file = this.$refs.contract._data.fileRecords[0].file
        await this.uploadContract(file)
        this.resource.contract = this.contractFile
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearContract()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.contract._data.fileRecords[0].file.name} сохранен на сервере`,
            {
              timer: 2,
              position: 'bottomCenter',
            }
          )
        } else {
          this.$notification.error('Не удалось сохранить договор', {
            timer: 3,
            position: 'bottomCenter',
          })
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.mx-datepicker {
  width: 100%;
  .mx-input {
    height: 38px;
  }
}

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
</style>
