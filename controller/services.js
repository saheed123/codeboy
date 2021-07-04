



exports.home = (req, res) => {
  
  res.render('home');
}
exports.signup = (req, res) => {
  req.flash('success', 'you are successfully registered');
  res.render('signup', {flash : req.flash('success')});
}

exports.signin = (req, res) => {
  res.render('signin');
}
exports.forgotPassword = (req, res) => {
  res.render('forgotPassword');
}




