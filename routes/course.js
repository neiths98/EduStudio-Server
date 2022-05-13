const express = require('express');
const route = express.Router();

const courseController = require('../controllers/course-controller');

route.post('/new', courseController.createUserCourse);

module.exports = route;