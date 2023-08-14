const sheetmodel = require('../models/Sheets.js')
const {cloudinary} = require('../utils/cloudinary.js')
const {promisify} = require('util');



exports.upload = async(req,res,next)=>{
  try {
    if(!req.file) {
      return res.status(400).send('No files were uploaded.');
  }
  
  if(req.file.mimetype != "application/pdf") {
      return res.status(400).send('Select CSV files only.');
  }

      //add response to model objects
      await sheetmodel.create({
        fileName: req.file.originalname,
        filePath: req.file.path,
        file: req.file.filename,
        courseid: req.body.courseid,
        });

res.status(200).json({
message : "You Successfully Updated The Pdf"

})
  } catch (err) {


    res.status(403).json({
      message : err.message
      
      })
  }
}





