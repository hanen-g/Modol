const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');

const Agency = require('../models/agency.model');
const Application = require('../models/application.model');

const model = require('../controllers/model.controller');
const applications = require('../controllers/application.controller');

router.get('/', authenticate, async (req, res) => {
  if (req.user.role !== 'model') return res.redirect('/login');
  const agencies = await Agency.find();
  const appliedApps = await Application.find({ modelId: req.user.id });
  const appliedAgencyIds = appliedApps.map(app => app.agencyId.toString());
  res.render('model', {
    user: req.user,
    agencies,
    appliedAgencyIds,
    token: req.cookies.token || req.headers.authorization?.split(' ')[1] || ''
  });
});

router.get('/profile', authenticate, model.renderProfile);
router.post('/profile', authenticate, upload.single('profileImage'), model.updateProfile);

router.get('/apply/:agencyId', authenticate, applications.renderApplicationForm);
router.post('/apply', authenticate, upload.single('portfolio'), applications.submitApplication);

module.exports = router;
