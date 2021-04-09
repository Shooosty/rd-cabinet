<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button
        v-b-toggle.accordion-1
        class="photo-container-button"
      ></b-button>
    </b-card-header>
    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <b-card-text>test</b-card-text>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {}
</script>

<style scoped>
.photo-container-button {
  width: 100%;
}
</style>
