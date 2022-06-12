const router = require('express').Router();
const { getUsers, getUser, createUser, updateAvatar, updateInfo } = require('../controllers/users')

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users/me', updateInfo);

module.exports = router;