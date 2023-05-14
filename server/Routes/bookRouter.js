const express = require('express');
const bookController = require('./../Controllers/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');
const router = express.Router();
router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(authMiddleware.protect, bookController.getBook)
  .patch(bookController.updateBook)
  .delete(authMiddleware.protect,authMiddleware.restrictToAdmin,bookController.deleteBook);

module.exports = router;
