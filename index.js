const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authroute = require('./routes/auth.js')
 const userroute = require('./routes/users.js')
 const termsroute = require('./routes/terms.js')
 const courseroute = require('./routes/courses.js')
const vedioroute = require('./routes/vedio.js')
const sheetroute = require('./routes/sheets.js')
 app.get('/', (req,res)=>{
res.send("hello")
})
//This Should Above In The Code 
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth' , authroute)
 app.use('/api/courses' , courseroute)
 app.use('/api/terms' , termsroute)
 app.use('/api/users' , userroute)
 app.use('/api/vedio' ,vedioroute )
 app.use('/api/sheets' ,sheetroute )


 app.use((err,req,res,next)=>{
  const errorMessage = err.message || "SomeThingWentWrong";

const errorStatus = err.status || 500;
return res.status(errorStatus).json({
success : false ,
status : errorStatus ,
message :errorMessage ,
stack : err.stack

})

 })

const connect = async ()=>{
try{
await mongoose.connect(process.env.monogo_uri)
console.log('connected To Db')
}catch(err){
throw err;
}
}

mongoose.connection.on("disconnected" , ()=>{

console.log("mongoDB disconnected")
})



//Conncect To Server
  app.listen(5000,()=>{
    connect();
console.log("connected To Back End")

})
