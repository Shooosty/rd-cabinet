<template>
  <div class="bg-white">
    <b-card-group deck>
      <div v-for="(card, index) in cards" :key="index">
        <b-card no-body class="overflow-hidden card m-3" @click="to(card.ID)">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                src="~@/assets/images/cover.jpg"
                fluid
                class="rounded-0 h-100"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body class="text-center" title="Фотоальбом">
                <b-card-text class="text-left p-2">
                  <div>
                    <span>
                      <fa :icon="['fas', `bookmark`]" />
                    </span>
                    <span class="ml-2" v-text="`№ ${card.number}`" />
                  </div>
                  <div class="mt-2">
                    <span>
                      <fa :icon="['fas', `camera`]" />
                    </span>
                    <span class="ml-2">
                      {{ parseDate(card.dateTimes[0]) }}
                    </span>
                  </div>
                  <div class="mt-2">
                    <span>
                      <fa :icon="['fas', `clock`]" />
                    </span>
                    <span class="ml-2">
                      {{ parseTime(card.dateTimes[0]) }}
                    </span>
                  </div>
                  <div class="mt-2">
                    <span>
                      <fa :icon="['fas', `info-circle`]" />
                    </span>
                    <span class="ml-2">
                      {{ localizeStatuses(card.status) }}
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
import localizeMixin from '~/mixins/localize-mixin'

export default {
  components: {},

  mixins: [localizeMixin],

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
      if (this.$auth.user.role === 'user') {
        this.$router.push(`/${this.resourceName}/${id}/edit`)
      } else {
        this.$router.push(`/${this.resourceName}/${id}`)
      }
    },

    parseDate(value) {
      if (value) {
        return this.$dayjs(value).format('DD.MM.YYYY')
      } else {
        return 'Дата формируется..'
      }
    },

    parseTime(value) {
      if (value) {
        return this.$dayjs(value).format('HH:mm')
      } else {
        return 'Время формируется..'
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
  max-width: 31rem;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &:hover {
    transform: scale(1.05, 1.05);
  }
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.5rem;
}
</style>
