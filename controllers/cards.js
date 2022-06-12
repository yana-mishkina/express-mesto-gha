const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(404).send({ message: "Карточки не найдены" });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании карточки" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Передан несуществующий id карточки" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Передан несуществующий id карточки" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
