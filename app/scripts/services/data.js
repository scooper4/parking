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

  //Save the vehicle to db as soon as it is added
  this.addVehicle = function(vehicle){
    $http.post('/api/vehicles/', vehicle);
  }

  //update the vehicle in the db
  this.updateVehicle = function(vehicle){
    $http.put('/api/vehicles/' + vehicle._id, vehicle);
  }

  // delete Vehicle from the db
  this.deleteVehicle = function(vehicle) {
    $http.delete('/api/vehicles/' + vehicle._id)

  };

  
  
});
