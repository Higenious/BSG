var  express        =  require('express');
var userServices    =  require('../services/userservices.js');
var bodyParser      = require('body-parser');
var async = require('async');
var csv           =  require('csvtojson');  

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


function uploadCsv(req, res) {
   // console.log(IMAGE_ARRAY)
    async.waterfall([
        function readCsvFile(callback) {
           // var imageNameArray = [];
            var m = __dirname.toString();
            var path_directory = m.replace('/controller', '');
            csv().fromFile(path_directory + "/uploads/" + csvName)
                .on("end_parsed", function (jsonArray) {
                    var fileLength = jsonArray.length;
                    console.log(jsonArray);
                    callback(null, jsonArray)
                })
        },
        function adddata(jsonArray, callback) {
            var i = 0;//email,name,dob,gender,address,companyName,country
            async.each(jsonArray, function (singleObject, callback1) {
                let createObject = {
                    email: singleObject.email,
                    name: singleObject.name,
                    gender: singleObject.gender,
                    dob: singleObject.dob,
                    address: singleObject.address,
                    companyName: singleObject.companyName,
                    country: singleObject.country
                }

//                vendorCertificateService.createvendorCertificate(createObject,
userServices.saveUser(createObject,
                    function (successData) {
                        callback1();
                    }, function (errorData) {
                        callback1();
                    })
            }, function (error) {
                if (error) {
                    callback(error, null)
                } else {
                    //let response = RESPONSE.sendResponse(true, null, null,"User Added Successfully", STATUS_CODE.OK);
                    let response = { status: 200, data: null, message: "User Added Successfully"}
                    callback(null, response)
                }
            })
        }

    ], function (errorData, successData) {
        if (errorData) {
            res.send(errorData)
        } else {
            res.send(successData)
        }
    })
}








function getAlluser(req, res){
    res.send('Doin Well ');
}


    

    




module.exports.createUser  = createUser;
module.exports.uploadCsv   = uploadCsv;
//exports.getAlluser         = getAlluser;