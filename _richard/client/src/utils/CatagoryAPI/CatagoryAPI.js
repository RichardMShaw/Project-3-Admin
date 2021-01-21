import axios from 'axios'

const CatagoryAPI = {
  getCatagories: () => axios.get('/api/catagories'),
  createCatagory: (catagory) => axios.post('/api/catagories', catagory),
  updateCatagory: (id, updates) => axios.put(`/api/catagories/${id}`, updates),
  deleteCatagory: (id) => axios.delete(`/api/catagories/${id}`),
}

export default CatagoryAPI
