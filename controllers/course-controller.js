const mysql = require('../mysql');
const generateID = require('../functions').generateID;

// GETS
exports.getCoursesFromUser = async (req, res, next) => {
  try {
    const queryParams = { id: req.body.id };
    const getCoursesFromUserQuery = 'SELECT * FROM course WHERE user_id = ?';
    const result = await mysql.execute(getCoursesFromUserQuery, [queryParams.id]);

    if (!result.length)
      return res.status(200).send({ message: 'Usuário não possui cursos' });

    const response = {
      quantity: result.length,
      courses: result.map((course) => {
        return {
          id: course.id,
          title: course.title
        };
      })
    };

    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send(error);
  }
};

// POST
// TODO: adicionar middleware de login required
exports.createUserCourse = async (req, res, next) => {
  try {
    const queryParams = { 
      id: req.body.id,
      title: req.body.title
    };

    const newCourse = {
      id: generateID(),
      title: queryParams.title,
      user_id: queryParams.id
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