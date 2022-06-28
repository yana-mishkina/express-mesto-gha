const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateAvatar,
  updateInfo,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateInfo);
router.get('/me', getCurrentUser);

module.exports = router;
