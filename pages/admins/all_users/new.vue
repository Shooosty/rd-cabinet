<template>
  <div v-show="$isAllowed('viewSidebarMenuItemForAdmin')">
    <page-header card-title="Добавить нового сотрудника" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <form @submit.prevent="sendForm">
        <div v-if="errors" class="alert alert-danger" role="alert">
          {{ errors }}
        </div>
        <div class="form-group">
          <div class="form-control-email d-flex flex-column">
            <div class="d-flex">
              <div class="flex-column data-email">
                <div class="label">имя</div>
                <div class="d-flex">
                  <input
                    v-model="user.name"
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
                <div class="label">e-mail</div>
                <div class="d-flex">
                  <input
                    v-model="user.email"
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
                <div class="label">телефон</div>
                <div class="d-flex">
                  <input
                    v-model="user.phone"
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
                  <div class="label">пароль</div>
                  <div class="form-control-password d-flex">
                    <input
                      v-model="user.password"
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
                  <div class="label">повторите пароль</div>
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

          <div class="mt-3 form-password">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <b-dropdown />
              </div>
              <div class="pure"></div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
          <div>
            <PrimaryButton
              type="submit"
              :disabled="isLoading"
              label="Зарегистрировать"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageHeader from '~/components/Pages/Card/PageHeader'
import SidebarMenuPerimeter from '~/perimeters/sidebarMenuPerimeter'
import PrimaryButton from '~/components/Button/PrimaryButton'

export default {
  components: { PrimaryButton, PageHeader },

  perimeters: [SidebarMenuPerimeter],

  async fetch() {
    await this.fetchUsers()
  },

  data() {
    return {
      errors: null,

      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
      },

      acceptPassword: '',

      isLoading: false,

      actions: [
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
      items: 'user/all',
      pagination: 'user/pagination',
    }),

    users() {
      return this.items.data
    },
  },

  methods: {
    ...mapActions('user', ['SIGN_UP']),

    async sendForm() {
      if (
        this.acceptPassword === this.user.password &&
        this.user.role !== 'superadmin'
      ) {
        this.isLoading = true

        try {
          await this.SIGN_UP(Object.assign({}, this.user))
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
