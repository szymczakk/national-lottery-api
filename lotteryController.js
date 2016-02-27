var lotteryService = require('./lotteryService');


exports.findByNr = function(req, res){
  lotteryService.findByNr(errorHandler, function(lot){
    res.send(lot);
  } ,req.params.nr);
};

exports.find = function(req, res){
  lotteryService.find(errorHandler, function(lot){
    res.send(lot);
  });
};

exports.add = function(req, res){
  lotteryService.add(errorHandler, function(lot){
    res.send(lot);
  }, req.body)
};


function errorHandler(err){
  if(err){
    throw err;
  }
};
