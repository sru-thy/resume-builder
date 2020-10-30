const express = require('express')
const router = express.Router()
const { notloggedin } = require('./controllers');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer');
var Resume = require('../models/resumes');

router.get("/",function(req, res){
    res.render("home"); 
});

router.post("/",function(req, res){
    req.flash('info', req.body.tag)
    res.redirect("/edit"); 
});

router.get("/edit",async (req, res) => {
    const resume = await Resume.find({tags: req.flash('info')})
    res.render("editor", { resume:resume}); 
});

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, req.body.name) 
    } 
}); 
  
var upload = multer({ storage: storage }); 

router.get("/admin",notloggedin,(req, res) =>{
            res.render('admin');   
});

router.post('/admin', upload.single('file'), (req, res, next) => { 
  
  var obj = { 
      tags: req.body.name, 
      file: { 
          data: fs.readFileSync(path.join('C:/Users/ASUS/Documents/projects/Resume Builder/uploads/' + req.file.filename)), 
          contentType: 'text/html'
      } 
  } 
  Resume.create(obj, (err, item) => { 
      if (err) { 
          console.log(err); 
      } 
      else { 
          item.save(); 
          res.redirect('/admin');
      } 
  }); 
});

router.get("/editor",notloggedin,async (req, res) => {
    res.render("admineditor", { resume:undefined})
}); 

router.post("/editor",notloggedin,async (req, res) => {
    req.flash('tag', req.body.tag)
    const resume = await Resume.find({tags: req.body.tag})
    res.render("admineditor", { resume:resume});  
}); 

router.post("/editor2",notloggedin,async (req, res) => {
 
    var buf = Buffer.from(req.body.content, 'utf-8');
    var obj = { 
        file: { 
            data: buf, 
            contentType: 'text/html'
        } 
    } 
    await Resume.findOneAndUpdate({tags:req.flash('tag')},obj,{new: true});
    res.redirect('/editor')
});
module.exports = router