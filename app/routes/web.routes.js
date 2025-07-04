const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/models', (req, res) => res.render('models'));
router.get('/agency', (req, res) => res.render('agency'));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

module.exports = router;
