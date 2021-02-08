<template>
  <div class="bg-white">
    <b-card-group deck>
      <div v-for="(card, index) in cards" :key="index">
        <b-card no-body class="overflow-hidden card m-3" @click="to(card.id)">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="card.image"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="card.title">
                <b-card-text>
                  {{ card.text }}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    cards: {
      type: Array[Object],
      required: true,
    },
    resourceName: {
      type: String,
      required: true,
    },
  },

  methods: {
    to(id) {
      this.$router.push(`/${this.resourceName}/${id}`)
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  transition: all 0.2s linear;
  box-shadow: 0 0 5px darkgrey;
  border: none;
  cursor: pointer;
  max-width: 26.5rem;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &:hover {
    transform: scale(1.05, 1.05);
  }
}
</style>
