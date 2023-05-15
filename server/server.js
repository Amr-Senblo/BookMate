const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const cors = require('cors');
const swagger = require('./swagger');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose.connect(DB).then((con) => console.log('DB connection successful...'));

const allowedOrigins = ['http://localhost:5173']; // Add other allowed origins if needed

const express = require('express');
const morgan = require('morgan');

const app = express();
const bookRouter = require('./Routes/bookRouter');
const categoryRouter = require('./Routes/categoryRouter');
const userRouter = require('./Routes/userRouter');

// 1)MIDDLEWARES

// Set the allowed origin
const allowedOrigin = 'http://localhost:5173';

// Use the cors middleware with options
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

swagger(app);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// 2) ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);

// Enable CORS for all routes

// app.use(
//   cors({
//     origin: 'http://localhost:5173/',
//     credentials: true,
//   })
// );

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`APP running on port ${port}...`);
});

/*
 const ROOT = "/"; ==> all books
 const BOOK = "/book/:bookId";
 const CATEGORY = "/category/:categoryId"; == >bookes
 const CATEGORY = "/category/; == >categories
 const CATEGORY_SECTION = "/category/:categoryId/:sectionId"; xxxx
 const PROFILE = "/profile/:userId";
 const LOVED_BOOKS = "/saved/"; == > saved books  i will take jwt token
*/
