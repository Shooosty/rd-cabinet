<template>
  <div>
    <PageHeader :card-title="cardTitle" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <vue-tabs v-if="isOrderPage">
        <v-tab title="Основная информация">
          <GeneralOrder :resource.sync="resource" />
        </v-tab>
        <v-tab title="Дополнительно">
          <SecondaryOrder :resource.sync="resource" />
        </v-tab>
        <v-tab title="Фотографии">
          <PhotoOrder :resource.sync="resource" />
        </v-tab>
        <v-tab title="Администрирование">
          <AdminOrder :resource.sync="resource" />
        </v-tab>
      </vue-tabs>

      <vue-tabs v-if="isProjectPage">
        <v-tab title="Основная информация">
          <GeneralProject />
        </v-tab>
        <v-tab title="Файлы">
          <ProjectFiles />
        </v-tab>
      </vue-tabs>

      <vue-tabs v-if="isUserPage">
        <v-tab title="Основная информация">
          <UserGeneral :resource.sync="resource" />
        </v-tab>
        <v-tab title="Заказы">
          <UserOrders :resource.sync="resource" />
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Pages/Card/PageHeader'
import GeneralOrder from '~/components/Pages/Order/GeneralOrder'
import UserGeneral from '~/components/Pages/User/UserGeneral'
import UserOrders from '~/components/Pages/User/UserOrders'
import SecondaryOrder from '~/components/Pages/Order/SecondaryOrder'
import PhotoOrder from '~/components/Pages/Order/PhotoOrder'
import AdminOrder from '~/components/Pages/Order/AdminOrder'
import ProjectFiles from '~/components/Pages/Project/ProjectFiles'
import GeneralProject from '~/components/Pages/Project/GeneralProject'

export default {
  components: {
    PageHeader,
    GeneralOrder,
    SecondaryOrder,
    ProjectFiles,
    GeneralProject,
    PhotoOrder,
    AdminOrder,
    UserGeneral,
    UserOrders,
  },

  props: {
    cardTitle: {
      type: String,
      required: true,
    },
    isOrderPage: {
      type: Boolean,
      default: false,
    },
    isProjectPage: {
      type: Boolean,
      default: false,
    },
    isUserPage: {
      type: Boolean,
      default: false,
    },
    resource: {
      type: Object,
      required: true,
    },
    actions: {
      type: Array[Object],
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
