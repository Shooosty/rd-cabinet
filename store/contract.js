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
      .post(`api/contracts/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        commit('CREATE_OR_UPDATE_CONTRACTS', response.data)
      })
  },

  CLEAR({ commit }) {
    commit('CLEAR')
  },
}
