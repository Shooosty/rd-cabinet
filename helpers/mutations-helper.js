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

  CREATE_OR_UPDATE_ITEMS(state, data) {
    let isUpdate = false
    let items = []
    items = state.items.map((item) => {
      if (item.ID === data.ID) {
        item = Object.assign({}, data)
        isUpdate = true
      }
      return item
    })

    if (isUpdate) {
      state.items = items
      return
    }

    state.list.push(data)
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
