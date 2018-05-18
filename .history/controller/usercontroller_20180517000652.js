var  express        =  require('express');
var userServices    =  require('../services/userservices.js');
var bodyParser      = require('body-parser');



function createUser(req,  res){
    try {
        var reqBody = req.body;
        userServices.createUser(reqBody,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}










function getAlluser(req, res){
    res.send('Doin Well ');
}


    

    




module.exports.createUser  = createUser;
//module.exports.uploadCsv   = uploadCsv;
//exports.getAlluser         = getAlluser;