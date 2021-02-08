<template>
  <div class="container d-flex align-items-stretch">
    <div class="shadow-lg bg-white">
      <div class="pl-3">
        <div class="logo">
          <div class="d-flex flex-column ml-2">
            <span class="title-name">RHINODESIGN</span>
            <span class="title-direction">My Cabinet</span>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="d-none d-md-block auth-image"></div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.content {
  width: 320px;
}

.title-name {
  color: gray;
  font-size: $font-size-md;
  font-weight: $font-weight-boldest;
}

.title-direction {
  color: gray;
  font-size: $font-size-md;
  font-weight: $font-weight-boldest;
}

.container {
  height: 100vh;
}

.group {
  border-radius: 0 16px 16px 0;
  height: 100%;
  overflow: auto;
  flex: 1 0 410px;
}

.auth-image {
  background-image: url('~@/assets/images/auth_image.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  flex: 0 0 63%;
}
</style>
