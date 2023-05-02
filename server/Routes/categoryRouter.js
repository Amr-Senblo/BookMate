const express = require('express');
const categoryController = require('./../Controllers/categoryController');

const router = express.Router();
router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.addBookToCategory)
  .delete(categoryController.deleteBookFromCategory);

module.exports = router;
