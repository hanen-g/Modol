const Model = require('../models/model.model');
const Category = require('../models/category.model');
const Agency = require('../models/agency.model');

exports.renderDashboard = async (req, res) => {
  const [models, categories, agencies] = await Promise.all([
    Model.find(),
    Category.find(),
    Agency.find()
  ]);
  res.render('admin', { models, categories, agencies });
};
