export default {
  computed: {
    clients() {
      return this.users.filter((users) => users.role === 'user')
    },

    managers() {
      return this.users.filter((users) => users.role === 'admin')
    },

    photographers() {
      return this.users.filter((users) => users.role === 'photographer')
    },

    designers() {
      return this.users.filter((users) => users.role === 'designer')
    },
  },
}
