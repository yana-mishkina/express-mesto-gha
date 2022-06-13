const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateInfo);

module.exports = router;
