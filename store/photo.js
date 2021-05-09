import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  // async GET_PHOTOS({ commit }, id) {
  //   let attachment = null
  //   await this.$axios
  //     .get(`/files/${id}/original`)
  //     .then((response) => {
  //       response.data.data.size = (response.data.data.size / 1024).toFixed(2)
  //       attachment = response.data.data
  //       commit('ADD_OR_UPDATE', response.data.data)
  //     })
  //     .catch((error) => error.data)
  //   return attachment
  // },

  POST_PHOTOS({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)

    return this.$axios
      .$post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data.url)
  },
}
