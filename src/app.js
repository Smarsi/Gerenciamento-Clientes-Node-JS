const express = require('express');
const router = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('../docs/swagger.json');

const error_handler_middleware = require('./middlewares/error_handler_middleware');

const app = express();

app.use(express.json());
app.use('/api', router);

//Middlewares globais para API
app.use(error_handler_middleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

module.exports = app;