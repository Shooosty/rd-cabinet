<template>
  <div v-if="isShow">
    <div v-show="this.$auth.user ? $isAllowed(govern) : true">
      <a
        v-if="fn"
        :govern="govern"
        :href="to"
        class="btn ml-2 d-inline-flex align-items-center justify-content-center pt-0 pb-0"
        :class="type(btnClass)"
        @click.prevent="fn && fn.call()"
      >
        <span
          v-if="label"
          class="d-lg-inline-block"
          :class="[icon ? 'ml-2 d-none' : '']"
          v-text="label"
        />

        <span v-if="icon" class="ml-auto">
          <fa :icon="['fas', `${icon}`]" />
        </span>
      </a>

      <n-link
        v-else
        :govern="govern"
        :to="to"
        class="btn ml-2 d-inline-flex align-items-center justify-content-center pt-0 pb-0"
        :class="type(btnClass)"
      >
        <span
          v-if="label"
          class="d-lg-inline-block"
          :class="[icon ? 'ml-2 d-none' : '']"
          v-text="label"
        />

        <span v-if="icon" class="ml-auto">
          <fa :icon="['fas', `${icon}`]" />
        </span>
      </n-link>
    </div>
  </div>
</template>

<script>
import ViewPerimeter from '~/perimeters/viewPerimeter'

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    btnClass: {
      type: String,
      default: 'success',
    },
    to: {
      type: [String, Object],
      default: '#',
    },
    fn: {
      type: Function,
      default: null,
    },
    govern: {
      type: String,
      default: 'viewForAll',
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },

  perimeters: [ViewPerimeter],

  methods: {
    type(value) {
      switch (value) {
        case 'success':
          return 'btn-green'
        case 'danger':
          return 'btn-red'
        case 'secondary':
          return 'btn-bordered'
        case 'black':
          return 'btn-black'
      }
    },
  },
}
</script>
