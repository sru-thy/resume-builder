exports.loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.admin) {
        return res.redirect('/admin');
      }
    }
    next()
};

exports.adminAuth = (req, res, next) => {
  if (req.user.admin) 
  return next();
  res.status(401).end();
};

exports.notloggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
    return next()
  } 
  res.redirect('/')
}