<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageHeader card-title="Добавить нового сотрудника" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div class="form-group">
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Имя</div>
              <div class="d-flex">
                <input
                  v-model="employee.name"
                  v-model.trim="$v.employee.name.$model"
                  class="form-control width-email"
                  required
                  type="text"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'user']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Фамилия</div>
              <div class="d-flex">
                <input
                  v-model="employee.surname"
                  v-model.trim="$v.employee.surname.$model"
                  class="form-control width-email"
                  required
                  type="text"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'user']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">E-mail</div>
              <div class="d-flex">
                <input
                  v-model="employee.email"
                  v-model.trim="$v.employee.email.$model"
                  class="form-control width-email"
                  required
                  type="email"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'envelope']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Телефон</div>
              <div class="d-flex">
                <span class="d-flex align-items-center">
                  <span>+7 </span>
                </span>
                <input
                  v-model="employee.phone"
                  v-model.trim="$v.employee.phone.$model"
                  class="form-control width-email"
                  placeholder="(555)555-55-55"
                  autocomplete="tel"
                  maxlength="10"
                  required
                  type="tel"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'phone']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="mt-3">
          <div class="label mb-1">Укажите роль пользователя</div>
          <div class="d-flex flex-column">
            <div class="d-flex">
              <b-form-select
                v-model="employee.role"
                v-model.trim="$v.employee.role.$model"
                :options="roles"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageHeader },

  perimeters: [ViewPerimeter],

  validations: {
    employee: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(19),
      },
      surname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(19),
      },
      phone: {
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(10),
      },
      email: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
      },
      role: {
        required,
      },
    },
  },

  data() {
    return {
      error: null,

      employee: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        role: '',
      },

      acceptPassword: '',

      roles: [
        { value: 'admin', text: 'Менеджер' },
        { value: 'photographer', text: 'Фотограф' },
        { value: 'designer', text: 'Дизайнер' },
      ],

      actions: [
        {
          label: 'Зарегистрировать',
          btnClass: 'success',
          icon: 'save',
          click: async () => {
            this.$v.$touch()
            if (this.employee.role !== 'superadmin' && this.$v.$invalid) {
              this.$notification.error('Не удалось создать сотрудника', {
                timer: 3,
                position: 'topRight',
              })
            } else {
              try {
                this.error = null
                await this.SIGN_UP_EMPLOYEE(Object.assign({}, this.employee))
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  setTimeout(
                    () => this.$router.push({ path: '/admins/all_users' }),
                    2000
                  )
                  this.$notification.success('Создан сотрудник', {
                    timer: 3,
                    position: 'topRight',
                  })
                } else if (
                  this.error.message ===
                  'pq: duplicate key value violates unique constraint "users_email_uindex"'
                ) {
                  this.$notification.error(
                    'Сотрудник с такой почтой уже зарегистрирован',
                    {
                      timer: 3,
                      position: 'topRight',
                    }
                  )
                }
              }
            }
          },
        },
        {
          label: 'Отмена',
          btnClass: 'secondary',
          to: '/admins/all_users',
          icon: 'window-close',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      items: 'user/items',
      pagination: 'user/pagination',
    }),
  },

  methods: {
    ...mapActions('user', ['SIGN_UP_EMPLOYEE']),
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/auth-page';

.card-body {
  border-radius: 5px;
}
</style>
