<template>
  <div v-show="$isAllowed('viewForAdmin')">
    <PageHeader card-title="Добавить нового сотрудника" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <form>
        <div v-if="errors" class="alert alert-danger" role="alert">
          {{ errors }}
        </div>
        <div class="form-group">
          <div class="form-control-email d-flex flex-column">
            <div class="d-flex">
              <div class="flex-column data-email">
                <div class="label">Имя</div>
                <div class="d-flex">
                  <input
                    v-model="newUser.name"
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
                    v-model="newUser.email"
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
                  <input
                    v-model="newUser.phone"
                    class="form-control width-email"
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

          <div class="mt-3 form-password">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <div class="data-password flex-column">
                  <div class="label">Пароль</div>
                  <div class="form-control-password d-flex">
                    <input
                      v-model="newUser.password"
                      class="form-control width-password"
                      required
                      type="password"
                    />
                    <div class="d-flex align-items-center ml-auto">
                      <div class="d-flex align-items-center ml-auto">
                        <fa class="color-icon" :icon="['fas', 'lock']" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pure"></div>
            </div>
          </div>

          <div class="mt-3 form-password">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <div class="data-password flex-column">
                  <div class="label">Повторите пароль</div>
                  <div class="form-control-password d-flex">
                    <input
                      v-model="acceptPassword"
                      class="form-control width-password"
                      required
                      type="password"
                    />
                    <div class="d-flex align-items-center ml-auto">
                      <div class="d-flex align-items-center ml-auto">
                        <fa class="color-icon" :icon="['fas', 'check']" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pure"></div>
            </div>
          </div>

          <div class="mt-3">
            <div class="label mb-1">Укажите роль пользователя</div>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <b-form-select v-model="newUser.role" :options="roles" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageHeader },

  perimeters: [ViewPerimeter],

  async fetch() {
    await this.fetchUsers()
  },

  data() {
    return {
      errors: null,

      newUser: {
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
      },

      acceptPassword: '',

      isLoading: false,

      roles: [
        { value: 'manager', text: 'Менеджер' },
        { value: 'photographer', text: 'Фотограф' },
        { value: 'designer', text: 'Дизайнер' },
      ],

      actions: [
        {
          label: 'Зарегистрировать',
          btnClass: 'success',
          to: '/admins/all_users',
          icon: 'save',
          click: () => {
            if (
              this.acceptPassword === this.newUser.password &&
              this.newUser.role !== 'superadmin'
            ) {
              this.isLoading = true

              try {
                this.SIGN_UP(Object.assign({}, this.newUser))
                this.errors = null
              } catch (e) {
                this.errors = e
              } finally {
                this.isLoading = false
              }
            } else {
              this.errors = 'Пароли не совпадают!'
            }
          },
        },
        {
          label: 'Отмена',
          btnClass: 'danger',
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
    ...mapActions('user', ['SIGN_UP']),

    async fetchUsers() {
      await this.$store.dispatch('user/GET_ALL')
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/auth-page';

.card-body {
  border-radius: 5px;
}
</style>
