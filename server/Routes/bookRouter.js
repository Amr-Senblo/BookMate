const express = require('express');
const bookController = require('./../Controllers/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');
const multer = require('multer');
const router = express.Router();

router.route('/').get(bookController.getAllBooks);

router
  .route('/:id')
  .get(bookController.getBook)
  .get(authMiddleware.protect, bookController.getBook)
  .patch(bookController.updateBook)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictToAdmin,
    bookController.deleteBook
  );

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
router.post('/upload', upload.single('coverImage'), bookController.createBook);
// router.get('/download',bookController.downloadBook)

router.route('/download/:bookId').get(bookController.downloadBook);
module.exports = router;
