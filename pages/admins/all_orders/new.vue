<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <page-header card-title="Все заказы" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div>
        <b-row>
          <b-col xl="12" lg="12" md="12" sm="12" class="p-3">
            <label for="number">Укажите номер договора</label>
            <b-form-input
              id="number"
              v-model="order.number"
              v-model.trim="$v.order.number.$model"
              min="1"
              max="999999999"
              type="number"
              placeholder="Введите номер"
            />
            <div v-if="!$v.order.number.required" class="error">
              Это поле обязательное
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col xl="12" lg="12" md="12" sm="12" class="p-3">
            <label for="contract">Загрузите копию договора</label>
            <VueFileAgent
              ref="contract"
              v-model.trim="$v.order.contract.$model"
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
              :accept="'.pdf, .doc, .jpg, .jpeg'"
              :max-size="'20MB'"
              :max-files="1"
              @select="saveContract"
              @beforedelete="deleteContract($event)"
            />
            <div v-if="!$v.order.contract.required" class="error">
              Это поле обязательное
            </div>
          </b-col>
          <b-col xl="12" lg="12" md="12" sm="12" class="p-3">
            <label for="attContract">Загрузите приложение к договору</label>
            <VueFileAgent
              ref="attContract"
              v-model.trim="$v.order.attachmentContract.$model"
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
              :max-size="'20MB'"
              :max-files="1"
              @select="saveAttachmentContract"
              @beforedelete="deleteAttachmentContract($event)"
            />
            <div v-if="!$v.order.attachmentContract.required" class="error">
              Это поле обязательное
            </div>
          </b-col>
          <b-list-group-item>
            <label for="attContract">Загрузите доп соглашение</label>
            <VueFileAgent
              ref="addContract"
              :deletable="true"
              :meta="true"
              :theme="'list'"
              :average-color="false"
              :help-text="'Выберите или перетащите соглашение'"
              :error-text="{
                type: 'Неправильный тип файла',
                size: 'Недопустимый размер файла',
              }"
              :accept="'.pdf, .doc, .jpg, .jpeg'"
              :max-size="'10MB'"
              :max-files="1"
              @select="saveAdditionalContract"
              @beforedelete="deleteAdditionalContract($event)"
            />
          </b-list-group-item>
        </b-row>

        <b-row>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите клиента</label>
              <multiselect
                v-model="order.userId"
                :custom-label="customLabel"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                :options="clients"
                placeholder="клиент"
              />
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите менеджера</label>
              <multiselect
                v-model="order.managerId"
                v-model.trim="$v.order.managerId.$model"
                :options="managers"
                :custom-label="customLabel"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                placeholder="выберите менеджера"
              />
            </div>
            <div v-if="!$v.order.managerId.required" class="error">
              Это поле обязательное
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите фотографа</label>
              <multiselect
                v-model="order.photographerId"
                :custom-label="customLabel"
                :options="photographers"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                placeholder="фотограф"
              />
            </div>
          </b-col>
        </b-row>

        <div>
          <label>Выберите разделы</label>
          <multiselect
            v-model="order.sections"
            v-model.trim="$v.order.sections.$model"
            :options="sections"
            :multiple="true"
            :close-on-select="false"
            selected-label="выбран"
            deselect-label="убрать"
            select-label="выбрать"
            placeholder="выберите разделы"
            :custom-label="localizeSections"
          />
          <div v-if="!$v.order.sections.required" class="error">
            Это поле обязательное
          </div>
        </div>

        <div class="mt-3">
          <label>Выберите дизайн альбома</label>
          <multiselect
            v-model="order.design"
            v-model.trim="$v.order.design.$model"
            :options="designs"
            selected-label="выбран"
            deselect-label="убрать"
            select-label="выбрать"
            placeholder="выберите дизайн"
            :custom-label="localizeDesigns"
          />
          <div v-if="!$v.order.design.required" class="error">
            Это поле обязательное
          </div>
        </div>

        <b-row>
          <b-col xl="6" lg="6" md="6" sm="12" class="p-3">
            <div>
              <label for="address">Адрес фотосъемки</label>
              <b-form-input
                id="address"
                v-model="order.address"
                v-model.trim="$v.order.address.$model"
                placeholder="Введите адрес"
              />
              <div v-if="!$v.order.address.minLength" class="error mt-1">
                Адрес должен содержать минимум
                {{ $v.order.address.$params.minLength.min }} символов.
              </div>
            </div>
          </b-col>
          <b-col
            v-for="(date, index) in photoDates"
            :key="index"
            xl="6"
            lg="6"
            md="6"
            sm="12"
            class="p-3"
          >
            <label for="datetime"
              >Дата и время фотосъемки {{ index + 1 }}</label
            >
            <div class="d-flex">
              <date-picker
                id="datetime"
                v-model="date.datetime"
                type="datetime"
                :disabled-date="datePickerDisabledRule"
                value-type="format"
                :open.sync="date.open"
                format="YYYY-MM-DDTHH:mm"
                placeholder="Выберите дату и время"
              />
              <IconButton
                class="plus-date-btn ml-2"
                icon="plus"
                @click.native="addDate"
              />
              <IconButton
                v-if="index > 0"
                class="remove-date-btn ml-3"
                icon="trash"
                @click.native="removeDate(index)"
              />
            </div>
          </b-col>
        </b-row>

        <div class="mt-5">
          <span class="mb-1"> Общая заметка к заказу </span>
          <b-form-textarea
            v-model="order.description"
            v-model.trim="$v.order.description.$model"
            placeholder="Поле для заметок.."
            rows="3"
            max-rows="8"
          />
        </div>

        <div class="mt-5">
          <span class="mb-1"> Внутренняя заметка к заказу </span>
          <b-form-textarea
            v-model="order.initialDescription"
            placeholder="Поле для заметок.."
            rows="3"
            max-rows="8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'
import {
  maxLength,
  minLength,
  numeric,
  required,
} from 'vuelidate/lib/validators'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'
import LocalizeMixin from '~/mixins/localize-mixin'
import Model from '~/models/order'
import IconButton from '~/components/Button/IconButton'

export default {
  components: { IconButton, PageHeader, Multiselect },

  perimeters: [ViewPerimeter],

  mixins: [UsersGroupByRoleMixin, LocalizeMixin],

  async fetch() {
    await this.fetchUsers()
  },

  validations: {
    order: {
      address: {
        minLength: minLength(8),
        maxLength: maxLength(64),
      },
      sections: {
        required,
      },
      design: {
        required,
      },
      managerId: {
        required,
      },
      contract: {
        required,
      },
      attachmentContract: {
        required,
      },
      number: {
        required,
        numeric,
      },
      description: {
        maxLength: maxLength(256),
      },
    },
  },

  data() {
    return {
      error: null,
      value: null,

      ...Model,

      defaultFormDates: {
        open: false,
        datetime: '',
      },

      photoDates: [
        {
          open: false,
          datetime: '',
        },
      ],

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

      order: {
        status: 'new',
        number: '',
        design: '',
        sections: [],
        photographerId: '',
        designerId: '',
        managerId: '',
        tz: [],
        contract: '',
        additionalContract: '',
        attachmentContract: '',
        address: '',
        preFormDate: '',
        formDate: '',
        layoutFormDate: '',
        userId: '',
        dateTimes: [],
        designerDescription: '',
        initialDescription: '',
        description: '',
      },

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/admins/all_orders/new',
          icon: 'save',
          click: async () => {
            this.$v.$touch()
            if (this.$v.$invalid) {
              this.$notification.error('Введенные данные некорректны', {
                timer: 3,
                position: 'topRight',
              })
            } else {
              try {
                this.error = null
                const newOrder = this.order
                newOrder.photographerId = newOrder.photographerId.ID
                newOrder.managerId = newOrder.managerId.ID
                newOrder.userId = newOrder.userId.ID
                newOrder.contract = this.$store.state.contract.file
                newOrder.attachmentContract = this.$store.state.attachContract.file
                newOrder.additionalContract = this.$store.state.additionalContract.file
                newOrder.dateTimes = this.photoDates.map((d) => {
                  return d.datetime
                })

                if (newOrder.photographerId && newOrder.address) {
                  newOrder.status = 'photoDateApproved'
                }

                await this.create(Object.assign({}, newOrder))

                if (newOrder.sections.includes('cover')) {
                  this.savePerson(
                    this.newOrderId,
                    'cover',
                    'Фото учебного заведения'
                  )
                }
                if (newOrder.sections.includes('group')) {
                  this.savePerson(
                    this.newOrderId,
                    'group',
                    'Общегрупповая фотография'
                  )
                }
                if (newOrder.sections.includes('reportage')) {
                  this.savePerson(this.newOrderId, 'reportage', 'Репортаж')
                }
              } catch (e) {
                this.error = e.response
              } finally {
                this.allFilesClear()
                if (this.error == null) {
                  this.$router.push({ path: '/admins/all_orders' })
                  this.$notification.success('Создан новый заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else {
                  this.$notification.error('Не удалось создать заказ', {
                    timer: 3,
                    position: 'topRight',
                  })
                }
              }
            }
          },
        },
        {
          label: 'Отмена',
          btnClass: 'secondary',
          to: '/admins/all_orders',
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/items',
      newOrderId: 'order/orderId',
    }),
  },

  methods: {
    ...mapActions({
      create: 'order/CREATE',
      createContract: 'contract/CREATE',
      createAdditionalContract: 'additionalContract/CREATE',
      createPerson: 'person/CREATE',
      clearContract: 'contract/CLEAR',
      clearAdditionalContract: 'additionalContract/CLEAR',
      clearPhotoContract: 'photoContract/CLEAR',
      clearFile: 'file/CLEAR',
      clearLayout: 'layout/CLEAR',
      createAttachContract: 'attachContract/CREATE',
      clearAttachContract: 'attachContract/CLEAR',
    }),

    allFilesClear() {
      this.clearContract()
      this.clearAttachContract()
      this.clearAdditionalContract()
      this.clearPhotoContract()
      this.clearFile()
      this.clearLayout()
    },

    customLabel(value) {
      return `${value.name} ${value.surname} ${value.email}`
    },

    addDate() {
      const newForm = this.defaultFormDates
      this.photoDates.push(Object.assign({}, newForm))
    },

    removeDate(index) {
      this.photoDates.splice(index, 1)
    },

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

    deleteAdditionalContract(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.addContract.deleteFileRecord(fileRecord)
      }
    },

    datePickerDisabledRule(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return date < today
    },

    async savePerson(id, type, name) {
      const newPerson = this.defaultFormModels
      newPerson.orderId = id
      newPerson.surname = name
      newPerson.type = type
      await this.createPerson(Object.assign({}, newPerson))
    },

    async saveContract() {
      try {
        this.error = null
        const file = this.$refs.contract._data.fileRecords[0].file
        await this.createContract(file)
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearContract()
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

    saveAdditionalContract() {
      try {
        this.error = null
        const file = this.$refs.addContract._data.fileRecords[0].file
        this.createAdditionalContract(file)
      } catch (e) {
        this.error = e.response
      } finally {
        this.clearAdditionalContract()

        if (this.error == null) {
          this.$notification.success(
            `${this.$refs.addContract._data.fileRecords[0].file.name} сохранен на сервере`,
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

    async saveAttachmentContract() {
      try {
        this.error = null
        const file = this.$refs.attContract._data.fileRecords[0].file
        await this.createAttachContract(file)
      } catch (e) {
        this.error = e.response
      } finally {
        await this.clearAttachContract()

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

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.card-body {
  border-radius: 5px;
}

.error {
  font-size: $font-size-xs;
  color: $danger-color;
}

.mx-datepicker {
  width: 100%;
  .mx-input {
    height: 38px;
  }
}

.plus-date-btn {
  font-size: $font-size-xs;
  color: $success-color;
}

.remove-date-btn,
.error {
  font-size: $font-size-xs;
  color: $danger-color;
}
</style>
