const Impulze = require('../models/Impulze')

// @route GET /api/impulze/
// @desc GET all Impulzes
// @access public
const index = (req, res) => {
  return Impulze.find({ _author: req.auth.user._id })
    .sort({name: 1})
    .then((impulzes) => res.json(impulzes))
    .catch(err => res.status(500).json({success: false, error: err}))
}

// @route POST /api/impulze/
// @desc CREATE an Impulze
// @access public
const store = (req, res) => {
  const newImpulze = new Impulze({
    name: req.body.name,
    description: req.body.description,
    period: req.body.period,
    _author: req.auth.user._id
  })

  return newImpulze.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({success: false, error: err}))
}

// @route DELETE /api/impulze/
// @desc DELETE an Impulze
// @access public
const remove = (req, res) => {
  return Impulze.findOne({ _id: req.params.id, _author: req.auth.user._id })
    .then((item) => item.remove())
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false, error: err}))
}

module.exports = {
  index, store, remove
}