const axios = require('axios')
const { createSlug } = require('../utils/slug')

const API_URL = 'http://localhost:3000/api/services'

const getServices = async () => (await axios.get(API_URL)).data

const renderService = async (req, res) => {
    try {
        const services = await getServices()
        const service = services.find(s => createSlug(s.title) === req.params.slug)
        service ? res.render('services', { service }) : res.status(404).send('Hizmet bulunamadı')
    } catch (error) {
        console.error(error)
        res.status(500).send('Bir hata oluştu: ' + error.message)
    }
}


module.exports = { renderService }
