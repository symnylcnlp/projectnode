const express = require('express')
const axios = require('axios')
const router = express.Router()


router.get('/login', (req, res) => res.render('login'))
router.get('/admin', (req, res) => res.render('admin'))


router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const { data: users } = await axios.get('http://localhost:3000/api/users')


    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      req.user = user 
      res.redirect('/admin')
    } else {
      res.render('login', { message: 'Kullanıcı adı veya şifre hatalı!' })
    }
  } catch (error) {
    console.error('API Hatası:', error)
    res.render('login', { message: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
  }
})

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
      return res.redirect('/login');
  }
  next();
};


router.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin');
});

module.exports = router
