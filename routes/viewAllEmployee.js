var express = require('express');

var empModel = require('../modules/empModule');
var router = express.Router();
var getAllEmp = empModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
    getAllEmp.exec((err, data) => {
        if (err) throw err;
        res.render('viewallemployee', { title: 'Govt Tech. ', data: data , msg: '' });
    });
});

router.get('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    var delete_emp = empModel.findByIdAndDelete(id);
    delete_emp.exec((err, doc) => {
        if (err) throw err;
        getAllEmp.exec((err, data) => {
            if(err) throw err;
            res.render('viewallemployee', { title: 'Govt Tech. ', data: data, msg: "Employee details deleted successfully" });
        })
    })

})

module.exports = router;