const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ['admin', 'model'], default: 'model' }
});

module.exports = mongoose.model('User', userSchema);
