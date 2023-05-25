const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Book = require('./../Models/bookModel');
const path = require('path');
const mongoose = require('mongoose');
const PDF = require('./../Models/pdfModel');
const { GridFSBucket } = require('mongodb');

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(
      new AppError(`Can't find book with this id : ${req.params.id}`)
    );
  }
  res.status(200).json({
    status: 'success',
    book,
  });
});

exports.getAllBooks = catchAsync(async (req, res) => {
  console.log(req.query);

  const books = await Book.find();

  res.status(200).json({
    result: books.length,
    books: books,
  });
});

// These functions are restricted to admin
// exports.createBook = catchAsync(async (req, res, next) => {
//   const { title, author, description, price, category, rating, downloadLink } =
//     req.body;

//   console.log(req.file);
//   // Convert the cover image to a base64 string
//   // const coverImage = req.file.buffer.toString('base64');
//   const coverImage = req.body.imgCover;
//   if (!coverImage) {
//     return new next(AppError('No Image Found', 404));
//   } else {
//     // Create the book object and save it to the database
//     const book = await Book.create({
//       title,
//       author,
//       description,
//       price,
//       category,
//       imgCover: coverImage,
//       rating,
//       downloadLink,
//     });

//     res.status(201).json({
//       status: 'success',

//       book,
//     });
//   }
// });

exports.updateBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: 'success',

    book,
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'deleted successfully',
    data: null,
  });
});

// exports.downloadBook = catchAsync(async (req, res) => {
//   const book = await Book.findById(req.params.id);
//   console.log(book);
//   const fileName = book.title + '.pdf';
//   const filePath = '/../dev-data/Books/' + fileName;

//   if (!book) {
//     return next(
//       new AppError(`Can't find book with this id : ${req.params.id}`)
//     );
//   }
//   res.download(path.resolve(`${__dirname} + ${filePath}`));
// });

// *********************************************************************

exports.downloadPdfBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).populate('pdf');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (!book.pdf) {
      return res.status(404).json({ error: 'PDF not found for this book' });
    }

    const fileId = book.pdf.fileId;

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'books',
    });

    const downloadStream = bucket.openDownloadStream(fileId);

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=${book.pdf.filename}`);

    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to download PDF' });
  }
};

// *********************************************************************

exports.uploadPdfBook = catchAsync(async (req, res) => {
  console.log(req.body);
  // res.send('PDF uploaded in memory successfully');
  const { originalname, mimetype, buffer } = req.file;
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'books',
  });
  const uploadStream = bucket.openUploadStream(originalname, {
    contentType: mimetype,
  });

  uploadStream.end(buffer);
  uploadStream.end();

  uploadStream.on('finish', async () => {
    const pdf = await PDF.create({
      filename: originalname,
      contentType: mimetype,
      fileId: uploadStream.id,
    });

    const { title, author, description, category, rating, imgCover } = req.body;
    const book = new Book({
      title,
      author,
      description,
      category,
      rating,
      imgCover,
      pdf: pdf._id,
    });
    // console.log('😎', book);
    bookId = book._id;
    try {
      await book.save();
      await Book.findByIdAndUpdate(book._id, { pdf: pdf._id });
      
      // Find or create the category and add the book to it
      const foundCategory = await Category.findOne({ name: category });
      if (foundCategory) {
        foundCategory.books.push(book._id);
        await foundCategory.save();
      } else {
        const newCategory = await Category.create({ name: category });
        newCategory.books.push(book._id);
        await newCategory.save();
      }

      res.status(201).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to upload PDF' });
    }
  });

  uploadStream.on('error', (err) => {
    console.log(err);
    return res.status(500).json({ error: 'Error uploading file.' });
  });
});

// *********************************************************************
// exports.uploadPdfBook = catchAsync(async (req, res) => {
//   const session = await mongoose.startSession();
  
//   session.startTransaction();

//   try {
//     console.log(req.body);
//     const { originalname, mimetype, buffer } = req.file;
//        if (!originalname || !mimetype || !buffer) {
//          throw new Error('Missing file data');
//        }
//     const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: 'books',
//     });
//     const uploadStream = bucket.openUploadStream(originalname, {
//       contentType: mimetype,
//     });

//     uploadStream.end(buffer);
//     uploadStream.end();

//     uploadStream.on('finish', async () => {
//       const pdf = await PDF.create(
//         {
//           filename: originalname,
//           contentType: mimetype,
//           fileId: uploadStream.id,
//         },
//         { session } // Pass the session to ensure it's part of the transaction
//       );

//       const { title, author, description, category, rating, imgCover } =
//         req.body;
//       const book = new Book({
//         title,
//         author,
//         description,
//         category,
//         rating,
//         imgCover,
//         pdf: pdf._id,
//       });

//       bookId = book._id;
//       await book.save({ session }); // Save the book within the transaction
//       await Book.findByIdAndUpdate(book._id, { pdf: pdf._id }, { session });

//       res.status(201).json({ message: 'PDF uploaded successfully' });
//     });

//     uploadStream.on('error', (err) => {
//       console.log(err);
//       throw new Error('Error uploading file.');
//     });

//     await session.commitTransaction();
//   } catch (error) {
//     console.log(error);
//     await session.abortTransaction();
//     res.status(500).json({ error: 'Failed to upload PDF' });
//   } finally {
//     session.endSession();
//   }
// });


