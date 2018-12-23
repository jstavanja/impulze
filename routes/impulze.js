const express = require('express')
const router = express()

const Impulze = require('../models/Impulze')

const impulzeController = require('../controllers/impulzeController')

// @route GET /api/impulze/
// @desc GET all Impulzes
// @access public
router.get('/', impulzeController.index)
router.post('/', impulzeController.store)
router.delete('/:id', impulzeController.remove)

module.exports = router