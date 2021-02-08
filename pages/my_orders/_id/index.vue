<template>
  <page-card-detail
    :tabs="tabs"
    :actions="actions"
    is-order-page
    card-title="Заказ №1"
  />
</template>

<script>
import PageCardDetail from '~/components/Pages/Card/PageCardDetail'

export default {
  components: { PageCardDetail },

  data() {
    return {
      actions: [
        { label: 'Оплатить', to: '#', icon: 'money-bill-wave' },
        {
          label: 'Отменить',
          btnClass: 'danger',
          to: '#',
          icon: 'window-close',
        },
      ],
    }
  },
}
</script>
