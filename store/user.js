import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  list: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  SIGN_IN(commit, { email, password }) {
    return this.$auth
      .loginWith('local', {
        data: { email, password },
      })
      .then((response) => {
        const user = response.data.user
        this.$auth.setUser(user)
        this.$router.push({ path: '/my_orders' })
      })
  },

  async GET_ALL({ commit }, params = {}) {
    commit('CLEAR')
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    const response = await this.$axios.get('/users/all', config, params)
    commit('SET_PAGINATION_META', response.headers)
    commit('SET', response.data)
  },

  GET({ commit }, objectId) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$get(`/user/${objectId}`, config).then((response) => {
      commit('ADD_OR_UPDATE', response.data)
    })
  },

  CREATE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$post('/user/new', config, { user: object })
      .then((response) => {
        commit('ADD_OR_UPDATE', response.data)
      })
  },

  UPDATE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$put(`/user/update/${object.id}`, config, { user: object })
      .then((response) => {
        commit('ADD_OR_UPDATE', response.data)
      })
  },

  REMOVE({ commit }, object) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios
      .$delete(`/user/delete/${object.id}`, config)
      .then((response) => {
        commit('REMOVE', object)
      })
  },

  RESET_PASSWORD({ email }) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$post('/user/password', config, { email })
  },
}
