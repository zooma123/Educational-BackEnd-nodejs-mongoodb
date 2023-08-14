const usermodel = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

//Method For Register

const validEmail = (email)=>{
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
  }
exports.register = async(req,res,next)=>{

try{
//Hashing The Password 
  const salt = bcrypt.genSaltSync(10);
const hash= bcrypt.hashSync(req.body.password , salt)
const email = req.body.email 
const password = req.body.password
if(!validEmail(email)){
  return res.status(403).json({message : "Invalid Email"})

}
if(password.length < 6){
  return res.status(403).json({message:"password Must be Greater Than 6 "})

}



const newUser =  await usermodel.create({
username:req.body.username,
email :req.body.email ,
password : hash ,
PhoneNumber : req.body.PhoneNumber ,
roles : req.body.roles

})
res.status(200).json({
message : 'User Has Been Created' , 

})

}catch(err){

next(err)

}


}


exports.login = async(req,res,next)=>{
try{
 
  const user = await usermodel.findOne({username : req.body.username})
  
  const isPasswordCorrect =  await bcrypt.compare(req.body.password , user.password)
if(!isPasswordCorrect){
res.status(404).json({
message : "User Name Or Password are in Correct"

})  
  }
  
  if(!user){
  return next(404,"User Not Found")
  
  }
  const token = jwt.sign({id : user._id , role:user.roles}, process.env.JWT)
const {password , ...otherDetails} = user._doc;
  res.cookie("access_token",token,{
    httpOnly:true 
  }).status(200).json({...otherDetails});
  
}catch(err){
next(err);
}
  
}