const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/compDB',{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  });
var conn =mongoose.Collection;
var empSchema =new mongoose.Schema({
    serviceno:{
       type:Number,
       required:true,
       index: {
           unique:true
       }
    },
    name: {
      type:String,
      required:true
      }, 
    address: {
        type:String,
      required:true
    },
    post: {
        type:String,
      required:true
    },
    joinyear: {
        type:Number,
      required:true
    },
    password: {
        type:String,
        required: true
    },


    basesalary: {
        type: Number,
        required: true
    },
    dailyallounce:{
        type: Number,
        default: 0
    },
    hra:{
        type: Number,
        default: 0
    },
    extras:{
        type: Number,
        default: 0
    },
    absentdeduction:{
        type: Number,
        default: 0
    },
    servicetax:{
        type: Number,
        default : 0
    },
    totalamount:{
        type: Number,
        default : 0
    },
    paymentamount:{
        type: Number,
         default: 0
    },
    

    date:{
        type:Date,
        default:Date.now
    }
});

var empModel = mongoose.model('employee',empSchema);
module.exports=empModel;