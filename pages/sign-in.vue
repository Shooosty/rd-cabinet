<template>
  <Guest>
    <form @submit.prevent="sendForm">
      <div v-if="errors" class="alert alert-danger" role="alert">ошибка</div>
      <div>
        <p class="title-header">Вход</p>
        <p class="title-action">Вход</p>
      </div>
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
                  <icon class="color-icon" :icon="['fal', 'envelope']" />
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
                      <span class="color-password"> Пароль </span>
                    </n-link>
                    <div class="d-flex align-items-center ml-auto">
                      <icon class="color-icon" :icon="['fal', 'lock']" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pure"></div>
          </div>
        </div>
      </div>
      <div class="mb-3 d-flex">
        <div class="mr-1">
          <PrimaryButton
            type="submit"
            class="btn btn-primary mt-3 justify-content-center"
            :disabled="isLoading"
            :label="Вход"
          />
        </div>
        <div class="ml-1">
          <LinkButton
            to="/sign-up"
            class="btn btn-light mt-3 justify-content-center"
            :label="Зарегистрироваться"
            span-class="d-block"
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
    ...mapActions('user', ['SIGN_IN']),

    async sendForm() {
      this.isLoading = true

      try {
        await this.SIGN_IN(Object.assign({}, this.user)).then(() =>
          this.$toast.success(this.$t('toasts.auth.signed_in'), '', {
            position: 'topRight',
            timeout: 4200,
            icon: 'icon-default',
          })
        )
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

.width-password {
  width: 60% !important;
}
</style>
