const express = require('express')
const router = express.Router()
const { notloggedin } = require('./controllers');

router.get("/",function(req, res){
    res.send("home"); 
 });

router.get("/admin",notloggedin,function(req, res){
  res.render("admin"); 
});

module.exports = router