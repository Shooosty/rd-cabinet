import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL_BY_PERSON_ID({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`api/persons/${objectId}/photos`)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_BY_ORDER_ID({ commit }, objectId) {
    commit('CLEAR')
    const response = await this.$axios.get(`api/orders/${objectId}/photos`)
    commit('SET_ITEMS', response.data.data)
  },

  CREATE({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file.file)
    this.$axios
      .post(`api/photos/${file.personId}/${file.orderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        commit('CREATE_OR_UPDATE_PHOTOS', response.data)
      })
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`api/photos/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_PHOTOS', response.data)
    })
  },

  CLEAR({ commit }) {
    commit('CLEAR')
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`api/photos/${id}`)
  },
}
