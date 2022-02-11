const mysql = require('../mysql');

// GETS
exports.getUser = async (req, res, next) => {
  try {
    const getUsersQuery = 'SELECT * FROM user';
    const result = await mysql.execute(getUsersQuery);

    if (!result)
      return res.status(200).send({ message: 'Não há usuários cadastrados' });

    const response = {
      quantity: result.length,
      users: result.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }),
    };
    return res.status(200).send(response);
  }
  catch(error) {
    return res.status(500).send(error);
  }
};

