const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');

const admin = require('../controllers/admin.controller');
const category = require('../controllers/category.controller');
const agency = require('../controllers/agency.controller');

router.get('/', admin.renderDashboard);

router.post('/category', category.createCategory);
router.delete('/category/:id', category.deleteCategory);

router.get('/add-agency', agency.renderAddAgency);
router.post('/agency', upload.single('image'), agency.createAgency);
router.get('/edit-agency/:id', agency.renderEditAgency);
router.post('/update-agency/:id', upload.single('image'), agency.updateAgency);
router.delete('/agency/:id', agency.deleteAgency);

module.exports = router;
