<template>
  <Guest>
    <form @submit.prevent="sendForm">
      <div v-if="errors" class="alert alert-danger" role="alert">ошибка</div>
      <div class="form-group">
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">e-mail</div>
              <div class="d-flex">
                <input
                  v-model="user.email"
                  autofocus
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
                    <n-link
                      to="/reset-password"
                      class="password-recovery-link mr-1"
                    >
                      <span class="color-password"> забыли пароль? </span>
                    </n-link>
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
      </div>
      <div class="d-flex mt-5">
        <div>
          <PrimaryButton type="submit" :disabled="isLoading" label="Вход" />
        </div>
        <div>
          <LinkButton
            to="/sign-up"
            btn-class="secondary"
            label="Зарегистрироваться"
          />
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
        email: '',
        password: '',
      },

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
    ...mapActions('auth', ['SIGN_IN']),

    async sendForm() {
      this.isLoading = true

      try {
        await this.SIGN_IN(Object.assign({}, this.user))
        this.errors = null
      } catch (e) {
        this.errors = e
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/auth-page';
</style>
