const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const generateID = require('../functions').generateID;

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

// POSTS
exports.signUp = async (req, res, next) => {
  try {
    const newUser = {
      id: generateID(),
      email: req.body.email,
      password: req.body.password,
    }

    if (!newUser.email)
      return res.status(500).send({ error: "Email não foi fornecido" });

    if (!newUser.password)
      return res.status(500).send({ error: "Senha não foi fornecida" });

    // Verificar se email/id já foi cadastrado
    const getUserQuery = 'SELECT id, email FROM user WHERE id = ? or email = ?';
    const getUserResult = await mysql.execute(getUserQuery, [newUser.id, newUser.email]);

    if (getUserResult) {
      if (getUserResult[0].email !== newUser.email)
        return res.status(500).send({ error: "Erro inesperado, por favor tente novamente" });
      else
        return res.status(500).send({ error: 'Usuário já cadastrado no sistema '});
    }
    
    // Cadastro do usuário com senha criptografada  
    const cryptPassword = await bcrypt.hash(newUser.password, 11);
    const createUserQuery = 'INSERT INTO user (id, email, password) VALUES (?, ?, ?)';
    await mysql.execute(createUserQuery, [newUser.id, newUser.email, cryptPassword]);

    const response = {
      mensagem: "Usuário cadastrado com sucesso", 
      newUser: {
        id: newUser.id,
        email: newUser.email,
      }
    }

    return res.status(200).send(response);

  } catch(error) {
    return res.status(500).send(error);
  }
}

