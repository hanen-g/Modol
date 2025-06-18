const Model = require('../models/model.model');
const Category = require('../models/category.model');

exports.renderProfile = async (req, res) => {
  let model = await Model.findOne({ userId: req.user.id });
  if (!model) model = await Model.create({ userId: req.user.id });
  const categories = await Category.find();
  res.render('model-profile', {
    user: req.user,
    model,
    categories,
    token: req.cookies.token || req.headers.authorization?.split(' ')[1] || ''
  });
};

exports.updateProfile = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.profileImage = `/uploads/${req.file.filename}`;
  await Model.findOneAndUpdate({ userId: req.user.id }, data, { upsert: true });
  res.redirect('/model/profile');
};
