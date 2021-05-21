export default {
  methods: {
    localizeOwners(owner) {
      switch (owner) {
        case 'photographer':
          return 'Фотограф'
        case 'manager':
          return 'Менеджер'
        case 'designer':
          return 'Дизайнер'
      }
    },

    localizeStatuses(status) {
      switch (status) {
        case 'active':
          return 'Активный'
        case 'closed':
          return 'Закрыт'
        case 'inDesign':
          return 'На дизайне'
        case 'inPrint':
          return 'В печати'
        case 'new':
          return 'Новый'
      }
    },

    localizeRoles(role) {
      switch (role) {
        case 'superadmin':
          return 'Администратор'
        case 'admin':
          return 'Менеджер'
        case 'user':
          return 'Клиент'
        case 'photographer':
          return 'Фотограф'
        case 'designer':
          return 'Дизайнер'
      }
    },
  },
}
