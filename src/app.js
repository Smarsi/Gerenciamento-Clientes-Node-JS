const express = require('express');
const router = require('./routes');
const fs = require("fs");
const YAML = require('yaml');

const swaggerUi = require('swagger-ui-express');
const swaggerYaml = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerYaml);

const error_handler_middleware = require('./middlewares/error_handler_middleware');

const app = express();

app.use(express.json());
app.use('/api', router);

//Middlewares globais para API
app.use(error_handler_middleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;