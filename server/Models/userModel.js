const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    defalut: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  // address: { type: String, required: true },

  saved: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      // quantity: {
      //   type: Number,
      //   required: true,
      //   default: 1,
      // },
    },
  ],

  // orders: [
  //   {
  //     book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  //     quantity: { type: Number, required: true },
  //     date: { type: Date, required: true },
  //   },
  // ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
