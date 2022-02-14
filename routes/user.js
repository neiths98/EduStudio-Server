const express = require('express');
const route = express.Router();

const userController = require('../controllers/user-controller');

route.get('/', userController.getUser);

route.post('/sign-up', userController.signUp);
route.post('/sign-in', userController.signIn);

module.exports = route;