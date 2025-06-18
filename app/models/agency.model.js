const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  yearFounded: Number,
  category: String
});

module.exports = mongoose.model('Agency', agencySchema);
