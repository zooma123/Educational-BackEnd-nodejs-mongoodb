const express = require('express');
const Sheetmodel = require('../models/Sheets.js')
const SheetController = require('../controller/sheet.js')
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads'})


router.post('/upload', upload.single('file') ,SheetController.upload);



module.exports = router;
