const mongoose = require("mongoose")


const VedioSchema = new mongoose.Schema({

  term : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "terms", 
    required : false
  },
  name : {
type : String ,
required : true
},
vedio : {
type : String

},
price : {

type : Number ,
required : true

},

isopened : {
type : Boolean ,
default : false 

}



})


const vedios = mongoose.model('vedios' , VedioSchema )

module.exports =vedios ;

