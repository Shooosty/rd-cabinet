import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  file: '',
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  CREATE({ commit }, file) {
    commit('CLEAR')
    const formData = new FormData()
    formData.append('file', file)
    this.$axios
      .post(`api/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        commit('CREATE_FILE', response.data.url)
      })
  },

  CLEAR({ commit }) {
    commit('CLEAR_FILE')
  },
}
