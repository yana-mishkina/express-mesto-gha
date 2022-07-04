const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { url } = require('../regex/regex');

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
    validate: {
      validator(v) {
        return url.test(v);
      },
      message: 'Ссылка не корректна',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта и пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта и пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
