// checking if an admin is already logged in
exports.loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.admin) {
        return res.redirect('/admin');
      }
    }
    next()
};

// checking if a user is an admin
exports.notloggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
    return next()
  } 
  res.redirect('/')
}