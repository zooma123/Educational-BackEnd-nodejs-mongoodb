// pdfModel.js
const mongoose = require('mongoose');

const SheetsPdf = new mongoose.Schema({
  courseid :   {type : mongoose.Schema.Types.ObjectId , required : false ,
ref :'Courses'

  },  
  fileName: {
    type: String
  },
  filePath : {
    type:String
  },
  file: {
    type: String
  }

});

const Sheets = mongoose.model('Sheets', SheetsPdf);

module.exports = Sheets;
