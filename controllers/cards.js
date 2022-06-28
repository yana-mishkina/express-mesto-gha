const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError({ message: err.message });
      }
    })
    .catch(next);
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
              throw new BadRequestError('Переданы некорректные данные для удаления карточки');
            }
            if (err.message === 'NotFound') {
              throw new NotFoundError('Карточка с указанным id не найдена ');
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

const setLike = (req, res, next) => {
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
        throw new BadRequestError('Переданы некорректные данные для постановки лайка');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Передан несуществующий id карточки');
      }
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
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
        throw new BadRequestError('Переданы некорректные данные для снятия лайка');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Передан несуществующий id карточки');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
