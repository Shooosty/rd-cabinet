<template>
  <Guest>
    <form @submit.prevent="sendForm">
      <div class="form-group">
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">имя</div>
              <div class="d-flex">
                <input
                  v-model="user.name"
                  v-model.trim="$v.user.name.$model"
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
                  v-model.trim="$v.user.email.$model"
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
                <span class="d-flex align-items-center">
                  <span>+7 </span>
                </span>
                <input
                  v-model="user.phone"
                  v-model.trim="$v.user.phone.$model"
                  v-phone
                  placeholder="(555)555-55-55"
                  class="form-control width-email"
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

        <div class="mt-3 form-password">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <div class="data-password flex-column">
                <div class="label">пароль</div>
                <div class="form-control-password d-flex">
                  <input
                    v-model="user.password"
                    v-model.trim="$v.user.password.$model"
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
                    v-model.trim="$v.acceptPassword.$model"
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
      </div>
      <div class="d-flex mt-5">
        <div>
          <PrimaryButton type="submit" label="Зарегистрироваться" />
        </div>
        <div>
          <LinkButton to="/sign-in" btn-class="secondary" label="Отмена" />
        </div>
      </div>
    </form>
  </Guest>
</template>

<script>
import { mapActions } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from 'vuelidate/lib/validators'
import PrimaryButton from '~/components/Button/PrimaryButton'
import LinkButton from '~/components/Button/LinkButton'
import Guest from '~/components/Pages/Guest'

export default {
  components: {
    Guest,
    LinkButton,
    PrimaryButton,
  },

  auth: 'guest',
  layout: 'guest',

  data() {
    return {
      error: null,
      submitStatus: null,
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
      },
      acceptPassword: '',
    }
  },

  validations: {
    acceptPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(64),
      sameAsPassword: sameAs(function () {
        return this.user.password
      }),
    },

    user: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(19),
      },
      phone: {
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(14),
      },
      email: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
      },
    },
  },

  methods: {
    ...mapActions('user', ['SIGN_UP']),

    async sendForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        this.$notification.error('Введенные данные некорректны', {
          timer: 3,
          position: 'bottomCenter',
        })
      } else {
        try {
          this.error = null
          await this.SIGN_UP(Object.assign({}, this.user))
        } catch (e) {
          this.error = e.response.data
        } finally {
          if (this.error == null) {
            setTimeout(() => this.$router.push({ path: '/sign-in' }), 2000)
            this.$notification.success('Вы успешно зарегистрировались', {
              timer: 3,
              position: 'bottomCenter',
            })
          } else if (
            this.error.message ===
            'pq: duplicate key value violates unique constraint "users_email_uindex"'
          ) {
            this.$notification.error(
              'Пользователь с такой почтой уже зарегистрирован',
              {
                timer: 3,
                position: 'bottomCenter',
              }
            )
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/auth-page';
</style>
