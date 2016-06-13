'use strict';
//use mongose to register model
var mongoose = require('mongoose');

//set the schema for this mongodb model todo's
var todoSchema = new mongoose.Schema({
	name: String,
	completed: Boolean
});

//create a todo model and call it 'Todo' that uses todoSchema
var model = mongoose.model('Todo', todoSchema)


//best practice to export although mongoose is a singleton
module.exports = model;