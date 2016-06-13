'use strict';
// create mongoose object
var mongoose = require('mongoose');

//create schema for fetchpark vehice
var vSchema = new mongoose.Schema({
	state: String,
	plate: String,
	time: Date,
	type1: ['Regular','Term','Valet'],
	type: String

});



//create a model named vechice from VehicleSchema
var models = mongoose.model('Vehicle',vSchema)
//best practices
module.exports = models;

