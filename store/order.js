import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const response = await this.$axios.get('/orders/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/orders/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  async GET_ALL_FOR_USER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`/users/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_FOR_PHOTOGRAPHER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`/photographers/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_FOR_DESIGNER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`/designers/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  CREATE({ commit }, object) {
    return this.$axios.$post('/orders/', object).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios.$put(`/orders/${object.ID}`, object).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response)
    })
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`/orders/${id}`).then(() => {
      commit('DELETE')
    })
  },
}
