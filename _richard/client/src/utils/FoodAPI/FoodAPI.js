import axios from 'axios'

const ItemAPI = {
  getItems: () => axios.get('/api/food'),
  createItem: (item) => axios.post('/api/food', item),
  updateItem: (id, updates) => axios.put(`/api/food/${id}`, updates),
  deleteItem: (id) => axios.delete(`/api/food/${id}`),
}

export default ItemAPI
