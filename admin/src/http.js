const axios = require('axios')
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
});

module.exports = http