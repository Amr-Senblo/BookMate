const express = require('express');
const categoryController = require('./../Controllers/categoryController');

const router = express.Router();

router
  .get('/', categoryController.getAllCategories)
  .post('/', categoryController.createCategory);

router
  .get('/:id', categoryController.getCategory)
  .patch('/:id', categoryController.addBookToCategory)
  .delete('/:id', categoryController.deleteBookFromCategory);

module.exports = router;
