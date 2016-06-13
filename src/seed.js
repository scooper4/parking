'use strict';
var Todo = require('./models/todo.js');
var Vehicle = require('./models/vehicle.js');


//array of seed data 
var todos = [
	'feed the dog',
	'walk the kids',
	'water the trees'

];

//for each todo find a todo that equals cuurent todo
// todos length doesnt exist create it as Todo model
// with name  == todo and completed as false
todos.forEach(function(todo,index){
	Todo.find({'name':todo}, function(err,todos){
		if(!err && !todos.length){
			Todo.create({completed:false, name:todo});
		};
	});
});