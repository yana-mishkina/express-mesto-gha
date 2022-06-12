const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({ message: "Пользователи не найдены" });
        return;
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь по указанному id не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании пользователя" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь по указанному id не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const updateInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь по указанному id не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateInfo
};