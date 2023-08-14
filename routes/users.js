const express = require('express');
const UserController = require('../controller/user.js')
const { verifyAdmin, verifyToken, verifyUser , verifyTeacher, verifyadminorTeacher} = require("../utils/verifyToken.js") ;
const router = express.Router();


router.get('/allteachers' ,verifyUser , UserController.getT )
router.get('/AllStudents' , verifyadminorTeacher , UserController.GetAllStudents)
router.get('/RecordWallet' , verifyAdmin , UserController.getInfoWallet)
router.post('/' , UserController.createUser)
router.post('/CreateTeacher', verifyAdmin, UserController.createTeacher)
router.post('/FillTheWallet/:id' , verifyAdmin, UserController.FillTheWallet)
router.put('/ClearTheWallet/:id' , verifyAdmin, UserController.ClearTheWallet)
router.put("/:id" , verifyUser , UserController.UpdateUser)
router.delete("/:id" , verifyUser, UserController.deleteUser)
router.get("/:id" , verifyUser, UserController.GetUser)
router.get("/userInformation/:id" , verifyUser , UserController.getmyinf)  
router.get("/" , verifyadminorTeacher,UserController.GetAllUsers)

module.exports = router;