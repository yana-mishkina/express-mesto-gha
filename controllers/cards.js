const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
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
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toString() !== owner) {
        throw new NotFoundError('У пользователя нет прав для удаления карточки');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail(new Error('NotFound'))
          // eslint-disable-next-line no-shadow
          .then((card) => {
            res.status(200).send(card);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              res.status(400).send({ message: 'Переданы некорректные данные для удаления карточки' });
            } else if (err.message === 'NotFound') {
              res.status(404).send({ message: 'Карточка с указанным id не найдена ' });
            } else {
              res.status(500).send({ message: 'На сервере произошла ошибка' });
            }
          });
      }
    })
    .catch(next);
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
