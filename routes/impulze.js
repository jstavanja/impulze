const express = require('express')
const router = express()

const Impulze = require('../models/Impulze')

// @route GET /api/impulze/
// @desc GET all Impulzes
// @access public
router.get('/', (req, res) => {
  Impulze.find()
    .sort({name: 1})
    .then((impulzes) => {
      res.json(impulzes)
    })
})

// @route POST /api/impulze/
// @desc CREATE an Impulze
// @access public
router.post('/', (req, res) => {
  const newImpulze = new Impulze({
    name: req.body.name,
    description: req.body.description,
    period: req.body.period
  })

  newImpulze.save()
    .then(item => res.json(item))
})

// @route DELETE /api/impulze/
// @desc DELETE an Impulze
// @access public
router.delete('/:id', (req, res) => {
  Impulze.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({success: true}))
    .catch((err) => res.status(404).json({success: false, error: err}))
})

module.exports = router