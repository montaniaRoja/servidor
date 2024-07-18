const express = require('express');
const sitioController = require('../controllers/sitios');
const upload = require('../libs/audiostorage'); // Ajusta la ruta si es necesario

module.exports = (app) => {
    app.post('/api/sitio/create', upload, sitioController.create);
    app.get('/api/sitio/list', sitioController.list);
    app.get('/api/sitio/:id', sitioController.find);
    app.patch('/api/sitio/:id', sitioController.update);
    app.delete('/api/sitio/:id', sitioController.delete);
};
