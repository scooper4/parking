'use strict';
//Mongoose instance
var mongoose = require('mongoose');
//conect to Mongodb using mongoose with error messages
mongoose.connect('mongodb://localhost/fetch-park', function(err){
	if(err){
		console.log('Failed connecting to Mongodb');	
	}else{
		console.log('Connected to Mongo is a Success')
	}
});