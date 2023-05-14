const express = require('express');
const userController = require('./../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();
router.post('/signup', authMiddleware.signup);
router.post('/login', authMiddleware.login);
router.post('/forgetPassword', authMiddleware.forgetPassword);
// router.post('/resetPassword', authMiddleware.resetPassword);

router.route('/').get(userController.getAllUsers).post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
