const express = require('express');
const router = express.Router();

// import actions controller path to use required controller
const actionsController = require('../controllers/actions_controller');

// Middleware to decode data coming from browser
router.use(express.urlencoded({ extended: true }));

// this will handle the requests coming to /action/create-task and execute create function from actions_controller.js
router.post('/create-task', actionsController.create);

// this will handle the requests coming to /action/delete-tasks and execute delete function from actions_controller.js
router.post('/delete-tasks', actionsController.delete);

module.exports = router;