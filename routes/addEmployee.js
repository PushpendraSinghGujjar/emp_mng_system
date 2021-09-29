var express = require('express');
var empModel = require('../modules/empModule')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addemployee', { title: 'Govt Tech. ' , msg: '' });
});

router.post('/', function(req,res,next){
   var serviceno = req.body.serviceno;
   var name = req.body.name;
   var address = req.body.address;
   var post = req.body.post;
   var joinyear = req.body.joinyear;
   var password = req.body.password;
   var basesalary = req.body.basesalary;

   var emp_details = new empModel({
    serviceno:serviceno,
    name:name,
    address:address,
    post:post,
    joinyear:joinyear,
    password:password,
    basesalary:basesalary,
  });

  emp_details.save(function(err,doc){
    if(err) throw err;
    res.render('addemployee', { title: 'Govt Tech. ' , msg: 'Employee Added Successfully' });
});

});

module.exports = router;