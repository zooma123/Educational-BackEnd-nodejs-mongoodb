const mongoose = require("mongoose")


const TermSchema = new mongoose.Schema({

courseid:{
  type : mongoose.Schema.Types.ObjectId ,
 
  ref : "Courses"
} ,

name:{

type:String ,
required:true
}, 

description:{
type : String ,

}


})


const terms = mongoose.model('terms' , TermSchema )

module.exports = terms;

