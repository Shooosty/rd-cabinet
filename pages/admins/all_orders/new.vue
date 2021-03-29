<template>
  <div v-show="$isAllowed('viewSidebarMenuItemForAdmin')">
    <page-header card-title="Все заказы" :actions="actions" />
    <div class="mt-3 card-body bg-white">
      <div class="d-flex">
        <div>
          <b-form-input v-model="address" placeholder="Введите адрес" />
        </div>
        <div>
          <label>Select with search</label>
          <Multiselect
            v-model="newOrder.userId"
            options="options"
            placeholder="Select one"
            label="name"
            track-by="name"
          />
        </div>
      </div>
      <div class="mt-5">
        <b-container :fluid="true">
          <b-form-textarea
            id="textarea"
            placeholder="Поле для заметок.."
            rows="3"
            max-rows="8"
          />
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import PageHeader from '~/components/Pages/Card/PageHeader'
import SidebarMenuPerimeter from '~/perimeters/sidebarMenuPerimeter'

export default {
  components: { PageHeader, Multiselect },

  perimeters: [SidebarMenuPerimeter],

  data() {
    return {
      newOrder: {
        owner: 'photographer',
        number: null,
        status: 'new',
        photos: [],
        contract: '',
        docs: '',
        objectType: '',
        address: '',
        userId: '',
        date: '',
        description: '',
      },

      actions: [
        {
          label: 'Сохранить',
          btnClass: 'success',
          to: '/admins/all_orders/new',
          icon: 'save',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.card-body {
  border-radius: 5px;
}
</style>
