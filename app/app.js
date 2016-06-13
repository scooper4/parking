'use strict';

//for webpack
var angular = require('angular');

angular.module('todoListApp', ['chart.js','ngMaterial'])



require('./scripts/controllers/main.js');
require('./scripts/controllers/todo.js');
require('./scripts/directives/todo.js');
require('./scripts/services/data.js');