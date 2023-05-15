const express = require('express');
const bookController = require('./../Controllers/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for books
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Invalid request
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Book not found
 */
router.get('/:id', authMiddleware.protect, bookController.getBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Book not found
 */
router.patch('/:id', bookController.updateBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete(
  '/:id',
  authMiddleware.protect,
  authMiddleware.restrictToAdmin,
  bookController.deleteBook
);

module.exports = router;
