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
    const response = await this.$axios.get('api/orders/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`api/orders/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  async GET_ALL_FOR_USER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`api/users/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_FOR_PHOTOGRAPHER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(
      `api/photographers/${objectId}/orders`
    )
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_FOR_DESIGNER({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`api/designers/${objectId}/orders`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  CREATE({ commit }, object) {
    return this.$axios.$post('api/orders/', object).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`api/orders/${object.ID}`, object)
      .then((response) => {
        commit('CREATE_OR_UPDATE_ITEMS', response)
      })
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`api/orders/${id}`).then(() => {
      commit('DELETE')
    })
  },
}
