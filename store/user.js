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
    return this.$axios.$post('/user/password', { email })
  },

  async GET_ALL({ commit }) {
    commit('CLEAR')
    const response = await this.$axios.get('/users/')
    commit('SET_PAGINATION_META', response.headers)
    commit('SET', response.data)
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`/users/${objectId}`).then((response) => {
      commit('SET', response)
    })
  },

  UPDATE({ commit }, object) {
    return this.$axios
      .$put(`/users/${object.id}`, { user: object })
      .then((response) => {
        commit('ADD_OR_UPDATE', response)
      })
  },

  REMOVE({ commit }, object) {
    return this.$axios
      .$delete(`/users/delete/${object.id}`)
      .then((response) => {
        commit('REMOVE', object)
      })
  },
}
