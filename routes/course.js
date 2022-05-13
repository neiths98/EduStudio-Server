const express = require('express');
const route = express.Router();

const courseController = require('../controllers/course-controller');

route.post('/create-course', courseController.createUserCourse);

module.exports = route;