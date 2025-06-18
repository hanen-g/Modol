const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();
require('./app/config/db.config');

const app = express();

app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/users', require('./app/routes/user.routes'));


app.use('/', require('./app/routes/web.routes'));
app.use('/admin', require('./app/routes/admin.routes'));
app.use('/model', require('./app/routes/model.routes'));


app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
