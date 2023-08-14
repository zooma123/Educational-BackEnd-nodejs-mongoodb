const coursemodel = require("../models/Courses.js");
const usermodel = require("../models/User.js");

exports.CreateCourse = async (req, res, next) => {
  try {
    const Course = await coursemodel.create({
      instructor: req.user.id,
      name: req.body.name,
      Code: req.body.Code,
    });
    res.status(200).json({
      message: "You Successfully Add The Course",
      data: Course,
    });
  } catch (err) {
    next(err);
  }
};

exports.EnrollMoreStudent = async (req, res, next) => {
  try {
    const UpdatedCourse = await coursemodel.findOne({ _id: req.params.id });
    const CurrentStudents = UpdatedCourse.students || [];
    const newStudentIds = await req.body.students;
    const updatedObjectIds = [...CurrentStudents, newStudentIds];
    UpdatedCourse.students = updatedObjectIds;
    await UpdatedCourse.save();
    res.status(200).json({
      message: "You Successfully UbdatedTheCourse",
      data: newStudentIds,
      CurrentStudents,
      updatedObjectIds,
    });
  } catch (err) {
    next(err);
  }
};

exports.UpdateTheCourseInfo = async (req, res, next) => {
  try {
    const UpdatedCourse = await coursemodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Successfully Updated The Course" });
  } catch (err) {
    next(err);
  }
};

exports.DeleteCourse = async (req, res, next) => {
  try {
    const TheDeletedCourse = await coursemodel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Successfully Deleted The Course" });
  } catch (err) {
    next(err);
  }
};

exports.DeleteStudent = async (req, res, next) => {
  try {
    const Courses = await coursemodel.findOne({ _id: req.params.id });
    const CurrentStudents = Courses.students || [];
    const newStudentIds = await req.body.students;
    const studentIndex = CurrentStudents.findIndex(
      (student) => student._id.toString() === newStudentIds
    );
    CurrentStudents.splice(studentIndex, 1);

    // Update the students field in the document
    Courses.students = CurrentStudents;
    await Courses.save();
    res.status(200).json({
      message: "You Successfully Delete The Student",
      data: newStudentIds,
      CurrentStudents,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetAllCourses = async (req, res, next) => {
  try {
    const Courses = await coursemodel.find().populate("instructor", "username");
    res.status(200).json({
      message: "Here All Courses",
      data: Courses,
    });
  } catch (err) {
    next(err);
  }
};

exports.JoinToCourse = async (req, res, next) => {
  try {
    const MeantCourse = await coursemodel.findOne({ _id: req.params.id });
    const CurrentStudents = MeantCourse.students || [];
    const StudentNeedToJoin = await req.user.id;
    //Check If The Course Contain The Student
    if (CurrentStudents.includes(StudentNeedToJoin)) {
      return res.status(500).json("You Have Enrolled Before");
    }
    const User = await usermodel.findOne({ _id: req.user.id });
    const CoursesUserHave = User.enrolledCourses || [];
    const course = await req.params.id;
    let updatedCourses = [...CoursesUserHave, course];
    User.enrolledCourses = updatedCourses;
    await User.save();
    let updatedEnrollend = [...CurrentStudents, StudentNeedToJoin];
    MeantCourse.students = updatedEnrollend;
    await MeantCourse.save();
    res.status(200).json({
      message: "You Success Enrolled",
      data: CurrentStudents,
    });
  } catch (err) {
    next(err);
  }
};
