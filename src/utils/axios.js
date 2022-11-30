const axios = require('axios')

const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:5000/api"
})

module.exports = instance