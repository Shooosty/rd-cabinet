import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  list: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    const response = await this.$axios.get('/users/all', config, params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET', response)
  },

  GET({ commit }, objectId) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$get(`/users/${objectId}`, config).then((response) => {
      commit('SET', response)
    })
  },

  UPDATE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$put(`/users/update/${object.id}`, config, { user: object })
      .then((response) => {
        commit('ADD_OR_UPDATE', response)
      })
  },

  REMOVE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$delete(`/users/delete/${object.id}`, config)
      .then((response) => {
        commit('REMOVE', object)
      })
  },
}
