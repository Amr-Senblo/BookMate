const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
// const gridfs = Grid(mongoose.connection.db, mongoose.mongo);
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => console.log('DB connection successful...'));

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`APP running on port ${port}...`);
});

