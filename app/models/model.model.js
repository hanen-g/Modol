const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstname: String,
  lastname: String,
  gender: String,
  age: Number,
  height: Number,
  category: String,
  profileImage: String
});

module.exports = mongoose.model('Model', modelSchema);