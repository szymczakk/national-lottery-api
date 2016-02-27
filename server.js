var port = process.env.PORT | 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loteria');
var lottery = require('./lotteryModel');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var lotteryController = require('./lotteryController');

app.get('/lottery/:nr', lotteryController.findByNr);
app.get('/lottery', lotteryController.find);
app.post('/lottery', lotteryController.add);

app.listen(port);
console.log("Listen start at: " + port);
