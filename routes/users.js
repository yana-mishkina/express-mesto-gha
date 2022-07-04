const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { url } = require('../regex/regex');

const {
  getUsers,
  getUser,
  updateAvatar,
  updateInfo,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(url),
  }),
}), updateAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateInfo);

module.exports = router;
