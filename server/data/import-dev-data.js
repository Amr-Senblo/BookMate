const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const Book = require('./../Models/bookModel');
const { json } = require('express');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB).then((con) =>
  // console.log(con.connections)
  console.log('DB connection successful !')
);

//READ JSON FILE
const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Book.create(books);
    console.log('Data Successfully loaded !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//  DELERE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log('Data DELETED Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
