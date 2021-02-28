export default {
  all: (state) => state.list,
  pagination: (state) => state.pagination,
  getById: (state) => (id) => {
    return state.list.find((resource) => resource.id === id)
  },
}
