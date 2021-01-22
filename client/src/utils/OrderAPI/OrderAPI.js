import axios from 'axios'

const OrderAPI = {
  getOrders: () => axios.get('/api/orders'),
}

export default OrderAPI
