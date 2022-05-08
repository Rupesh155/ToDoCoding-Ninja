const express = require('express');

// Setup router
const router = express.Router();

// Setting path for controller function
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// Setting controller function to a route
router.get('/', homeController.home);

// Route all requests starting with '/action' to action.js file
router.use('/action', require('./action'));

// Exporting router
module.exports = router;