const express = require('express')
const router = express.Router()
const passport = require("passport")
const User = require('../models/user'); 
const { check, validationResult } = require('express-validator')
const { loggedin } = require('./controllers');



// To register a new admin uncomment the following lines

// router.get("/register", loggedin, function(req, res){
//   res.render("register",{
//      message: undefined
//    });
// });

// router.post("/register", loggedin,[
// check('username').not().isEmpty().isLength({ max: 7 }),
// ] ,
// function(req, res){
// const errors = validationResult(req)
// if (!errors.isEmpty()) {
//  return res.render("register",{message: 'username must be less than 7 characters' });
// }
//  user = new User({username: req.body.username})
//   User.register(user, req.body.password, function(err, user){
//       if(err){
//            if (err.name === 'MongoError' && err.code === 11000) {
//              return res.render("register",{message: 'A user with the given email/username is already registered ' });
//              }
//               req.flash("error", err.message);
//              return res.render("register",{
//              message: req.flash('error')
//            });
//       }
//       passport.authenticate("local")(req, res, function(){
//           res.redirect("/login");
//       });
//   });
// });

router.get("/login", loggedin,function(req, res){
     res.render("login",{
        message: req.flash('error')
      });
 });
 
router.post("/login", loggedin, passport.authenticate("local",{
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res,next){
    
 });
 
router.get("/logout",function(req, res){
     req.logout();
     res.redirect("/");
 });

module.exports = router