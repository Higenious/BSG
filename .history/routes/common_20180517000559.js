const express          =  require('express');
var   router           =   express.Router();
var   userController   =  require('../controller/usercontroller');


//route 

router.post('/user/new' , userController.createUser);
//router.get('/user/getAllUser',   userController.getAlluser);
router.post('/user/uploadCsv', userController.uploadCsv);









//exports router
module.exports = router;
