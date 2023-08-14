const Usermodel = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const WalletModel = require('../models/WalletRecord.js')
//Method For Register

const validEmail = (email)=>{
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
  }


  exports.createUser  = async(req,res)  =>{
  try{
    const newUser =  await Usermodel.create(req.body)
  
    res.status(200).json({
  data: newUser
    })
  }catch(err){
  res.status(500).json({
  
  message : err.message
  
  })
  }
  


}
exports.createTeacher  = async(req,res)  =>{

  
  


  try{
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
    
    
    
    const newTeacher =  await Usermodel.create({
      username:req.body.username,
      email :req.body.email ,
      password : hash ,
      PhoneNumber : req.body.PhoneNumber ,
      roles : "teacher"
      
      
    })
  
    res.status(200).json({
message :"Teacher Has Been Created Successfully"    })
  }catch(err){
  res.status(500).json({
  
  message : err.message
  
  })
  }
  


}




exports.UpdateUser = async (req,res)=>{

  try{
    const ubdatedUser = await Usermodel.findByIdAndUpdate(req.params.id , req.body ,{new :true});
  res.status(200).json({ubdatedUser});
  }
  catch(err){
  res.status(500).json({
  err: err.message
  
  })
  
  }
  
}

exports.deleteUser = async(req,res)=>{


  try{
    await Usermodel.findByIdAndDelete(req.params.id);
 res.status(200).json({message : "Hotel Has Been Deleted"});
 }
 catch(err){
 res.status(500).json({
 err: err.message
 
 })
 
 }

}

exports.GetUser = async(req,res)=>{

  try{
    const user =    await Usermodel.findById(req.params.id);
    res.status(200).json({user});
    }
    catch(err){
    res.status(500).json({
    err: err.message
    
    })
    
    }
  
}

exports.GetAllUsers = async(req,res,next)=>{

  try{
    const users =    await Usermodel.find();
    res.status(200).json({users});
    }
    catch(err){
  next(err);
    
    }
    


}

exports.FillTheWallet = async(req,res,next)=>{

  try{
    const users = await Usermodel.findById( req.params.id);
     const Admin = await req.user.id
    const currentWalletValue =  users.Wallet;
    const additionalValue = Number(req.body.Wallet);
    const updatedWalletValue = currentWalletValue + additionalValue;
    users.Wallet=updatedWalletValue
    await WalletModel.create({
Admin : Admin ,
username : users.username,
Wallet : additionalValue
    })
    await users.save()
res.status(200).json({
message :"Successfully You Add To The Wallet",
data : users
})
}
    catch(err){
  next(err);
    
    }
    


}

exports.ClearTheWallet = async(req,res,next)=>{

  try{
    const users = await Usermodel.findById( req.params.id);
users.Wallet = 0    

await users.save()

res.status(200).json({
message :"Successfully You Clear The Money In The Wallet",
data : users
})
}
    catch(err){
  next(err);
    
    }
    


}


exports.getmyinf = async (req,res,next)=>{
try{
const Userinfo = await Usermodel.findById(req.params.id).select('username email PhoneNumber Wallet -_id ').populate('enrolledCourses' , 'name -_id Code');

res.status(200).json({
message : "This Your Personal Information" , 
data :Userinfo

})
}catch(err){
next(err)
}


}

exports.getT = async (req,res,next)=> {
try{
  const Teachers = await Usermodel.findOne({ 'roles': 'teacher' }, 'username PhoneNumber -_id ');
  res.status(200).json({
message : "Here Is All Teachers" ,
    data : Teachers
})

}catch(err){
next(err);

}

}


exports.GetAllStudents = async (req,res,next)=> {
  try{
    const Students = await Usermodel.findOne({ 'roles': 'user' }, 'username PhoneNumber email Wallet -_id ');
    res.status(200).json({
  message : "Here Is All Students" ,
      data : Students
  })
  
  }catch(err){
  next(err);
  
  }
  
  }


exports.getInfoWallet = async(req,res,next)=>{
try{
  
  const InfoWallet =  await WalletModel.find().select('username Wallet -_id').populate('Admin' , 'username -_id')    
res.status(200).json({

InfoWallet
})


}catch(err){

next(err)

}






}