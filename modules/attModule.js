const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/compDB', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  });
var conn = mongoose.Collection;
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var dateInfo = day + "/" + month + "/" + year

var dateInfo = date.toLocaleDateString();

var attSchema = new mongoose.Schema({
  serviceno: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  attaindance: {
    type: String
  },
  dateInfo:{
     type: String,
     default: dateInfo
  },
  day: {
    type: Number,
    default : day
  },
  month : {
    type: Number,
    default : month
  },
  year: {
    type: Number,
    default : year
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var attModel = mongoose.model('attaindance', attSchema);
module.exports = attModel;





