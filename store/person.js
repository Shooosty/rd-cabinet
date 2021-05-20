import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  personId: '',
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const response = await this.$axios.get('/persons/', params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_BY_ORDER_ID({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`/orders/${objectId}/persons`)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET_ITEMS', response.data.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/persons/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_ITEMS', response.data)
    })
  },

  CREATE({ commit }, object) {
    return this.$axios.$post('/persons/', object).then((response) => {
      commit('SET_PERSON_ID', response.id)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`/persons/${object.ID}`, object)
      .then((response) => {
        commit('CREATE_OR_UPDATE_ITEMS', response)
      })
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`/persons/${id}`).then(() => {
      commit('DELETE')
    })
  },
}
