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
  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const response = await this.$axios.get('/orders/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/orders/${objectId}`).then((response) => {
      commit('SET_ITEM', response.data)
    })
  },

  async GET_ALL_FOR_USER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`/users/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data)
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`/orders/${object.id}`, { order: object })
      .then((response) => {
        commit('UPDATE', response.data)
      })
  },

  DELETE({ commit }, object) {
    return this.$axios.$delete(`/orders/${object.id}`).then((response) => {
      commit('DELETE', object)
    })
  },
}
