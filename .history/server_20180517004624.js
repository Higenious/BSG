const express     =  require('express');
var app           =  express();
const bodyParser  =  require('body-parser');
const mongoose    =  require('mongoose');
var multer        =  require('multer');
const path        =  require('path');
var router        =  express.Router();
const port        =  process.env.PORT || 3000;
var csv           =  require('csvtojson');   
//const config    =  require('./config/database');

//Connect to DB
//mongoose.connect(config.database);
mongoose.connect('mongodb://localhost:27017/bsg');
// Configure Server
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({  extended: true }));
//import Routes

var userRoutes    =  require('./routes/common');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage });

app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With,X-XSRF-TOKEN, querycriteria, x-access-token, sessionId, userId");
    res.removeHeader("X-Powered-By");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/Client'));

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/BSG");
// var db = mongoose.connection;


app.get('/',  function(req,  res){
    console.log('Index Serving');
    res.sendfile('index');
});

// Routess/
app.all('*', userRoutes);




// app.post('/uploadCsv', function (req, res) {
//     upload(req, res, function (err) {
//         console.log('upload api called');
//       if (err) {
//         //throw err;
//         return
//       }
//         res.send('Working FIne !');
//       // Everything went fine
//     })
//   })




app.post('/uploadCsv', upload.any(), function (req, res, next) {
    // req.body contains the text fields
    console.log('upload API Called');
    console.log(req.files);
    res.send(res.files);
    res.sendStatus("OK");
  });
// start the Server
app.listen(port, function ()  {
    console.log(`Server listening on port ${port}`);
});