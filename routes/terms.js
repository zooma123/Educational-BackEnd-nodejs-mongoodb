const express = require('express');
const TermsModel = require('../models/Terms')
const TermController = require('../controller/term.js')
const router = express.Router();
const { verifyAdmin, verifyToken, verifyUser , verifyTeacher , verifyadminorTeacher} = require("../utils/verifyToken.js") ;
router.get('/GetAllTerms' ,verifyUser , TermController.getallTerms )
router.post('/AddTerm' ,verifyadminorTeacher,TermController.AddTerm)
router.delete('/DeleteTerm/:TermId' , verifyadminorTeacher , TermController.DeleteTerm )
router.patch('/UpdateTerm/:TermId' , verifyadminorTeacher , TermController.UpdateTerm )




module.exports = router;