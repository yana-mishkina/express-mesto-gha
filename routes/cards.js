const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const url = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/;

const {
  getCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(url).required(),
  }),
}), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
