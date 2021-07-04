'use strict';
const {
  check,

  validationResult
} = require('express-validator');
const User = require('../models/signup');


const bcrypt = require('bcrypt');
const {
  signup
} = require('./services');
const {
  deleteOne
} = require('../models/signup');






exports.signup = [CreateValidator('signup'), checkValidationResult], (req, res, next) => {


}


// exports.signin = [
//   check('email', 'your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
//   check('psw', 'your password is incorrect and should be at least six character long').not().isEmpty().isLength({
//     min: 6
//   }),
//   check('pswRepeat', 'password do not match').custom((value, {
//     req
//   }) => (value === req.body.psw)),
//   check('remember').isBoolean()


// ], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).jsonp(errors.array());
//   } else {
//     const newUser = new User({
//       Email: req.body.email,
//       Password: hashPassword,
//       RepeatPassword: hashPassword,
//       RememberMe: Boolean(req.body.remember)

//     })
//     newUser.save((err) => {
//       if (err) {
//         res.status(500).send({
//           msg: err.message
//         });
//       } else {
//         res.redirect('/home');
//       }
//     })

//   }





//   }

function CreateValidator(route) {
  switch (route) {
    case 'signup':
      return [check('email', 'your email is not valid').not().isEmpty().withMessage('must not be empty').isEmail().normalizeEmail().custom((value, {
          req,
          loc,
          path
        }) => {

          return User.findOne({
              Email: req.body.email
            })


            .then(user => {
              if (user) {
                return Promise.reject('Email already in use');

              }




            });

        }),
        check('psw', 'your password is incorrect and should be at least six character long').not().isEmpty().isLength({
          min: 6
        }).withMessage('password must be six characters or more').isAlphanumeric(),
        check('pswRepeat', 'password do not match').notEmpty().withMessage('password must not be empty').custom((value, {
          req
        }) => (value === req.body.psw)),

      ];

    default:
      return []
  }

}

function checkValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    const alert = errors.array();
    if (alert)
      var messages = [];
    alert.forEach((error) => {
      messages.push(error.msg);
    })
    return res.render('signup.ejs', {
      message: req.flash('error', messages)
    });







  } else {
    bcrypt.hash(req.body.psw, 10).then((hash) => {
      const newUser = new User({
        Email: req.body.email,
        Password: hash,
        RepeatPassword: hash,
        RememberMe: Boolean(req.body.remember)

      })
      newUser.save((err) => {
        if (err) {
          res.status(500).send({
            msg: err.message
          })
        }
        else {
          req.flash('success', 'you are successfully registered');
       }
      return  res.redirect(303, '/home');
      





      })

    })


  }
}