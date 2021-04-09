<template>
  <div>
    <div>info</div>
    <div v-for="index in cards" :key="index" class="accordion" role="tablist">
      <CollapseCard />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <IconButton icon="plus" @click="addCard" />
    </div>
  </div>
</template>

<script>
import IconButton from '~/components/Button/IconButton'
import CollapseCard from '~/components/Layout/Collapse/CollapseCard'

export default {
  components: { IconButton, CollapseCard },

  data() {
    return {
      cards: [
        {
          position: 1,
          people: 'челоло челолоев',
          photos: [],
        },
      ],
    }
  },

  methods: {
    addCard() {
      this.cards.push({})
    },
  },
}
</script>

<!--<style scoped lang="scss">-->

<!--</style>-->
