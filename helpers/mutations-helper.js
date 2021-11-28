export default {
  SET_ITEMS(state, data) {
    state.items = data
  },

  CLEAR(state) {
    state.items = []
    state.file = ''
    state.pagination = {}
  },

  SET_ORDER_ID(state, data) {
    state.orderId = data.id
  },

  CLEAR_ORDER_ID(state) {
    state.orderId = ''
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
    }
  },

  CREATE_OR_UPDATE_PHOTOS(state, data) {
    let isUpdate = false
    let items = []
    items = state.items.map((item) => {
      if (item.ID === data.id) {
        item = Object.assign({}, data)
        isUpdate = true
      }
      return item
    })

    if (isUpdate) {
      state.items = items
      return
    }

    state.items.push(data)
  },

  CREATE_FILE(state, data) {
    state.file = data
  },

  CLEAR_FILE(state) {
    state.file = ''
  },

  SET_PAGINATION_META(state, headers) {
    state.pagination = {
      page: parseInt(headers['x-page']),
      perPage: parseInt(headers['x-per-page']),
      total: parseInt(headers['x-total']),
      totalPages: parseInt(headers['x-total-pages']),
    }
  },

  SET_PROGRESS(state, data) {
    state.progress = data
  },

  CLEAR_PROGRESS(state) {
    state.progress = null
  },

  DELETE(state, data) {
    const index = state.items.findIndex((item) => item.ID === data.ID)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  },
}
