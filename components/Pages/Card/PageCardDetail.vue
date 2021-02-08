<template>
  <div>
    <page-header :card-title="cardTitle" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <vue-tabs v-if="isOrderPage">
        <v-tab title="Основная информация">
          <general-order />
        </v-tab>
        <v-tab title="Дополнительно">
          <secondary-order />
        </v-tab>
      </vue-tabs>
      <vue-tabs v-if="isProjectPage">
        <v-tab title="Основная информация">
          <general-project />
        </v-tab>
        <v-tab title="Файлы">
          <project-files />
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/Pages/Card/PageHeader'
import GeneralOrder from '~/components/Pages/Order/GeneralOrder'
import SecondaryOrder from '~/components/Pages/Order/SecondaryOrder'
import ProjectFiles from '~/components/Pages/Project/ProjectFiles'
import GeneralProject from '~/components/Pages/Project/GeneralProject'

export default {
  components: {
    PageHeader,
    GeneralOrder,
    SecondaryOrder,
    ProjectFiles,
    GeneralProject,
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
    tabs: {
      type: Array[Object],
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
