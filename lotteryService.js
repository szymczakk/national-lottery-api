var lottery = require('./lotteryModel');

exports.findByNr = function(err, func, nr){
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
    };
    if(!lotteryModel.nip || !lotteryModel.nrkasy){
        err("lotterModel error");
    }
  var l = new lottery({
    nrkasy: lotteryModel.nrkasy,
    nip: lotteryModel.nip
  });

  l.save(function(err1){
    if(err1){
      err(err1);
    }else{
      func("success");
    }
  });
};
