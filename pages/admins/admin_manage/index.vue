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

  data() {
    return {
      error: null,
    }
  },

  methods: {
    ...mapActions({
      clear: 'file/DELETE_ALL',
    }),

    async clearS3() {
      if (confirm('ВСЕ файлы хранилища Amazon будут удалены! Продолжить?')) {
        await this.clear()
        try {
          this.error = null
        } catch (e) {
          this.error = e.response.data
        } finally {
          if (this.error == null) {
            this.$notification.success('Хранилище очищено', {
              timer: 2,
              position: 'topRight',
            })
          } else {
            this.$notification.error('Не удалось очистить хранилище', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
