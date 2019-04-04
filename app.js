const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const app = express();

/* ejs */
app.use(expressLayouts);
app.set('view engine', 'ejs');

/* bodyparser */
app.use(express.urlencoded({ extended: false }));

/* Express session */
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

/* Connect flash */
app.use(flash());

/* Global vars */
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

/* Routes */
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`server started ${PORT}`));