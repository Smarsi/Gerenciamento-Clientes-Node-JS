const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;


require('./database/index');
const Customer = require('./models/Customer');

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
