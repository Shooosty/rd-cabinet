export default {
  ADD(state, data) {
    state.list.push(data)
  },

  SET(state, data) {
    state.list = data
  },

  CLEAR(state) {
    state.list = []
    state.pagination = {}
  },

  SET_PAGINATION_META(state, headers) {
    state.pagination = {
      page: parseInt(headers['x-page']),
      perPage: parseInt(headers['x-per-page']),
      total: parseInt(headers['x-total']),
      totalPages: parseInt(headers['x-total-pages']),
    }
  },

  REMOVE(state, data) {
    const index = state.list.findIndex((item) => item.id === data.id)
    state.list.splice(index, 1)
  },

  SORT_BY_PROP(state, prop) {
    state.list.sort((a, b) => a[prop] - b[prop])
  },
}
