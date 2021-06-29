import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  CREATE({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    this.$axios
      .post(`api/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        commit('CREATE_OR_UPDATE_FILES', response.data)
      })
  },

  CLEAR({ commit }) {
    commit('CLEAR')
  },

  DELETE_ALL({ commit }) {
    this.$axios.post(`api/s3/delete`)
    commit('CLEAR')
  },
}
