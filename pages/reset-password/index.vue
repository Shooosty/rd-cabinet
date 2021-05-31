<template>
  <Guest>
    <form @submit.prevent="sendForm">
      <div class="form-group">
        <div class="form-control-email d-flex flex-column">
          <div class="d-flex">
            <div class="flex-column data-email">
              <div class="label">Введите ваш е-mail</div>
              <div class="d-flex">
                <input
                  v-model="email"
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

        <div class="d-flex mt-5">
          <div>
            <PrimaryButton type="submit" label="Отправить" />
          </div>
          <div>
            <LinkButton to="/sign-in" btn-class="secondary" label="Отмена" />
          </div>
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
      error: null,

      email: '',
    }
  },

  methods: {
    ...mapActions('user', ['RESET_PASSWORD']),

    async sendForm() {
      try {
        this.error = null
        await this.RESET_PASSWORD(this.email)
      } catch (e) {
        this.error = e.response
      } finally {
        if (this.error == null) {
          setTimeout(() => this.$router.push({ path: '/sign-in' }), 2500)
          this.$notification.success(
            'Пароль для входа отправлен на вашу почту',
            {
              timer: 3,
              position: 'topRight',
            }
          )
        } else if (this.error && this.error.message === 'record not found') {
          this.$notification.error('Неправильный email', {
            timer: 3,
            position: 'topRight',
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/auth-page';
</style>
