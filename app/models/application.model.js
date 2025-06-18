const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  modelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
  message: { type: String, required: true },
  portfolio: { type: String, required: true },
});

module.exports = mongoose.model('Application', applicationSchema);
