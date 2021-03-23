import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  item: {},
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
        this.$router.push({ path: '/my_orders' })
      })
  },

  SIGN_UP({ commit }, object) {
    return this.$axios.post('/auth/sign-up', {
      name: object.name,
      email: object.email,
      role: object.role,
      password: object.password,
      phone: object.phone,
    })
  },

  RESET_PASSWORD({ commit }, email) {
    return this.$axios.$post('/auth/reset_password', { email })
  },

  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const response = await this.$axios.get('/users/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/users/${objectId}`).then((response) => {
      commit('SET_ITEM', response.data)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios.$put(`/users/${object.id}`, object).then((response) => {
      commit('UPDATE', response)
    })
  },

  DELETE({ commit }, object) {
    return this.$axios.$delete(`/users/${object.id}`).then((response) => {
      commit('DELETE', object)
    })
  },
}
