
var express = require('express');
var router = express.Router();
const multer = require('multer');
var uuid = require('uuid');
var path = require('path');
var fs = require('fs');
//internal dependencies
var vendorController = require('../controllers/vendorController');
var superAdminController = require('../controllers/superAdminController');
var customerController = require('../controllers/customerController');
//main storage
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        FILE_NAME = uuid.v1() + path.extname(file.originalname);
        cb(null, FILE_NAME)
    }
})

//temp storage
var tempStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        var dir = './tempUploads/' + req.body.csvName;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            cb(null, dir)
        } else {
            cb(null, dir)
        }
    },
    filename: function (req, file, cb) {
        TEMP_FILE_NAME=file.originalname;
        cb(null, file.originalname)
    }
})



var certificateStorage2 = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './certificates')
    
    },
    filename: function (req, file, cb) {
       let imageName = file.originalname;
        IMAGE_ARRAY.push(imageName);
        cb(null, imageName)
    }
})


// bulk storage
var certificateStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './certificates')
    },
    filename: function (req, file, cb) {
        let imageName = req.body.csvName + "_" + file.originalname;
        IMAGE_ARRAY.push(imageName);
        cb(null, imageName)
    }

})

var upload = multer({ storage: storage });
var tempUpload = multer({ storage: tempStorage });
var tempUpload2 = multer({ storage: certificateStorage2 });

var uploadCertificates = multer({ storage: certificateStorage }).any()


router.post('/upload/vendor/csv', upload.single("csv"), vendorController.uploadCsv);
router.post('/upload/customer/csv', upload.single("csv"), customerController.uploadCsv);
// router.post('/upload/vendor/certificates', uploadCertificates, vendorController.uploadCertifivates)

//upload single certificate 
// router.post('/upload/vendor/certificate', tempUpload.single('certificate'), vendorController.uploadSingleCertificate)


router.get('/generateCaptcha', superAdminController.generateCaptcha);
router.post('/verifyCaptcha', superAdminController.verifyCaptcha);
router.post('/upload/gauge/certificate', tempUpload2.single('certificate'), customerController.uploadGaugeSingleCertificate);
router.post('/upload/customer/certificate', tempUpload.single('certificate'), customerController.uploadCustomerSingleCertificate);
router.post('/save/customerCertificate', customerController.saveCustomerCertificate);
router.post('/upload/vendor/certificate', tempUpload.single('certificate'), vendorController.uploadVendorSingleCertificate);
router.post('/save/vendorCertificate', vendorController.saveVendorCertificate);
router.post('/EmailIsExist',superAdminController.emailIsExist);


module.exports = router;

