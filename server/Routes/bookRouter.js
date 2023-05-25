const express = require('express');
const bookController = require('./../Controllers/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();

router.route('/').get(bookController.getAllBooks);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictToAdmin,
    bookController.updateBook
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictToAdmin,
    bookController.deleteBook
  );

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
// });


const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('pdf'), bookController.uploadPdfBook);

router.get(
  '/download/:id',
  // authMiddleware.protect,
  bookController.downloadPdfBook
);

module.exports = router;
