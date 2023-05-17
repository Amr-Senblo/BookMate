const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

const bookRouter = require('./Routes/bookRouter');
const categoryRouter = require('./Routes/categoryRouter');
const userRouter = require('./Routes/userRouter');

const app = express();


// 1) MIDDLEWARES
app.use(express.json({ limit: '10mb'}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set the allowed origin
const allowedOrigin = 'http://localhost:5173';
// Use the cors middleware with options
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);


// 2) ROUTES
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;