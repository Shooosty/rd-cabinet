<template>
  <Guest>
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
                  autofocus
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
      </div>
      <div class="d-flex mt-5">
        <div>
          <PrimaryButton
            type="submit"
            :disabled="isLoading"
            label="Зарегистрироваться"
          />
        </div>
        <div>
          <LinkButton to="/sign-in" btn-class="danger" label="Отмена" />
        </div>
      </div>
    </form>
  </Guest>
</template>

<script>
import { mapActions } from 'vuex'
import PrimaryButton from '~/components/Button/PrimaryButton'
import LinkButton from '~/components/Button/LinkButton'
import Guest from '~/components/Pages/Guest'

export default {
  components: { Guest, LinkButton, PrimaryButton },
  auth: 'guest',
  layout: 'guest',

  data() {
    return {
      errors: null,
      user: {
        name: '',
        email: '',
        password: '',
        role: 'user',
      },
      acceptPassword: '',
      isLoading: false,
    }
  },

  mounted() {
    const input = document.querySelector('[autofocus]')
    if (input) {
      input.focus()
    }
  },

  methods: {
    ...mapActions('auth', ['SIGN_UP']),

    async sendForm() {
      if (this.acceptPassword === this.user.password) {
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
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/auth-page';
</style>
