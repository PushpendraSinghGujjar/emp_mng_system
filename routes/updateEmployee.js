var express = require('express');
var router = express.Router();
var empModel = require('../modules/empModule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/adminDashboard')
});


router.get('/edit/:id', (req, res, next) => {
    var id = req.params.id;
    var emp_info = empModel.findById({_id:id});

    emp_info.exec((err, data) => {
        if (err) throw err;
        
        res.render('updateemployee', { title: 'Govt Tech. ', row: data })
    })
});


router.post('/edit/:id', (req, res, next) => {
    var id = req.params.id;

    var serviceno = req.body.serviceno;
   var name = req.body.name;
   var address = req.body.address;
   var post = req.body.post;
   var joinyear = req.body.joinyear;
   var password = req.body.password;
   var basesalary = req.body.basesalary;
   var dailyallounce =  req.body.dailyallounce;
   var hra = req.body.hra;
   var extras = req.body.extras;
   var absentdeduction = req.body.absentdeduction;

   var emp_info = empModel.findById({_id:id});
   
   emp_info.exec((err, data) => {
       if (err) throw err;
       var new_dailyallounce = parseFloat(dailyallounce) + parseFloat(data.dailyallounce);
       var new_hra = parseFloat(hra) + parseFloat(data.hra);
       var new_extras = parseFloat(extras) + parseFloat(data.extras);
       var new_absentdeduction =  parseFloat(absentdeduction) + parseFloat(data.absentdeduction);
       var new_totalamount = parseFloat(basesalary) + parseFloat(new_dailyallounce) + parseFloat(new_hra) + parseFloat(new_extras);
       var new_servicetax = parseFloat(2/100)*parseFloat(new_totalamount);
       var new_paymentamount = parseFloat(new_totalamount) - parseFloat(new_absentdeduction) - parseFloat(new_servicetax);
       
   var emp_update = empModel.findByIdAndUpdate(id,{
    serviceno:serviceno,
    name:name,
    address:address,
    post:post,
    joinyear:joinyear,
    password:password,
    basesalary:basesalary,
    dailyallounce: new_dailyallounce,
    hra : new_hra,
    extras: new_extras,
    absentdeduction: new_absentdeduction,
    totalamount: new_totalamount,
    servicetax: new_servicetax,
    paymentamount: new_paymentamount 
     });

     emp_update.exec((err) => {
         if (err) throw err;
           res.redirect('/viewAllEmployee')
     })
   });
});

module.exports = router;