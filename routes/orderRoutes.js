const router = require('express').Router()
const { Order } = require('../models')

router.get('/orders', (req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => console.log(err))
})
module.exports = router
