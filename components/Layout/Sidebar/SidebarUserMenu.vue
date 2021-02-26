<template>
  <div>
    <a v-b-toggle.sidebar-right>user12345@mail.ru</a>
    <b-sidebar id="sidebar-right" right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item>
                <n-link to="/personal_data" @click="hide">
                  <span>Личные данные</span>
                </n-link>
              </b-nav-item>
              <b-nav-item>
                <n-link to="/security" @click="hide">
                  <span> Пароль и безопасность </span>
                </n-link>
              </b-nav-item>
              <b-nav-item @click.prevent="$nuxt.$auth.logout">
                <span> Выйти </span>
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'NavbarUserMenu',
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  cursor: pointer;
  color: #33333c;

  &:hover {
    color: #00908c;
  }
}
</style>
