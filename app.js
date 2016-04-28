//setup
var port = process.env['PORT'] || 1337;
console.log("PORT: ",port);

var mongoUrl = "91.185.190.13";
var monogDbName = "mo12699_lotApi";

var mongoDbuser = null;
var mongoDbpass = null;

if(!process.env['dbuser']){
    var env = require('./env');
    mongoDbuser = env.dbuser;
    mongoDbpass = env.dbpass;
    env = undefined;
}
else{
    mongoDbuser = process.env['dbuser'];
    mongoDbpass = process.env['dbpass'];    
}

var mongoDbAccess = "mongodb://"+mongoDbuser+":"+mongoDbpass+"@"+mongoUrl+"/"+monogDbName;
var mongoose = require('mongoose');
mongoose.connect(mongoDbAccess);
var lottery = require('./lotteryModel');
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var lotteryController = require('./lotteryController');

app.get('/', function(req,res){
   res.send('It works'); 
});

app.get('/lottery/:nr', lotteryController.findByNr);
app.get('/lottery', lotteryController.find);
app.post('/lottery', lotteryController.add);

app.listen(port);
console.log("Listen start at: " + port);


process.on('uncaughtException', function (err) {
  console.log(err);
});