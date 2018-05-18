var mongoose    = require('mongoose');
var userModel    =   require('../models/user').user;




function createUser(data,  successData, errorData){
    try {
        userModel(data).save().
            then(function (result) {
                successData(data);
            }).catch(function (error) {
                errorData(error) 
            })
    } catch  (error) {
        errorData(); 
           
    }
}




















module.exports.createUser    =  createUser