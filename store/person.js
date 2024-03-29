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
    const response = await this.$axios.get('api/persons/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_BY_ORDER_ID({ commit }, objectId) {
    const response = await this.$axios.get(`api/orders/${objectId}/persons`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`api/persons/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  CREATE({ commit }, object) {
    return this.$axios.$post('api/persons/', object).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`api/persons/${object.ID}`, object)
      .then((response) => {
        commit('CREATE_OR_UPDATE_ITEMS', response)
      })
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`api/persons/${id}`).then(() => {
      commit('DELETE')
    })
  },
}
