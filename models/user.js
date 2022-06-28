const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'В имени не может быть меньше 2 символов'],
    maxLength: [30, 'В имени не может быть больше 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'В описании пользователя не может быть меньше 2 символов'],
    maxLength: [30, 'В описании не может быть больше 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Email не корректный',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: 'Пароль не надежный',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
