export default {
  items: (state) => state.items,
  file: (state) => state.file,
  personId: (state) => state.personId,
  itemById: (state) => (id) => {
    return state.items.find((r) => r.ID === id)
  },
  pagination: (state) => state.pagination,
}
