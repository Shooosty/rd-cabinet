import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  POST_FILES({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)

    this.$axios
      .post(`/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        commit('CREATE_OR_UPDATE_PHOTOS', response.data)
      })
  },

  CLEAR_FILES({ commit }) {
    commit('CLEAR')
  },

  GET_FILES({ commit }, fileName) {
    this.$axios.post(`/files/download`, { fileName }).then((response) => {
      commit('SET_ITEMS', response.data)
    })
  },
}
