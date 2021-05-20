<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <page-header card-title="Все заказы" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div>
        <b-row>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label for="address">Адрес фотосъемки</label>
              <b-form-input
                id="address"
                v-model="order.address"
                v-model.trim="$v.order.address.$model"
                placeholder="Введите адрес"
              />
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <label for="datetime">Дата и время фотосъемки</label>
            <date-picker
              id="datetime"
              v-model="order.datetime"
              v-model.trim="$v.order.datetime.$model"
              type="datetime"
              value-type="format"
              :open.sync="open"
              format="YYYY-MM-DDTHH:mm"
              placeholder="Выберите дату и время"
              @change="dateTimeChange"
            />
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="p-3">
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
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите клиента</label>
              <multiselect
                v-model="order.userId"
                v-model.trim="$v.order.userId.$model"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                :options="clients"
                placeholder="email"
                label="email"
                track-by="email"
              />
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите фотографа</label>
              <multiselect
                v-model="order.photographerId"
                v-model.trim="$v.order.photographerId.$model"
                :options="photographers"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                placeholder="фотограф"
                label="email"
                track-by="email"
              />
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="p-3">
            <div>
              <label>Выберите дизайнера</label>
              <multiselect
                v-model="order.designerId"
                v-model.trim="$v.order.designerId.$model"
                :options="designers"
                selected-label="выбран"
                deselect-label="убрать"
                select-label="выбрать"
                placeholder="дизайнер"
                label="email"
                track-by="email"
              />
            </div>
          </b-col>
        </b-row>
        <div class="mt-5">
          <b-form-textarea
            v-model="order.description"
            v-model.trim="$v.order.description.$model"
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
import { mapActions, mapGetters, mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import UsersGroupByRoleMixin from '~/mixins/users-group-by-role-mixin'

export default {
  components: { PageHeader, Multiselect },

  perimeters: [ViewPerimeter],

  mixins: [UsersGroupByRoleMixin],

  async fetch() {
    await this.fetchUsers()
  },

  validations: {
    order: {
      address: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(64),
      },
      datetime: {
        required,
        // доработать
      },
      userId: {
        required,
      },
      photographerId: {
        required,
      },
      designerId: {
        required,
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
      open: false,

      order: {
        owner: 'photographer',
        status: 'new',
        photographerId: '',
        designerId: '',
        contract: '',
        address: '',
        userId: '',
        datetime: '',
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
                position: 'bottomCenter',
              })
            } else {
              try {
                this.error = null
                const newOrder = this.order
                newOrder.designerId = newOrder.designerId.ID
                newOrder.photographerId = newOrder.photographerId.ID
                newOrder.userId = newOrder.userId.ID
                newOrder.contract = this.contractFile

                await this.create(Object.assign({}, newOrder))
              } catch (e) {
                this.error = e.response.data
              } finally {
                await this.clearFiles()
                if (this.error == null) {
                  setTimeout(
                    () => this.$router.push({ path: '/admins/all_orders' }),
                    2000
                  )
                  this.$notification.success('Создан новый заказ', {
                    timer: 3,
                    position: 'bottomCenter',
                  })
                } else {
                  this.$notification.error('Не удалось создать заказ', {
                    timer: 3,
                    position: 'bottomCenter',
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
    }),

    ...mapState('photo.js', {
      contractFile: (state) => (state.items.length ? state.items[0].url : ''),
    }),
  },

  methods: {
    ...mapActions({
      create: 'order/CREATE',
      updateContract: 'photo.js/POST_FILES',
      clearFiles: 'photo.js/CLEAR_FILES',
    }),

    deleteContract(fileRecord) {
      if (confirm('Подтверждаете удаление?')) {
        this.$refs.contract.deleteFileRecord(fileRecord)
      }
    },

    dateTimeChange(value, type) {
      if (type === 'minute') {
        this.open = false
      }
    },

    async saveContract() {
      this.clearFiles()
      try {
        this.error = null
        const file = this.$refs.contract._data.fileRecords[0].file
        await this.updateContract(file)
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

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}

.custom-file-input:lang(ru) ~ .custom-file-label::after {
  content: 'Загрузить';
}

.mx-datepicker {
  width: 100%;
  .mx-input {
    height: 38px;
  }
}
</style>
