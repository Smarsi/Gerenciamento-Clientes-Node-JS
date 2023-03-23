const express = require('express');
const router = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('../docs/swagger.json');

const app = express();

app.use(express.json());
app.use('/api', router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

module.exports = app;