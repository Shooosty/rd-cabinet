export default {
  SET_ITEMS(state, data) {
    state.items = data
  },

  CLEAR(state) {
    state.items = []
    state.pagination = {}
  },

  SET_PERSON_ID(state, data) {
    state.personId = data
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

  SET_PAGINATION_META(state, headers) {
    state.pagination = {
      page: parseInt(headers['x-page']),
      perPage: parseInt(headers['x-per-page']),
      total: parseInt(headers['x-total']),
      totalPages: parseInt(headers['x-total-pages']),
    }
  },

  DELETE(state) {
    state.item = {}
  },
}
