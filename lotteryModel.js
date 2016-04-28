var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var lotterySchema = new Schema({
  nrkasy:String,
  nip:String
}, {collection:'loteriaParagonowa'});


var lottery = mongoose.model('lottery', lotterySchema );

module.exports = lottery;
