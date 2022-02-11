const express = require('express');
const mysql = require('../mysql');
const route = express.Router();

route.get('/', async (req, res, next) => {
  try {
    const getUsersQuery = 'SELECT * FROM user';
    const result = await mysql.execute(getUsersQuery);
    return res.status(200).send(result);
  }
  catch(error) {
    return res.status(500).send(error);
  }
});

module.exports = route;