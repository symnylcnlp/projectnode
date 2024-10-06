const axios = require('axios')
const cookie = require('cookie')

const API_URL = 'http://localhost:3000/api/users'

const getUsers = async () => (await axios.get(API_URL)).data

const isAuthenticated = async (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const username = cookies.username

    if (username) {
        const users = await getUsers()
        const user = users.find(u => u.username === username)

        if (user) return next()
    }
    res.redirect('/login')
}

const login = async (req, res) => {
    const users = await getUsers()
    const user = users.find(u => u.username === req.body.username)

    if (user && user.password === req.body.password) {
        res.setHeader('Set-Cookie', cookie.serialize('username', user.username, {
            httpOnly: true,
            maxAge: 60 * 60 
        }))
        return res.redirect('/admin')
    }
    res.redirect('/login')
}

module.exports = { isAuthenticated, login }
