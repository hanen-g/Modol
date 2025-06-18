const Application = require('../models/application.model');
const Agency = require('../models/agency.model');

exports.renderApplicationForm = async (req, res) => {
  const agencyId = req.params.agencyId;
  const agency = await Agency.findById(agencyId);
  res.render('application', { agency });
};

exports.submitApplication = async (req, res) => {
  try {
    const { agencyId } = req.body;
    const message = req.body.message;
    const portfolio = req.file ? `/uploads/${req.file.filename}` : null;

    const newApp = new Application({
      modelId: req.user.id, 
      agencyId,
      message,
      portfolio
    });

    await newApp.save();
    res.redirect('/model');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while submitting application.');
  }
};
