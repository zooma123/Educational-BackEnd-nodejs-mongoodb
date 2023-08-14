const mongoose = require("mongoose")


const CoursesSchema = new mongoose.Schema({

instructor:{

  type : mongoose.Schema.Types.ObjectId ,
 
  ref : "User",
  match: { roles: {$in:['Admin'  , 'teacher']}}, // Match the reference to users with role 'admin'


},                        
name:{

type:String ,
required:true
},

Code: {
type : Number ,
required :true 
},

students :[{ type: mongoose.Schema.Types.ObjectId , required:false  , ref: 'User' , match: { roles: {$in:['Admin'  , 'teacher' , 'student']}} }]

})


const Courses = mongoose.model('Courses' , CoursesSchema )

module.exports = Courses;

