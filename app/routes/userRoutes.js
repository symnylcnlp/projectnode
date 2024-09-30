const router = require('express').Router()
const usersController= require('../controllers/usersController.js')
router.post('/api/users/create', usersController.create)
router.get('/api/users', usersController.findAll)
router.get('/api/users/:id', usersController.findOne)
router.put('/api/users/edit/:id', usersController.update)
router.delete('/api/users/delete/:id', usersController.delete)

module.exports = router