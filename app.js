const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/routes'); // Ajusta la ruta si es necesario

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Usar las rutas definidas en routes.js
routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
     message: 'Welcome to the beginning of nothingness.',
}));

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;
