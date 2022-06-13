const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'В названии не может быть меньше 2 символов'],
    maxlength: [30, 'В названии не может быть больше 30 символов'],
    required: [true, 'Название не может быть пустым'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка не может быть пустой'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner не может быть пустым'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
