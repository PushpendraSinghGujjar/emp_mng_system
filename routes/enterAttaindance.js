var express = require('express');
var router = express.Router();
var empModel = require('../modules/empModule');
var attModel = require('../modules/attModule');

var empData = empModel.find({});



router.get('/', (req, res) => {
    empData.exec((err, doc) => {
        if (err) throw err;
        res.render('enterattaindance', { details: doc })
    })
});

router.get('/edit/:serviceno', (req, res) => {
    var serviceNo = req.params.serviceno;
    var empldata = empModel.findOne({ serviceno: serviceNo });
    var attData = attModel.find({ serviceno: serviceNo })
    empldata.exec((err, data) => {
        if (err) throw err;
        if (data !== null) {
            attData.exec((err, doc) => {
                if (err) throw err;
                res.render('editattaindance', { emp: data, att: doc, msg: '' });
            })
        }
    })
});

router.post('/edit/:serviceno', (req, res) => {
    var counter = 0;
    var dailyAll = 100;
    var serviceNo = req.params.serviceno;
    var name = req.body.name;
    var attaindance = req.body.attaindance.toUpperCase();

    var empldata = empModel.findOne({ serviceno: serviceNo });
    var attData = attModel.find({ serviceno: serviceNo });

    var attainData = new attModel({
        serviceno: serviceNo,
        name: name,
        attaindance: attaindance
    })

    attainData.save((err, info) => {
        if (err) throw err;
        empldata.exec((err, data) => {
            if (err) throw err;

            if (data !== null) {
                attData.exec((err, doc) => {
                    if (err) throw err;

                    //updating data in employee db
                        doc.map((items) => {
                            if (items.attaindance === 'P') {
                                counter++;
                            }
                        })

                        var new_dailyallounce = parseFloat(counter) * parseFloat(dailyAll);
                        var new_totalamount = parseFloat(data.basesalary) + parseFloat(new_dailyallounce) + parseFloat(data.hra) + parseFloat(data.extras);
                        var new_servicetax = parseFloat(2 / 100) * parseFloat(new_totalamount);
                        var new_paymentamount = parseFloat(new_totalamount) - parseFloat(data.absentdeduction) - parseFloat(new_servicetax);

                       var emp_update = empModel.findOneAndUpdate({ serviceno: serviceNo }, {
                            dailyallounce: new_dailyallounce,
                            totalamount: new_totalamount,
                            servicetax: new_servicetax,
                            paymentamount: new_paymentamount
                        }, {
                            new: true
                        })
                    //data updated in employee db

                    emp_update.exec((err, tile) => {
                        if(err) throw err;
                        res.render('editattaindance', { emp: data, att: doc, msg: 'Attaindance Submitted Successfully' });
                    })
                })
            }
        })
    })
})

module.exports = router;