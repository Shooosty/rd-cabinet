<template>
  <div>
    <PageHeader card-title="Пароль и безопасность" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div class="mb-5">
        <h5>Смена пароля</h5>
      </div>
      <div class="form-group">
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Текущий пароль</div>
              <div class="d-flex">
                <input
                  v-model="user.password"
                  v-model.trim="$v.user.password.$model"
                  class="form-control width-email"
                  required
                  type="password"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'lock']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Новый пароль</div>
              <div class="d-flex">
                <input
                  v-model="user.newPassword"
                  v-model.trim="$v.user.newPassword.$model"
                  class="form-control width-email"
                  required
                  type="password"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'lock']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>

        <div class="form-control-email mt-3 d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Подтвердите пароль</div>
              <div class="d-flex">
                <input
                  v-model="acceptPassword"
                  v-model.trim="$v.acceptPassword.$model"
                  class="form-control width-email"
                  required
                  type="password"
                />
                <div class="d-flex align-items-center ml-auto">
                  <fa class="color-icon" :icon="['fas', 'check']" />
                </div>
              </div>
            </div>
          </div>
          <div class="pure"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from 'vuelidate/lib/validators'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PageHeader },

  perimeters: [ViewPerimeter],

  validations: {
    acceptPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(64),
      sameAsPassword: sameAs(function () {
        return this.user.newPassword
      }),
    },

    user: {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
      },
      newPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
      },
    },
  },

  data() {
    return {
      error: null,

      user: {
        ID: '',
        password: '',
        newPassword: '',
      },

      acceptPassword: '',

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          icon: 'save',
          click: async () => {
            this.$v.$touch()
            if (this.$v.$invalid) {
              this.$notification.error('Не удалось изменить пароль', {
                timer: 3,
                position: 'topRight',
              })
            } else {
              try {
                this.error = null
                const updatedUser = this.user
                updatedUser.ID = this.$auth.user.ID

                await this.changePassword(Object.assign({}, updatedUser))
              } catch (e) {
                this.error = e.response.data
              } finally {
                if (this.error == null) {
                  this.$notification.success('Пароль успешно изменен', {
                    timer: 3,
                    position: 'topRight',
                  })
                }

                if (this.error && this.error.message === 'record not found') {
                  this.$notification.error('Неправильный пароль', {
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
          to: '/my_orders',
          icon: 'window-close',
        },
      ],
    }
  },

  methods: {
    ...mapActions({
      changePassword: 'user/CHANGE_PASSWORD',
    }),
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/auth-page';

.card-body {
  border-radius: 5px;
}
</style>
