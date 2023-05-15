const express = require('express');
const morgan = require('morgan');

const app = express();
const bookRouter = require('./Routes/bookRouter');
const categoryRouter = require('./Routes/categoryRouter');
const userRouter = require('./Routes/userRouter');

// 1)MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// 2) ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);

// module.exports = app;
