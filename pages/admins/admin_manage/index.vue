<template>
  <div v-show="$isAllowed('viewForSuperAdmin')">
    <page-header card-title="Администрирование" />
    <div class="mt-3 card-body bg-white">
      <PrimaryButton label="Очистить Amazon" @click.native="clearS3" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PrimaryButton from '~/components/Button/PrimaryButton'
import PageHeader from '~/components/Pages/Card/PageHeader'
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  components: { PrimaryButton, PageHeader },

  perimeters: [ViewPerimeter],

  methods: {
    ...mapActions({
      clear: 'file/DELETE_ALL',
    }),

    clearS3() {
      this.clear()
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
