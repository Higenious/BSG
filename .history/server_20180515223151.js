const express     =  require('express');
var app           =  express();
const bodyParser  =  require('body-parser');
const mongoose    =  require('mongoose');

const path        =  require('path');
var router        =  express.Router();
const port        =  process.env.PORT || 3000;
//const config      =  require('./config/database');

//Connect to DB
//mongoose.connect(config.database);
mongoose.connect('mongodb://localhost:27017/bsg');
// Configure Server
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({  extended: true }));
//import Routes

var userRoutes    =  require('./routes/common');




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
app.all('*', adminRoutes);




// start the Server
app.listen(port, function ()  {
    console.log(`Server listening on port ${port}`);
});