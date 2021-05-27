import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  SIGN_IN({ commit }, object) {
    return this.$auth
      .loginWith('local', {
        data: { email: object.email, password: object.password },
      })
      .then((response) => {
        const user = response.data.user
        this.$auth.setUser(user)
        if (user.role === 'user') {
          this.$router.push({ path: 'api/my_orders' })
        }
      })
  },

  SIGN_UP({ commit }, object) {
    return this.$axios.post('auth/sign-up', {
      name: object.name,
      email: object.email,
      role: object.role,
      password: object.password,
      phone: `+7${object.phone}`,
    })
  },

  SIGN_UP_EMPLOYEE({ commit }, object) {
    return this.$axios.post('api/users/sign-up-employee', {
      name: object.name,
      email: object.email,
      role: object.role,
      phone: `+7${object.phone}`,
    })
  },

  RESET_PASSWORD({ commit }, email) {
    return this.$axios.$post('auth/reset-password', { email })
  },

  CHANGE_PASSWORD({ commit }, object) {
    return this.$axios
      .$put(`api/users/${object.ID}/change-password`, object)
      .then((response) => {
        commit('CREATE_OR_UPDATE_ITEMS', response)
      })
  },

  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const response = await this.$axios.get('api/users/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`api/users/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`api/users/${object.ID}`, {
        name: object.name,
        phone: `+7${object.phone}`,
      })
      .then((response) => {
        commit('CREATE_OR_UPDATE_ITEMS', response)
      })
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`api/users/${id}`).then(() => {
      commit('DELETE')
    })
  },
}
