export default {
  SET_ITEMS(state, data) {
    state.items = data
  },

  SET_ITEM(state, data) {
    state.item = data
  },

  CLEAR(state) {
    state.items = []
    state.item = {}
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

  CREATE(state, data) {
    state.item = data
  },

  UPDATE(state, data) {
    state.item = data
  },

  DELETE(state) {
    state.item = {}
  },
}
