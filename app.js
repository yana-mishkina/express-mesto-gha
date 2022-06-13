const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62a5ddd616b60ffade8edf4d',
  };
  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена.',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
