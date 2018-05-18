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



function uploadCsv(req, res) {
    var imageNameArray = [];
    var flag = 0;
    var certificatArray = [];
    var validate = 0;
    var fileLength = 0;
    var m;
    var path_directory;
    async.waterfall([
        function readCsvFile(callback) {
            m = __dirname.toString();
            path_directory = m.replace('/controllers', '');
            csv().fromFile(path_directory + "/uploads/" + FILE_NAME)
                .on("end_parsed", function (jsonArray) {
                    fileLength = jsonArray.length;
                    async.each(jsonArray, function (singleObject, callback1) {

                        if (_.isEmpty(singleObject.serial) || _.isEmpty(singleObject.certificateNumber) ||
                            _.isEmpty(singleObject.calibrationDate) || _.isEmpty(singleObject.gaugeDescription) ||
                            _.isEmpty(singleObject.certificateName) || _.isEmpty(singleObject.email) || _.isEmpty(singleObject.calibrationMethod)
                            ) {
                            validate = 1;
                        }



                        if (validate != 1) {
                            let docName = singleObject.certificateName;
                            let certificateNumber = singleObject.certificateNumber;
                            if (_.contains(imageNameArray, docName) || _.contains(certificatArray, certificateNumber)) {
                                flag = 1;
                            } else {
                                imageNameArray.push(docName);
                                certificatArray.push(certificateNumber);
                            }

                        }
                        callback1();
                    }, function (error) {
                        if (error) {
                            callback(RESPONSE.internalServerError(error.message), null);
                        } else {
                            callback(null, null);
                        }
                    })
                })
        }
    ], function (errorData, successData) {
        if (errorData) {
            res.send(errorData)
        } else {
            res.send(successData)
        }
    });
}







function getAlluser(req, res){
    res.send('Doin Well ');
}


    

    




module.exports.createUser  = createUser;
module.exports.uploadCsv   = uploadCsv;
//exports.getAlluser         = getAlluser;