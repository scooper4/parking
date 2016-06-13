webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//for webpack
	var angular = __webpack_require__(1);

	angular.module('todoListApp', ['chart.js','ngMaterial'])



	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	//for webpack
	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.controller('mainCtrl', function($scope, $interval, $log, dataService){
	  // //interval counter
	  // $scope.seconds=0;

	  // $scope.counter = function(){
	  // 	$scope.seconds++;
	  // 	$log.log($scope.seconds + ' have passed ! ');

	  // }

	 	// $interval($scope.counter, 1000, 10);

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
	    $scope.vehicles.unshift(vehicle);
	    dataService.addVehicle(vehicle); //save to db
	  };  

	// edit vehicles in Parking Garage
	$scope.editVehicle = function(vehicle){
	  dataService.updateVehicle(vehicle); // update the vehicle

	};

	  dataService.getTodos(function(response){
	    var todos = response.data.todos;  
	    $scope.todos =  todos;
	    });

	  
	  $scope.addTodo = function() {
	    $scope.todos.unshift({name: "This is a new todo.",
	                      completed: false});
	  };
	  
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//for webpack
	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.controller('todoCtrl', function($scope, dataService) {
	  $scope.deleteTodo = function(todo, index) {
	    $scope.todos.splice(index, 1);
	    dataService.deleteTodo(todo);
	  };
	  
	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo){
	      if(todo.edited) {
	        return todo
	      };
	    })
	    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
	  }; 

	  $scope.resetTodoState = function(){
	    $scope.todos.forEach(function(todo) {
	      todo.edited = false;
	    });
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	//for webpack
	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.directive('todo', function(){
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//for webpack
	var angular = __webpack_require__(1);

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


/***/ }
]);