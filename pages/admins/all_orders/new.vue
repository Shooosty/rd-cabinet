<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <page-header card-title="Все заказы" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div>
        <b-row>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <label for="datetime">Дата и время фотосъемки</label>
            <date-picker
              id="datetime"
              v-model="newOrder.datetime"
              type="datetime"
              placeholder="Выберите дату и время"
            ></date-picker>
          </b-col>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label for="address">Адрес фотосъемки</label>
              <b-form-input
                id="address"
                v-model="newOrder.address"
                placeholder="Введите адрес"
              />
            </div>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="p-3">
            <label for="contract">Загрузите копию договора</label>
            <b-form-file
              id="contract"
              placeholder="Выберете файл или перетащите..."
              drop-placeholder="Перетащите файл сюда..."
            ></b-form-file>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="4" lg="4" md="6" sm="12" class="p-3">
            <div>
              <label>Выберите клиента</label>
              <multiselect
                v-model="newOrder.userId"
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
                v-model="newOrder.photographerId"
                :options="photographers"
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
                v-model="newOrder.designerId"
                :options="designers"
                placeholder="дизайнер"
                label="email"
                track-by="email"
              />
            </div>
          </b-col>
        </b-row>
        <div class="mt-5">
          <b-form-textarea
            v-model="newOrder.description"
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
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageHeader, Multiselect },
  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchUsers()
  },

  data() {
    return {
      newOrder: {
        owner: 'photographer',
        status: 'new',
        photographerId: '',
        designerId: '',
        photos: [],
        contract: '',
        docs: '',
        objectType: '',
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
          click: () => {
            try {
              this.create(Object.assign({}, this.newOrder))
              this.errors = null
            } catch (e) {
              this.errors = e
            } finally {
              if (this.errors == null) {
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
          },
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/items',
    }),

    clients() {
      return this.users.filter((users) => users.role === 'user')
    },

    photographers() {
      return this.users.filter((users) => users.role === 'photographer')
    },

    designers() {
      return this.users.filter((users) => users.role === 'designer')
    },
  },

  methods: {
    ...mapActions({
      create: 'order/CREATE',
    }),

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
