const mysql = require('../mysql');
const generateID = require('../functions').generateID;

// POST
// TODO: adicionar middleware de login required
exports.createUserCourse = async (req, res, next) => {
  try {
    const queryParams = { 
      id: req.body.id,
      title: req.body.title
    };
    const getUserRealIdQuery = 'SELECT user_id from user WHERE id = ?';
    const getUserRealIdQueryResponse = await mysql.execute(getUserRealIdQuery, [queryParams.id]);
    const userRealId = getUserRealIdQueryResponse[0].user_id;

    if (!userRealId)
      return res.status(404).send({ message: 'Usuário não encontrado' });

    const newCourse = {
      id: generateID(),
      title: queryParams.title,
      user_id: userRealId
    }

    const createUserCourseQuery = `INSERT INTO course (id, title, user_id) VALUES (?, ?, ?)`;
    await mysql.execute(createUserCourseQuery, [newCourse.id, newCourse.title, newCourse.user_id]);

    const response = {
      message: "Curso cadastrado com sucesso", 
      newCourse: newCourse,
    }

    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send(error);
  }
};