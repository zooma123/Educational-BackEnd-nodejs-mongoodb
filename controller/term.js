const TermModel = require('../models/Terms.js')
const CourseModel = require('../models/Courses.js')


exports.getallTerms = async (req,res,next)=>{
try{

  const Terms = await TermModel.find();
  res.status(200).json({
    Terms
  })
}catch(err){
  next(err)
}
  

}



exports.AddTerm = async (req,res,next)=>{
  try{
  
    const terms = TermModel.create({
      courseid :req.body.courseid ,
      name : req.body.name,
      description : req.body.description
    })
    res.status(200).json("You Successfully Add The Term")
  }catch(err){
    next(err)
  }
    
  
  }
  
  exports.DeleteTerm = async (req,res,next)=>{
    try{
    
   const DeletedTerm = TermModel.findByIdAndDelete(req.params.id , {new : "true"})
      res.status(200).json("You Successfully Delete The Term")
    }catch(err){
      next(err)
    }
      
    
    }
    
    exports.UpdateTerm = async (req,res,next)=>{
      try{
      
    const UpdatedTerm  = TermModel.findByIdAndUpdate(req.params.id , req.body , {new : "true"})
        res.status(200).json("You SuccessFully Update The Term")
      }catch(err){
        next(err)
      }
        
      
      }
      
      

  
  