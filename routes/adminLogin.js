var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adminlogin', { title: 'Govt Tech. ' });
});

router.post('/', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  if(username === "admin" && password === "admin"){
    res.redirect('/adminDashboard');
  }else{
      res.redirect('/adminLogin'); 
  }
})

module.exports = router;