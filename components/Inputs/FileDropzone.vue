<template>
  <dropzone
    :id="id"
    ref="el"
    :options="options"
    :destroy-dropzone="true"
    :use-custom-slot="true"
    class="dropzone d-flex justify-content-center align-items-center"
  >
    <fa :icon="['fas', `${options.icon}`]" class="dropzone-icon" />

    <span class="dropzone-text">
      {{ options.text }}
    </span>
  </dropzone>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  emits: ['change'],
  components: {
    Dropzone,
  },
  props: {
    id: {
      type: String,
      default: 'dropzone',
    },
    title: {
      type: String,
      default: 'Загрузите файл',
    },
    options: {
      type: Object,
      default() {
        return {
          text: 'Загрузите файл',
          icon: 'file-download',
          acceptedFiles: 'image/*',
          url: '#',
          addRemoveLinks: true,
        }
      },
    },
  },

  methods: {
    async uploadPhotos() {
      const files = this.$refs.el.dropzone.getAcceptedFiles()
      await this.options.sendFile(files).then(() => {
        this.$refs.el.dropzone.removeAllFiles()
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.dropzone {
  border: 2px dotted lightgrey;
  border-radius: 5px;
}

.dropzone-text,
.dropzone-icon {
  color: $success-color;
}
</style>
