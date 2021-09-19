<template>
  <div>
    <a v-b-toggle.sidebar-right>
      <fa :icon="['fas', 'user']" />
      {{ userEmail }}
    </a>
    <b-sidebar id="sidebar-right" right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item class="p-2">
                <n-link to="/personal_data" @click="hide">
                  <span>Личные данные</span>
                </n-link>
              </b-nav-item>
              <b-nav-item class="p-2">
                <n-link to="/security" @click="hide">
                  <span> Пароль и безопасность </span>
                </n-link>
              </b-nav-item>
              <b-nav-item class="d-flex justify-content-center mt-2">
                <PrimaryButton label="Выйти" @click.native="logout" />
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import PrimaryButton from '~/components/Button/PrimaryButton'

export default {
  name: 'NavbarUserMenu',
  components: { PrimaryButton },

  computed: {
    userEmail() {
      return this.$auth.user.email
    },
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

a {
  text-decoration: none;
  cursor: pointer;
  color: $secondary-color;

  &:hover {
    color: $success-color;
  }
}
</style>
