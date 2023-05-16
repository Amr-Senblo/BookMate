const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app= require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose.connect(DB).then((con) => console.log('DB connection successful...'));

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
