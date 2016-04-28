var lottery = require('./lotteryModel');

exports.findByNr = function(err, func, nr){
  nr = parseNrKasy(nr);
  lottery.find({nrkasy:nr}, function(err, lot){
    if(err){
      err(err);
    }
      func(lot);
  });
};

exports.find = function(err, func){
  lottery.find({}, function(err, lots){
    if(err){
      err(err);
    }
    func(lots);
  });
};

exports.add = function(err, func,lotteryModel){
  if(!lotteryModel){
    err("lotteryModel is null!");  
  }
  if(!lotteryModel.nip || !lotteryModel.nrkasy){
      err("lotterModel error");
  }
    
  if(!isNipValid(lotteryModel.nip)){
    err("nip field validation error");
  }
  
  lotteryModel.nrkasy = parseNrKasy(lotteryModel.nrkasy);
  
  var lotteryPOCO = new lottery({
    nrkasy: lotteryModel.nrkasy,
    nip: lotteryModel.nip
  });

  lotteryPOCO.save(function(err1){
    if(err1){
      err(err1);
    }else{
      func("success");
    }
  });
};

function isNipValid(nip){
  return /^\d{10}$/.test(nip);
}

function parseNrKasy(nrKasy){
  return nrKasy.toLowerCase().trim().replace(/\s/g, '');
}