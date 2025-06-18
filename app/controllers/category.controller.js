const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  await Category.create(req.body);
  res.redirect('/admin');
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
};
