'use strict';
//for webpack
var angular = require('angular');

angular.module('parkApp')
.controller('mainCtrl', function($scope, $interval, $log, dataService){
 

  //delete a vehicle
   $scope.deleteVehicle = function(vehicle, index) {
    if(confirm('Are you sure you want to delete this Vehicle?')){
      $scope.vehicles.splice(index, 1);
      dataService.deleteVehicle(vehicle);
   }
  };


//call get vehicles data service to set scope vehicles variable
  $scope.vehicles;
  dataService.getVehicles(function(response){
    var vehicles = response.data.vehicles;
    $scope.vehicles = vehicles;
    
  })
//Select Vehicle Types from drop down with angular-materialize-css
  $scope.items = ['Valet','Term','Regular'];
      $scope.selectedItem;
      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return "You have selected: Item " + $scope.selectedItem;
        } 
        else {
          return "Type";
        }
    }

// add Vehicles to Parking Garage
$scope.addVehicle = function() {
    var vDate = new Date(); //create a new date object
   
    var vehicle = {state: "Ma",
                      type: "Valet", time:vDate, type:'Regular', plate:"123-ABC"}
    
    dataService.addVehicle(vehicle); //save to db
    $scope.vehicles.push(vehicle);
    //send a request back to the server to get all new vehicles including this one with the updated _.id
    // doesnt seem efficent but it works for now...
     dataService.getVehicles(function(response){
      var vehicles = response.data.vehicles;
      $scope.vehicles = vehicles;
      
    });
  };  

// edit vehicles in Parking Garage
$scope.editVehicle = function(vehicle){
  dataService.updateVehicle(vehicle); // update the vehicle

};

  
  
})