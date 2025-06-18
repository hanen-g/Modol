const Agency = require('../models/agency.model');
const Category = require('../models/category.model');
const fs = require('fs');
const path = require('path');

exports.renderAddAgency = async (req, res) => {
  const categories = await Category.find();
  res.render('add-agency', { categories });
};

exports.createAgency = async (req, res) => {
  const { name, location, yearFounded, category } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : null;
  await Agency.create({ name, location, yearFounded, category, image });
  res.redirect('/admin');
};

exports.renderEditAgency = async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  const categories = await Category.find();
  if (!agency) return res.status(404).send('Agency not found');
  res.render('edit-agency', { agency, categories });
};

exports.updateAgency = async (req, res) => {
  const { name, location, yearFounded, category } = req.body;
  const updateData = { name, location, yearFounded, category };
  if (req.file) updateData.image = '/uploads/' + req.file.filename;
  await Agency.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/admin');
};

exports.deleteAgency = async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  if (agency?.image) {
    const imagePath = path.join(__dirname, '../../public', agency.image);
    fs.unlink(imagePath, err => {
      if (err) console.error('Failed to delete image:', err);
    });
  }
  await Agency.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
};
