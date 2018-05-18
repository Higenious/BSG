const express          =  require('express');
var   router           =   express.Router();
var   userController   =  require('../controller/usercontroller');
var multer             =  require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        FILE_NAME = uuid.v1() + path.extname(file.originalname);
        cb(null, FILE_NAME);
    }
  })
  var upload = multer({ storage: storage });






  //route 

router.post('/user/new' , userController.createUser);
router.post('/user/uploadCsv', upload.single("csv"),userController.uploadCsv);








//exports route
module.exports = router;
