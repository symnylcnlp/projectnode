const router = require('express').Router()
const servicesController= require('../controllers/servicesController.js')
router.post('/api/services/create', servicesController.create)
router.get('/api/services', servicesController.findAll)
router.get('/api/services/:id', servicesController.findOne)
router.put('/api/services/edit/:id', servicesController.update)
router.delete('/api/services/delete/:id', servicesController.delete)

module.exports = router