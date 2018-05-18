const express          =  require('express');
var   router           =   express.Router();
var   userController   =  require('../controller/usercontroller');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage });






  //route 

router.post('/user/new' , userController.createUser);
router.post('/user/uploadCsv', upload.single("csv"),userController.uploadCsv);








//exports route
module.exports = router;
