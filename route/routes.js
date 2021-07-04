'use strict'
const express = require('express');
const route = express.Router();
const home = require('../controller/services');
const post = require('../controller/post');
route.get('/home', home.home);
route.get('/signup',home.signup);
route.get('/signin', home.signin);
route.get('/forgetPassword', home.forgotPassword);
route.post('/signup', post.signup);



module.exports = route;
