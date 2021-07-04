'use strict'
require('./models/database');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const flash = require('express-flash');

const {
  v4: uuidv4
} = require('uuid');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const route = require('./route/routes');
dotenv.config();
const app = express();
const sessionStore = new session.MemoryStore;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser('sec'));


app.use(session({

  cookie: {
    maxAge: 400000000
  },
  store: sessionStore,

  saveUninitialized: false,
  resave: false,
  secret: 'secret'


}));
app.use(flash());
app.use(function (req, res, next) {
  // if there's a flash message, transfer        // it to the context, then clear it     
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

      app.use(express.urlencoded({
        extended: true
      }));







      app.use(morgan('tiny'));
      app.set('view engine', 'ejs');
      app.use('*/css', express.static('asset/css'));
      app.use('*/img', express.static('asset/img'));
      app.use('*/js', express.static('asset/js'));
      app.use('/', route);
      const PORT = process.env.PORT;
      app.listen(PORT, () => {
        console.log(`we are running on ${process.env.CLIENT_URL}`)
      });