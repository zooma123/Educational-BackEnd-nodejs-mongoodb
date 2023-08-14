const express = require('express');
const courseModel = require('../models/Courses')
const CourseController = require('../controller/course.js')
const { verifyAdmin, verifyToken, verifyUser , verifyTeacher , verifyadminorTeacher} = require("../utils/verifyToken.js") ;

const router = express.Router();

router.get('/AllCourses' , verifyUser, CourseController.GetAllCourses)
router.post('/CreateCourse' ,verifyadminorTeacher , CourseController.CreateCourse )
router.post('/EnrollMoreStudent/:courseid' ,verifyadminorTeacher , CourseController.EnrollMoreStudent )
router.patch('/UpdateTheCourseInfo/:courseid' ,verifyadminorTeacher ,   CourseController.UpdateTheCourseInfo )  
router.delete('/DeleteTheCourse/:courseid' ,verifyadminorTeacher ,  CourseController.DeleteCourse)
router.post('/DeleteStudentFromCourse/:courseid' ,verifyadminorTeacher , CourseController.DeleteStudent)
router.post('/JoinToCourse/:courseid' , verifyUser , CourseController.JoinToCourse)


module.exports = router;