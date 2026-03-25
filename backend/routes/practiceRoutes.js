const express = require('express')
const router = express.Router()
const practiceController = require('../controllers/practiceController')

// GET
router.get('/pratiche', practiceController.getPractices)

// POST
router.post('/pratiche', practiceController.createPractice)

// UPDATE pratica
router.put('/pratiche/:id', practiceController.updatePractice);

// DELETE pratica
router.delete('/pratiche/:id', practiceController.deletePractice);

module.exports = router