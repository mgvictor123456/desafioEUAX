const express = require('express');
const routes = express.Router();

const controleProjetos = require('./controllers/controleProjetos')
const controleAtividade = require('./controllers/controleAtividade')

routes.get('/projects', controleProjetos.index);
routes.post('/projects', controleProjetos.create);
routes.delete('/projects/:id', controleProjetos.delete);

routes.get('/activities', controleAtividade.index);
routes.post('/activities', controleAtividade.create);
routes.put('/activities/:id', controleAtividade.update);

module.exports = routes;