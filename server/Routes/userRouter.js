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
  .get(authMiddleware.protect, userController.getAuthUser)
  .post(userController.createUser);

router.get(
  '/all-users',
  authMiddleware.protect,
  userController.getAllUsers
);

router
  .route('/save-book')
  .post(authMiddleware.protect, userController.addBookToSaved);

router
  .route('/unsave-book')
  .post(authMiddleware.protect, userController.removeBookFromSaved);

router.get(
  '/saved-books',
  authMiddleware.protect,
  userController.getSavedBooks
);
router.get('/is-saved', authMiddleware.protect, userController.isSaved);

module.exports = router;
