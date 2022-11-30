const client = require('../utils/axios')

exports.sendEmail = (data) => client.post('/send-email', data)