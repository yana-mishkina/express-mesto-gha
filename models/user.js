const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'В имени не может быть меньше 2 символов'],
    maxLength: [30, 'В имени не может быть больше 30 символов'],
    required: [true, 'Имя не может быть пустым'],
  },
  about: {
    type: String,
    minlength: [2, 'В описании пользователя не может быть меньше 2 символов'],
    maxLength: [30, 'В описании не может быть больше 30 символов'],
    required: [true, 'Описание пользователя не может быть пустым'],
  },
  avatar: {
    type: String,
    required: [true, 'Аватар не может быть пустым'],
  },
});

module.exports = mongoose.model('user', userSchema);
