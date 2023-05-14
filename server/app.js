const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const bookRouter = require('./Routes/bookRouter');
const categoryRouter = require('./Routes/categoryRouter');
const userRouter = require('./Routes/userRouter');

// 1)MIDDLEWARES
if (process.env.NODE_ENV === 'devlopment') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: 'localhost:5173',
  })
);

app.use(express.json());

// 2) ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
