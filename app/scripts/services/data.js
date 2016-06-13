'use strict';

//for webpack
var angular = require('angular');

angular.module('todoListApp')
//$q is an anguolar service used to manage request
.service('dataService', function($http, $q) {
  
//service to get the vehicle data from api response body
  this.getVehicles = function(cb){
    $http.get('api/vehicles/').then(cb);
  }

  //Save the vehicle todb as soon as it is added
  this.addVehicle = function(vehicle){
    $http.post('/api/vehicles/', vehicle);
  }

  //update the vehicle in the db
  this.updateVehicle = function(vehicle){
    $http.put('/api/vehicles/' + vehicle._id, vehicle);
  }

  this.getTodos = function(cb) {
    $http.get('/api/todos/').then(cb);
  };

  this.deleteVehicle = function(vehicle) {
    //add http delete request
    
    $http.delete('/api/vehicles/' + vehicle._id)

  };
  
  this.deleteTodo = function(todo) {
    console.log("I deleted the " + todo.name + " todo!");
  };
  
  this.saveTodos = function(todos) {
    var queue= [];
    todos.forEach(function(todo){
    	var request;
    	if(!todo._id) {
          request = $http.post('/api/todos', todo);
        } else {
          request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
            todo = result.data.todo;
            return todo;
          });
        }
    	queue.push(request);
    });
    // itterate over all queues and runs each request
    return $q.all(queue).then(function(results){
    	console.log("I saved" + todos.length + " todos!")
    })
  };
  
});
