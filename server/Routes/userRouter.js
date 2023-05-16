const express = require('express');
const userController = require('./../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', authMiddleware.signup);
router.post('/login', authMiddleware.login);
router.post('/forgetPassword', authMiddleware.forgetPassword);
// router.post('/resetPassword', authMiddleware.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/save-book')
  .post(authMiddleware.protect, userController.addBookToSaved);

router
  .route('/unsave-book')
  .post(authMiddleware.protect, userController.removeBookFromSaved);

module.exports = router;
