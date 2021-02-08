<template>
  <div
    class="d-flex justify-content-between align-items-center card-header bg-white"
  >
    <div class="d-flex justify-content-start">
      <span class="card-title">
        {{ cardTitle }}
      </span>
    </div>
    <div class="d-flex justify-content-end">
      <link-button
        v-for="action in actions"
        :key="action.label"
        :label="action.label"
        :icon="action.icon"
        :to="action.path"
        :btn-class="action.btnClass"
      />
    </div>
  </div>
</template>

<script>
import LinkButton from '~/components/Button/LinkButton'

export default {
  components: { LinkButton },

  props: {
    cardTitle: {
      type: String,
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
@import '~/assets/stylesheets/default';

.card-header {
  border-radius: 5px;
  border: none;
}
.card-title {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $secondary-color;
  border-bottom: $default-color solid 4px;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
