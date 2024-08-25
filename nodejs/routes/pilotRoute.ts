
const expressRoute = require('express');
const pilotRoute = expressRoute();

//controller
const pilotController = require('../controllers/pilotController')

pilotRoute.get('/', pilotController.pilot);
pilotRoute.get('/match', pilotController.match);

module.exports = pilotRoute;