const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookie = require('cookie-parser')
const userRoutes = require('./app/routes/userRoutes.js')
const servicesRoutes = require('./app/routes/servicesRoutes.js')
const routes = require('./app/routes/routes.js')
const model = require('./app/models/usersModel.js')
const app = express()
app.use(cors());
app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({limit:'30mb', extended:true}))
app.use(express.static('public'))
app.use(cookie())
app.use(userRoutes)
app.use(servicesRoutes)
app.set('view engine', 'ejs');
app.use(routes)

const port = process.env.port || 3000;
app.listen(port, () => console.log('server ayakta') )