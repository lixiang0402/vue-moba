const http = require("axios").create({
    baseURL: 'http://localhost:3000/web/api',
});

export default http