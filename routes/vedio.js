const express = require('express');
const VedioController = require('../controller/vedio.js')
const { verifyAdmin, verifyToken, verifyUser , verifyTeacher, verifyadminorTeacher} = require("../utils/verifyToken.js") ;
const router = express.Router();
const videoStorage = require("../utils/multer.js");
const multer = require('multer');

const videoUpload = multer({
  storage: videoStorage,
  limits: {
  fileSize: 1000000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
})

router.get('/', VedioController.GetAllVedios ) 
router.post('/'  , verifyAdmin, videoUpload.single('vedio') , VedioController.CreateVedio ) 
router.get('/WatchVedio/:id' , verifyUser , VedioController.CheckWallet )
router.delete('/DeleteVedio/:id' , verifyadminorTeacher , VedioController.DeleteVedio )
router.patch('/UbdateVedio/:id' , verifyadminorTeacher , VedioController.UpdateVedio)


module.exports = router