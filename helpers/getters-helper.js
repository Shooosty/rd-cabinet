export default {
  items: (state) => state.items,
  file: (state) => state.file,
  orderId: (state) => state.orderId,
  itemById: (state) => (id) => {
    return state.items.find((r) => r.ID === id)
  },
  pagination: (state) => state.pagination,
}
