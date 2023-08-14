const mongoose = require("mongoose")


const WalletSchema = new mongoose.Schema({
Admin : {
  type : mongoose.Schema.Types.ObjectId ,
  ref : "User"
},
username:{
type:String ,
required:true,
},
Wallet : {
  type : Number ,
  required : true
}                  
},{

  timestamps :true
})


const Wallet = mongoose.model('Wallet' ,WalletSchema )

module.exports = Wallet;

