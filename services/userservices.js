var mongoose    = require('mongoose');
var userModel    =   require('../model/userModel').user



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



function saveUser(data, successData, errorData){
    try{
        userModel(data).save().then(function(result){
            successData(data);
        }).catch(function(error){
            errorData();
        })
    }catch(error){
        errorData(error);
    }
}




















module.exports.createUser    =  createUser
module.exports.saveUser      =   saveUser