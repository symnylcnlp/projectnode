const router = require('express').Router()
const { isAuthenticated, login } = require('../middleware/auth.js')
const { renderService } = require('../controllers/controllers.js')
router.get('/', (req,res) => res.render('index'))
router.get('/hakkimizda', (req,res) => res.render('hakkimizda'))
router.get('/login', (req,res) => res.render('login'))
router.post('/login', login)
router.get('/admin', isAuthenticated, (req,res) => res.render('admin', { username: req.cookies.username }))
router.get('/services/:slug', renderService )
    module.exports= router