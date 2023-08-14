const express = require("express");
const authrouter = express.Router();
const authController = require('../controller/auth.js')

authrouter.post('/register' , authController.register)
authrouter.post('/login' , authController.login)


module.exports = authrouter