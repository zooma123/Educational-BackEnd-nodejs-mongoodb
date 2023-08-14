const {cloudinary} = require('../utils/cloudinary.js')
const vediomodel = require('../models/Vedios.js')
const usermodel = require('../models/User.js')

exports.CreateVedio = async(req,res,next) =>{
  const { name,price} = await req.body;

  try {

    const result = await cloudinary.uploader.upload(req.file.path ,{      resource_type: 'video' 
  } 

    );
  
        const vedio = await vediomodel.create({
        //   termid ,
         name ,
         vedio : result.secure_url,
         price,
         cloudinary_id: result.public_id,
          
        });
      res.status(200).json({
data : vedio

      });
      }
    
   catch (error) {
next(error)
  }
}


exports.CheckWallet = async (req,res,next)=> {
try{
  
  const VedioId = await req.params.id
  const vedio = await vediomodel.findById(VedioId)
  const VedioPrice = vedio.price
  const User = await usermodel.findById(req.user.id)
  var WalletUser = User.Wallet
  const WatchedVedio = User.WatchedVedio || []
  //Check If User Buy Before 
  if(User.WatchedVedio.includes(req.params.id)){

return res.status(200).json({
  data : vedio.vedio

})
  }
  //DisCount Price From Wallet
  if(VedioPrice <= WalletUser){
    User.Wallet -= VedioPrice 
  var  UpdatedListOfVedios = [...WatchedVedio , VedioId ]
  User.WatchedVedio= UpdatedListOfVedios
    User.save();
    res.status(200).json({
  message : `we Discount ${VedioPrice}EG and Your Balance Now ${User.Wallet}EG`,
    data : vedio.vedio
  })

  }else{
    return res.status(504).json({
  
      message : "You Don,t Have Enough Money In Your Wallet"
    })
  }
  }catch(error){
    next(error)
  }


}

exports.DeleteVedio = async (req,res,next)=>{
try{
  const DeleteVedio = await vediomodel.findByIdAndDelete(req.params.id)
 res.status(200).json("You SuccessFully Deleted The Vedio")
}catch(err){
  next(err)
}
  

}

exports.UpdateVedio = async (req,res,next)=>{
  try{
    const DeleteVedio = await vediomodel.findByIdAndUpdate(req.params.id,req.body, {new : true})
       res.status(200).json("You SuccessFully Updated The Vedio")
  }catch(err){
    next(err)
  }
    
  
  }


  exports.GetAllVedios = async (req,res,next)=>{
try{
  const Vedios = await vediomodel.find()
res.status(200).json({
Vedios

})
}
catch(err){
next(err)

} }
  
  