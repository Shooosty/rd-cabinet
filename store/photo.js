import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const state = () => ({
  items: [],
  progress: null,
  pagination: {},
})

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  async GET_ALL_BY_PERSON_ID({ commit }, objectId) {
    const response = await this.$axios.get(`api/persons/${objectId}/photos`)
    commit('SET_ITEMS', response.data.data)
  },

  async GET_ALL_BY_ORDER_ID({ commit }, objectId) {
    const response = await this.$axios.get(`api/orders/${objectId}/photos`)
    commit('SET_ITEMS', response.data.data)
  },

  async CREATE({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file.file)
    await this.$axios
      .post(
        `api/photos/${file.personId}/${file.orderId}/${file.fileName}`,
        formData,
        {
          onUploadProgress(progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            commit('SET_PROGRESS', percentCompleted)
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        commit('CREATE_OR_UPDATE_PHOTOS', response.data)
        commit('CLEAR_PROGRESS')
      })
  },

  DELETE_ON_S3({ commit }, name) {
    this.$axios.post(`api/files/${name}`)
    commit('CLEAR')
  },

  GET({ commit }, objectId) {
    return this.$axios.$get(`api/photos/${objectId}`).then((response) => {
      commit('CREATE_OR_UPDATE_PHOTOS', response.data)
    })
  },

  CLEAR_PROGRESS({ commit }) {
    commit('CLEAR_PROGRESS')
  },

  CLEAR({ commit }) {
    commit('CLEAR')
  },

  DELETE({ commit }, id) {
    return this.$axios.$delete(`api/photos/${id}`)
  },
}
