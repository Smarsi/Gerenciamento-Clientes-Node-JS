const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.sendFile(process.cwd() + "/docs/index.html");
});

router.get('/swagger', (request, response) => {
    return response.sendFile(process.cwd() + "/docs/swagger.yaml");
});

module.exports = router;