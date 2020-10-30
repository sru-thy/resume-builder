
var mongoose = require('mongoose'); 

// if questionnaire is included
// var questionschema = new mongoose.Schema({
//     question: String      
// })
  
var fileSchema = new mongoose.Schema({ 
    tags: String, 
    file: 
    { 
        data: Buffer, 
        contentType: String 
    },
    // questions: [questionschema] 
}); 
 
 
module.exports = new mongoose.model('File', fileSchema); 
