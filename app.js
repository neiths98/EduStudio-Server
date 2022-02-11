const express = require('express');
const app = express();

const userRoute = require('./routes/user');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', userRoute);

// Caso não entre em nenhuma das rotas anteriores
app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
      status: error.status,
    }
  });
});

module.exports = app;