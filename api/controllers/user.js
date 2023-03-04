const express = require("express");
const router = express.Router();
const userService = require("../services/user");
const check_auth = require('../services/middleware/check-auth');


router.post('/signup', userService.signup);

router.post('/login', userService.login);

router.get('/logout', userService.logout);

router.get('/', check_auth, userService.getAllUsers);

router.get('/:id', check_auth, userService.getOneUserById);

router.put('/:id', check_auth, userService.updateUser);

router.delete('/:id', check_auth, userService.deleteUser);

module.exports = router;