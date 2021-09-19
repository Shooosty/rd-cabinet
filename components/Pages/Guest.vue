<template>
  <div class="guest d-flex align-items-stretch">
    <div
      class="
        group
        d-flex
        justify-content-center
        align-items-center
        shadow-lg
        bg-white
      "
    >
      <div class="sign-content p-5">
        <div class="d-flex flex-column mb-5">
          <span class="title-name">RHINODESIGN</span>
          <span class="title-direction">My Cabinet</span>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="d-none d-md-block auth-image"></div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.sign-content {
  max-width: 525px;
}

.title-name {
  color: $secondary-color;
  font-size: $font-size-xl;
  font-weight: $font-weight-boldest;
}

.title-direction {
  color: gray;
  font-size: $font-size-sm;
  font-weight: $font-weight-light;
}

.guest {
  height: 100vh;
}

.group {
  height: 100%;
  overflow: auto;
  flex: 1 1 425px;
}

.auth-image {
  background-image: url('~@/assets/images/auth_image.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  flex: 1 1 50%;
}
</style>
