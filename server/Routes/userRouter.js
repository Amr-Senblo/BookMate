const express = require('express');
const userController = require('./../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: User sign-up
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid request
 */
router.post('/signup', authMiddleware.signup);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid request
 */
router.post('/login', authMiddleware.login);

/**
 * @swagger
 * /api/v1/users/forgetPassword:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Password reset request successful
 *       400:
 *         description: Invalid request
 */
router.post('/forgetPassword', authMiddleware.forgetPassword);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid request
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.patch('/:id', userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
