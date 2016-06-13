webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//for webpack
	var angular = __webpack_require__(1);

	angular.module('todoListApp', ['chart.js'])
	.controller("PieCtrl", function ($scope, dataService) {

	  //call get vehicles data service to set scope vehicles variable
	  
	  // var longer = dataService.getVehicles(function(response){
	  //    var vehicles = response.data.vehicles;
	  //   $scope.vehicles = vehicles;
	  //   console.log("vehicles are" + $scope.vehicles.length)
	  //   return $scope.vehicles.length
	    
	  // }) 		
	  console.log("please work poop " + $scope.vehicles)
	  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	  $scope.data = [100, 500, 100];
	  


	});


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

	  this.getTodos = function(cb) {
	    $http.get('/api/todos/').then(cb);
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