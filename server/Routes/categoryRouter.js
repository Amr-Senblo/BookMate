const express = require('express');
const categoryController = require('./../Controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for categories
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid request
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Category not found
 */
router.get('/:id', categoryController.getCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Add a book to a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Book added to the category
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Category not found
 */
router.patch('/:id', categoryController.addBookToCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a book from a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Book deleted from the category
 *       404:
 *         description: Category not found
 */
router.delete('/:id', categoryController.deleteBookFromCategory);

module.exports = router;
