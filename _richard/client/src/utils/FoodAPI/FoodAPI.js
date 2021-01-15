import axios from 'axios'

const FoodAPI = {
  getFood: () => axios.get('/api/food'),
  createFood: (food) => axios.post('/api/food', food),
  updateFood: (id, updates) => axios.put(`/api/food/${id}`, updates),
  deleteFood: (id) => axios.delete(`/api/food/${id}`),
}

export default FoodAPI
