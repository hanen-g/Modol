const User = require('../models/user.model');

exports.create = async (req, res) => {
  try {
    res.json(await User.create(req.body));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};