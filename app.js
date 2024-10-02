const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const ejs = require('ejs')
const sequelize = require('sequelize')
const axios = require('axios')
const con = require('./app/config/db.js')
var mysql2 = require('mysql2')
const session = require('express-session')
const userRoutes = require('./app/routes/userRoutes.js')
const servicesRoutes = require('./app/routes/servicesRoutes.js')
const { isAuthenticated, login } = require('./app/middleware/auth.js')
const model = require('./app/models/usersModel.js')
const app = express()
app.use(cors());
app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({limit:'30mb', extended:true}))
app.use(express.static('public'))
app.use(userRoutes)
app.use(session({
    secret: 'deneme-admin',
    resave: false,
    saveUninitialized: true
}))

app.use(servicesRoutes)
app.set('view engine', 'ejs');
app.get('/', (req,res) => res.render('index'))
app.get('/hakkimizda', (req,res) => res.render('hakkimizda'))
app.get('/login', (req,res) => res.render('login'))
app.post('/login', login)
app.get('/admin', isAuthenticated, (req,res) => res.render('admin', { username: req.session.user.username }))
app.get('/services/:slug', async (req, res) => {
    try {
        const { slug } = req.params
        const { data: services } = await axios.get('http://localhost:3000/api/services')

        const service = services.find(s => createSlug(s.title) === slug)

        if (service) {
            res.render('services', { service })
        } else {
            res.status(404).send('Hizmet bulunamadı')
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Bir hata oluştu: ' + error.message)
    }
})

const createSlug = text => text
    .trim()
    .toLowerCase()
    .replace(/[ö]/g, 'o')
    .replace(/[ğ]/g, 'g')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ç]/g, 'c')
    .replace(/ /g, '-')
    .replace(/[ü]/g, 'u')
    .replace(/[^\w-]+/g, '')

const port = process.env.port || 3000;
app.listen(port, () => console.log('server ayakta') )