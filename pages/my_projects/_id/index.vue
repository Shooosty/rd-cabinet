<template>
  <page-card-detail
    :tabs="tabs"
    :actions="actions"
    is-project-page
    card-title="Проект №1"
  />
</template>

<script>
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'

export default {
  components: { PageCardDetail },

  data() {
    return {
      actions: [
        {
          label: 'Оформить заказ',
          btnClass: 'success',
          to: '#',
          icon: 'cart-arrow-down',
        },
        {
          label: 'Редактировать',
          btnClass: 'secondary',
          to: '#',
          icon: 'edit',
        },
        { label: 'Удалить проект', btnClass: 'danger', to: '#', icon: 'trash' },
      ],
    }
  },
}
</script>
