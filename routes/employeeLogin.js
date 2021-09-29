var express = require('express');
var router = express.Router();
var empModel = require('../modules/empModule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('employeelogin', { title: 'Govt Tech. ' });
});

router.post('/', function(req, res, next){
  var serviceno = req.body.serviceno;
  var password = req.body.password;

  var emp_info = empModel.findOne({serviceno:serviceno});
  emp_info.exec((err, data) => {
      if (err) throw err;
      if(data.password === password){
          res.render('employeeDashboard', {title: 'Govt Tech. ' , data:data });
      }
      else{
          res.redirect('/employeeLogin')
      }
  })

  
});

module.exports = router;