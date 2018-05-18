var   express      =  require('express');
var   app          =  express();
var   bodyParser   =  require('body-parser');
var   mongoose     =  require('mongoose');
var   port         =  3000;
var   nodemon      =  require('nodemon'); 





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


app.listen(port,  function(){
    console.log('Server Running on 3000');
});