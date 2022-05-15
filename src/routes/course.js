const express = require('express');
const route = express.Router();

const courseController = require('../controllers/course-controller');

route.get('/user-course', courseController.getCoursesFromUser);

route.post('/new', courseController.createUserCourse);

module.exports = route;