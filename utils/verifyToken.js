const jwt = require( "jsonwebtoken");
const  createError  = require( "../utils/error.js");

exports.verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
  
   if (!token) {
  
    return res.status(505).json("you are Not Authorized")
  
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.roles) {
      next();
    } else {
return res.status(505).json("error")
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.roles = 'Admin') {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

exports.verifyTeacher = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.roles = 'teacher') {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};




exports.verifyadminorTeacher = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if ((req.user.roles = 'teacher') || (req.user.roles = 'Admin') ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};



