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
        />
      </b-list-group-item>
    </b-list-group>
  </div>

  <div v-else class="mt-3 card-body bg-white">
    <b-list-group>
      <b-list-group-item>
        <b> Адрес: </b>
        <span> {{ resource.address }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Дата: </b>
        <span> {{ date }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Время: </b>
        <span> {{ time }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Статус: </b>
        <span> {{ status }} </span>
      </b-list-group-item>
      <b-list-group-item>
        <b> Договор: </b>
        <a class="contractLink" :href="resource.contract" target="_blank">
          Договор
        </a>
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

  computed: {
    ...mapState('file', {
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
          return 'новый'
        case 'active':
          return 'в работе'
        case 'close':
          return 'закрыт'
        default:
          return ''
      }
    },
  },

  methods: {
    ...mapActions({
      updateContract: 'file/POST_FILES',
      clearFiles: 'file/CLEAR_FILES',
    }),

    async saveContract() {
      try {
        this.error = null
        const file = this.$refs.contract._data.fileRecords[0].file
        await this.updateContract(file)
        this.resource.contract = this.contractFile
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearFiles()

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

.contractLink {
  color: $success-color;
  text-decoration: none;
}
</style>
