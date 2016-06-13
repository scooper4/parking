'use strict';

// import express with require method
var express = require('express');


// import Vehicle model
var Vehicle = require('../models/vehicle');

// express router instance
var router = express.Router();

//index api route for  getting all /vehicles
router.get('/vehicles', function(req, res){
	//find all objects in the todo model
	Vehicle.find({}, function(err, vehicles){
		if(err){
			 return res.status(500).json({message: err.message});
		}else{
			res.json({vehicles:vehicles})
			// res.send('These are Fetch park vehicles');

		}	
	});
})

//post route to create new vehicles
router.post('/vehicles', function(req,res){
	var vehicle = req.body; //set vehicle equal to post request body
	//save to mongodb
	Vehicle.create(vehicle, function(err,vehicle){
		if(err){
			return res.status(500).json({err: err.message});
		}
		//else send back json object with completed message
		res.json({'vehicle':vehicle, message: 'Car Parked'});
	})
});

//Put route to update existing vehicles
router.put('/vehicles/:id',function(req,res){
	var id = req.params.id; //find id by url params id key
	var vehicle = req.body; // vehicle is request body

	if(vehicle && vehicle._id !== id){
		return res.status(500).json({err: "Ids dont match!"})
	}
	//else find by id and update with new data
	Vehicle.findByIdAndUpdate(id,vehicle,{new:true},function(err,vehicle){
		if(err){
			return res.status(500).json({err: err.message});
		}
		// respond back with json object and message updated
		res.json({'vehicle': vehicle, message:'Vehicle Updated'})
	})
});
//delete route to destroy vehicle in database
router.delete('/vehicles/:id',function(req,res){
	
	var id = req.params.id;
	// var vehicle = req.body;

	
	Vehicle.findByIdAndRemove(id,'select', function(err){
		if(err){
			return res.status(500).json({err: err.message});
		}
		res.json({'vehicle with':id, message:'Was Deleted'})

	}); 
})




//export router to use in app.js
module.exports = router;