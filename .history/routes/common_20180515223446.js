const express          =  require('express');
var   router           =   express.Router();
var   userController   =  require('../controller/usercontroller');


//route 

router.post('/user/new' , userController.createUser);
//router.get('/user/getAllUser',   userController.getAlluser);









//exports router
module.exports = router;
