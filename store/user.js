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
        const id = response.data.id
        this.$auth.setUser(user)
        localStorage.setItem('userId', id)
        this.$router.push({ path: '/my_orders' })
      })
  },

  SIGN_UP(commit, { name, email, phone, password, role }) {
    return this.$axios
      .post('/auth/sign-up', { name, email, phone, password, role })
      .then((response) => {
        this.$router.push({ path: '/sign-in' })
      })
  },

  RESET_PASSWORD({ email }) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$post('/user/password', config, { email })
  },

  async GET_ALL({ commit }) {
    commit('CLEAR')
    const response = await this.$axios.get('/users')
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
      .$put(`/users/${object.id}`, config, { user: object })
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
