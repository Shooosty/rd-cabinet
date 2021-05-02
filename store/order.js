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
    const order = {
      owner: object.owner,
      status: object.status,
      contract: object.contract,
      photographer_id: object.photographerId.ID,
      designer_id: object.designerId.ID,
      address: object.address,
      user_id: object.userId.ID,
      datetime: object.datetime,
      description: object.description,
    }
    return this.$axios.$post('/orders/', order).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios.$put(`/orders/${object.id}`, object).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response)
    })
  },

  DELETE({ commit }, object) {
    return this.$axios.$delete(`/orders/${object.id}`).then((response) => {
      commit('DELETE', object)
    })
  },
}
