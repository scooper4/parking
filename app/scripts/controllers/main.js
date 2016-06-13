'use strict';
//for webpack
var angular = require('angular');

angular.module('todoListApp')
.controller('mainCtrl', function($scope, $interval, $log, dataService){
  
  $scope.seconds=0;

  $scope.counter = function(){
  	$scope.seconds++;
  	$log.log($scope.seconds + ' have passed ! ');

  }

 	$interval($scope.counter, 1000, 10);
//call get vehicles data service to set scope vehicles variable
  dataService.getVehicles(function(response){
    var vehicles = response.data.vehicles;
    $scope.vehicles = vehicles;
    
  })

  dataService.getTodos(function(response){
    var todos = response.data.todos;  
    $scope.todos =  todos;
    });
  
  $scope.addTodo = function() {
    $scope.todos.unshift({name: "This is a new todo.",
                      completed: false});
  };
  
})