var express = require('express');
var router = express.Router();
var empModel = require('../modules/empModule');

var empData = empModel.find({});

router.get('/', (req, res) => {
    empData.exec((err, data) => {
        res.render('attaindance', { employees: data})
    })
})


module.exports = router;