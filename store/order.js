import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  list: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL({ commit }) {
    commit('CLEAR')
    const response = await this.$axios.get('/orders/')
    commit('SET_PAGINATION_META', response.headers)
    commit('SET', response.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/orders/${objectId}`).then((response) => {
      commit('SET', response)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`/orders/${object.id}`, { order: object })
      .then((response) => {
        commit('UPDATE', response)
      })
  },

  REMOVE({ commit }, object) {
    return this.$axios
      .$delete(`/orders/delete/${object.id}`)
      .then((response) => {
        commit('REMOVE', object)
      })
  },
}
