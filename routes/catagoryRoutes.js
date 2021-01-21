const router = require('express').Router()
const { Catagory } = require('../models')

router.get('/catagories', (req, res) => {
  Catagory.find()
    .then((catagories) => res.json(catagories))
    .catch((err) => console.log(err))
})

router.post('/catagories', (req, res) => {
  Catagory.create(req.body)
    .then((catagories) => res.json(catagories))
    .catch((err) => console.log(err))
})

router.put('/catagories/:id', (req, res) => {
  Catagory.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err))
})

router.delete('/catagories/:id', (req, res) => {
  Catagory.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err))
})

module.exports = router
