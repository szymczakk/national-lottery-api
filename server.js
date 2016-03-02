//setup
var azure = require('azure');
var port = process.env.PORT | 1337;
console.log("PORT: ",port);
var mongoDbuser = "";
var mongoDbpass = "";
azure.RoleEnvironment.getConfigurationSettings(function(error, settings) {
  if (!error) {
      mongoDbpass = settings['dbpass'];
      mongoDbuser = settings['dbuser'];
      console.log("mongoDbpass ", mongoDbpass);
      console.log("mongoDbuser ", mongoDbuser);
  }
});

var mongoDbAccess = "mongodb://"+mongoDbuser+":"+mongoDbpass+"@ds064188.mlab.com:64188/loteriaparagonowaapi"
console.log("mongoDbAccess ", mongoDbAccess);
var mongoose = require('mongoose');
//mongoose.connect(mongoDbAccess);
var lottery = require('./lotteryModel');
console.log("lottery: ", lottery);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var lotteryController = require('./lotteryController');
console.log("lotteryController: ", lotteryController);

app.get('/', function(req,res){
   res.send("It works"); 
});

app.get('/lottery/:nr', lotteryController.findByNr);
app.get('/lottery', lotteryController.find);
app.post('/lottery', lotteryController.add);

app.listen(port);
console.log("Listen start at: " + port);
