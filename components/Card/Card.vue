<template>
  <div class="bg-white">
    <b-card-group deck>
      <div v-for="(card, index) in cards" :key="index">
        <b-card no-body class="overflow-hidden card m-3" @click="to(card.ID)">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                src="https://picsum.photos/400/400/?image=33"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Фотосессия">
                <b-card-text class="p-2">
                  <div>
                    <icon>
                      <fa :icon="['fas', `calendar`]" />
                    </icon>
                    <span class="ml-2">
                      {{ parseDate(card.datetime) }}
                    </span>
                  </div>
                  <div class="mt-2">
                    <icon>
                      <fa :icon="['fas', `clock`]" />
                    </icon>
                    <span class="ml-2">
                      {{ parseTime(card.datetime) }}
                    </span>
                  </div>
                  <div class="mt-2">
                    <icon>
                      <fa :icon="['fas', `info-circle`]" />
                    </icon>
                    <span class="ml-2">
                      {{ parseStatus(card.status) }}
                    </span>
                  </div>
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

    parseDate(date) {
      const dateValue = new Date(date)
      const month = dateValue.getMonth() + 1
      const day = dateValue.getDate()
      const year = dateValue.getFullYear()
      return day + '.' + month + '.' + year
    },

    parseTime(date) {
      const dateValue = new Date(date)
      const hour = dateValue.getHours()
      const minute = dateValue.getMinutes()
      return hour + ':' + minute
    },

    parseStatus(status) {
      switch (status) {
        case 'new':
          return 'новый'
        case 'active':
          return 'в работе'
        case 'close':
          return 'закрыт'
      }
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
