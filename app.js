const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const Sequelize = require('sequelize');
const routes = require('./routes/routes'); // Ajusta la ruta si es necesario

// Configurar la aplicación express
const app = express();
app.use(cors());

// Registrar las solicitudes en la consola.
app.use(logger('dev'));

// Analizar los cuerpos de las solicitudes entrantes
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de la base de datos
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
     host: dbConfig.host,
     dialect: dbConfig.dialect,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Usar las rutas definidas en routes.js
routes(app);

// Configurar una ruta por defecto que envíe un mensaje de bienvenida en formato JSON.
app.get('*', (req, res) => res.status(200).send({
     message: 'Welcome to the beginning of nothingness.',
}));

// Configuración del puerto
const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log(`Server is listening on port ${port}`);
module.exports = app;
