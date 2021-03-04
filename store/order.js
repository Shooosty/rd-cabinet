import local from '@nuxtjs/auth/lib/schemes/local'
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth._token.local')}`,
      },
    }
    const response = await this.$axios.get('/orders/', config)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET', response.data)
  },

  GET({ commit }, objectId) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$get(`/orders/${objectId}`, config).then((response) => {
      commit('SET', response)
    })
  },

  UPDATE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$put(`/orders/${object.id}`, config, { order: object })
      .then((response) => {
        commit('ADD_OR_UPDATE', response)
      })
  },

  REMOVE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$delete(`/orders/delete/${object.id}`, config)
      .then((response) => {
        commit('REMOVE', object)
      })
  },
}
