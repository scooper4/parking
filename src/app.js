'use strict';
//breakpoint
debugger;
// import express with require method
var express = require('express');

//create an instance of the express server
var app = express();


// router is the api module that we require
var router = require('./api');

// for mongo db file to be required and run
require('./database');

//add seed data every time server restarts
require('./seed');

// serve static files using its static server from public folder
app.use('/', express.static('public'));



//have express use body parser
var parser = require('body-parser');
app.use(parser.json());

//append all routes wit /api to router
app.use('/api', router);

//listen on port 3000 and echo a message
app.listen(3000, function(){
	console.log("The server is running on port 3000")
});