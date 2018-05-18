"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
// email,name,dob,gender,address,companyName,country

var user = new Schema({ 
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true  },
    gender: { type: String, required: true },
    address: { type: String },
    companyName: {type: String, required :true},
    country: { type: Date, required: true },
    
})

module.exports.user = mongoose.model('user', user);