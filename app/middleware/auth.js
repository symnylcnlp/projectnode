const axios = require('axios')
const API_URL = 'http://localhost:3000/api/users'

async function getUsers() {
    const response = await axios.get(API_URL)
    return response.data
}

async function isAuthenticated(req, res, next) {
  if (req.session.user) return next()

  const users = await getUsers()
  const user = users.find(u => u.username === req.body.username)

  if (user && user.password === req.body.password) {
      req.session.user = user
      return next()
  }
  res.redirect('/login')
}

async function login(req, res) {
  const users = await getUsers()
  const user = users.find(u => u.username === req.body.username)

  if (user && user.password === req.body.password) { 
      req.session.user = user
      res.redirect('/admin')
  } else {
      res.redirect('/login')
  }
}

module.exports = {
  isAuthenticated,
  login
}
